"use client";

import { useEffect, useRef, useState } from "react";
import { copyText, whatsappUrl, WHATSAPP_PHONE } from "@/engine/contact";
import { ContactRequest, requestText, validateRequest } from "@/engine/requests";
import { PickMode, useCatalogPick } from "@/engine/store";
import { ApiError, sendContactRequest } from "@/services/api";
import { CalendarIcon, CheckIcon, SendIcon, SocialIcon } from "../Icons";
import BookingForm from "./BookingForm";
import OrderForm from "./OrderForm";

// ============================================================================
// PAINEL DE PEDIDO — as duas abas do fim do catálogo: pedir orçamento e
// agendar consultoria. O pedido vai pra API (e-mail pro Danilo); se o
// e-mail não estiver configurado ou o servidor falhar, o pedido vai pelo
// WhatsApp, já escrito: na conversa, se houver o número (WHATSAPP_PHONE); senão
// a mensagem aparece na tela com o botão de copiar, pra colar na conversa.
// ============================================================================

type Done = { request: ContactRequest; protocol: string; via: "email" | "whatsapp" };

const TABS: { id: PickMode; label: string }[] = [
  { id: "orcamento", label: "Pedir orçamento" },
  { id: "agendamento", label: "Agendar consultoria" },
];

function openWhatsApp(request: ContactRequest) {
  window.open(whatsappUrl(requestText(request)), "_blank", "noopener,noreferrer");
}

/**
 * Sem o número no site, o link do WhatsApp não leva texto: a mensagem fica à
 * vista, com o botão de copiar (que confirma se copiou) antes de abrir a conversa.
 */
function MessageToPaste({ request }: { request: ContactRequest }) {
  const text = requestText(request).replace(/\*/g, "");
  const [copied, setCopied] = useState<"sim" | "nao" | null>(null);

  async function copyAndOpen() {
    const ok = await copyText(requestText(request));
    setCopied(ok ? "sim" : "nao");
    if (ok) openWhatsApp(request);
  }

  return (
    <div className="flex w-full max-w-lg flex-col gap-3 text-left">
      <ol className="flex flex-col gap-1 text-sm text-slate-400">
        <li>
          <span className="font-semibold text-white">1.</span> Toque em <span className="font-semibold text-white">Copiar e abrir o WhatsApp</span>
        </li>
        <li>
          <span className="font-semibold text-white">2.</span> Na conversa, cole a mensagem e envie
        </li>
      </ol>
      <textarea
        readOnly
        value={text}
        rows={8}
        onFocus={(e) => e.currentTarget.select()}
        aria-label="Mensagem do pedido"
        className="da-input resize-none font-mono text-xs leading-relaxed"
      />
      <button onClick={copyAndOpen} className="da-btn-accent !bg-none !bg-[#25d366] !shadow-emerald-500/30">
        <SocialIcon id="whatsapp" className="h-5 w-5" /> Copiar e abrir o WhatsApp
      </button>
      {copied === "sim" && (
        <p className="text-center text-sm font-medium text-emerald-300" role="status">
          ✓ Mensagem copiada! Agora é só colar na conversa.
        </p>
      )}
      {copied === "nao" && (
        <p className="text-center text-sm font-medium text-amber-300" role="alert">
          O navegador não deixou copiar. Selecione o texto acima, copie e depois{" "}
          <button onClick={() => openWhatsApp(request)} className="underline underline-offset-4">
            abra o WhatsApp
          </button>
          .
        </p>
      )}
    </div>
  );
}

function DoneView({ done, onReset }: { done: Done; onReset: () => void }) {
  const booking = done.request.kind === "agendamento";
  return (
    <div className="flex flex-col items-center gap-5 py-10 text-center" role="status">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300 ring-8 ring-emerald-500/5">
        <CheckIcon className="h-8 w-8" />
      </span>
      {done.via === "email" ? (
        <>
          <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
            {booking ? "Pedido de agendamento enviado!" : "Pedido de orçamento enviado!"}
          </h3>
          <p className="max-w-md text-slate-400">
            Obrigado, {done.request.name.split(" ")[0]}! Recebi o seu pedido e respondo pelo e-mail ou WhatsApp que você informou.
            {booking ? " Assim que eu confirmar, o horário fica reservado para você." : " A proposta vem por escrito, com escopo, prazo e investimento."}
          </p>
          {done.protocol && (
            <p className="rounded-full border border-slate-800 bg-da-raised px-4 py-1.5 font-mono text-sm text-slate-300">
              Protocolo <span className="font-bold text-white">{done.protocol}</span>
            </p>
          )}
          {WHATSAPP_PHONE ? (
            <button onClick={() => openWhatsApp(done.request)} className="da-btn-secondary">
              <SocialIcon id="whatsapp" className="h-4 w-4 text-emerald-400" /> Quer agilizar? Envie também pelo WhatsApp
            </button>
          ) : (
            <MessageToPaste request={done.request} />
          )}
        </>
      ) : (
        <>
          <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">Seu pedido está pronto!</h3>
          {WHATSAPP_PHONE ? (
            <>
              <p className="max-w-md text-slate-400">Agora é só enviar pelo WhatsApp: a conversa abre com a mensagem já escrita.</p>
              <button onClick={() => openWhatsApp(done.request)} className="da-btn-accent !bg-none !bg-[#25d366] !shadow-emerald-500/30">
                <SocialIcon id="whatsapp" className="h-5 w-5" /> Enviar pelo WhatsApp
              </button>
            </>
          ) : (
            <MessageToPaste request={done.request} />
          )}
        </>
      )}
      <button onClick={onReset} className="text-sm font-semibold text-slate-500 underline-offset-4 hover:text-white hover:underline">
        Fazer outro pedido
      </button>
    </div>
  );
}

export default function OrderPanel() {
  const pick = useCatalogPick();
  const [tab, setTab] = useState<PickMode>("orcamento");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState<Done | null>(null);
  const [formKey, setFormKey] = useState(0);
  const errorRef = useRef<HTMLParagraphElement>(null);

  // Clicou em "Escolher"/"Agendar" num cartão: abre a aba certa (e volta pro formulário, se já tinha enviado)
  useEffect(() => {
    if (!pick) return;
    setTab(pick.mode);
    setDone(null);
    setError("");
  }, [pick]);

  useEffect(() => {
    if (error) errorRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [error]);

  async function send(request: ContactRequest, honeypot: string) {
    const invalid = validateRequest(request);
    if (invalid) {
      setError(invalid);
      return;
    }
    setError("");
    setSending(true);
    try {
      const { protocol } = await sendContactRequest({ ...request, website: honeypot });
      setDone({ request, protocol, via: "email" });
    } catch (e) {
      // Erro do próprio pedido (campo inválido, muitos envios): mostra e deixa corrigir.
      // Qualquer outro (e-mail não configurado, servidor fora, sem internet): segue pelo WhatsApp.
      if (e instanceof ApiError && (e.status === 400 || e.status === 429)) setError(e.message);
      else setDone({ request, protocol: "", via: "whatsapp" });
    } finally {
      setSending(false);
    }
  }

  function reset() {
    setDone(null);
    setFormKey((k) => k + 1);
  }

  return (
    <div className="da-card relative overflow-hidden p-5 sm:p-8 lg:p-10">
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-violet-600/15 blur-[100px]" aria-hidden="true" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-fuchsia-600/10 blur-[100px]" aria-hidden="true" />

      <div className="relative">
        {done ? (
          <DoneView done={done} onReset={reset} />
        ) : (
          <>
            <div className="mb-10 flex flex-col gap-2 rounded-2xl border border-slate-800 bg-da-sunken p-1.5 sm:flex-row" role="tablist">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={tab === t.id}
                  onClick={() => {
                    setTab(t.id);
                    setError("");
                  }}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                    tab === t.id ? "bg-white text-da-ink shadow-lg" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {t.id === "orcamento" ? <SendIcon className="h-4 w-4" /> : <CalendarIcon className="h-4 w-4" />}
                  {t.label}
                </button>
              ))}
            </div>

            {error && (
              <p ref={errorRef} className="mb-6 rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-300" role="alert">
                {error}
              </p>
            )}

            {/* as duas abas ficam montadas: trocar de aba não apaga o que já foi preenchido */}
            <div className={tab === "orcamento" ? "" : "hidden"}>
              <OrderForm
                key={`o-${formKey}`}
                initialItem={pick?.mode === "orcamento" ? pick.itemId : undefined}
                note={pick?.mode === "orcamento" ? pick.note : undefined}
                sending={sending}
                onSubmit={send}
              />
            </div>
            <div className={tab === "agendamento" ? "" : "hidden"}>
              <BookingForm
                key={`a-${formKey}`}
                initialItem={pick?.mode === "agendamento" ? pick.itemId : undefined}
                sending={sending}
                onSubmit={send}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
