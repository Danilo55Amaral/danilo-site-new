"use client";

import { useEffect, useRef, useState } from "react";
import { whatsappUrl, WHATSAPP_PHONE } from "@/engine/contact";
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
// WhatsApp, já escrito (copiado pra colar, ou na conversa se houver o número).
// ============================================================================

type Done = { request: ContactRequest; protocol: string; via: "email" | "whatsapp" };

const TABS: { id: PickMode; label: string }[] = [
  { id: "orcamento", label: "Pedir orçamento" },
  { id: "agendamento", label: "Agendar consultoria" },
];

async function openWhatsApp(request: ContactRequest) {
  const text = requestText(request);
  if (!WHATSAPP_PHONE) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // sem permissão: a conversa abre do mesmo jeito
    }
  }
  window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
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
          <button onClick={() => openWhatsApp(done.request)} className="da-btn-secondary">
            <SocialIcon id="whatsapp" className="h-4 w-4 text-emerald-400" /> Quer agilizar? Envie também pelo WhatsApp
          </button>
        </>
      ) : (
        <>
          <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">Seu pedido está pronto!</h3>
          <p className="max-w-md text-slate-400">
            Agora é só enviar pelo WhatsApp: {WHATSAPP_PHONE ? "a conversa abre com a mensagem já escrita." : "a mensagem vai copiada — na conversa, é só colar e enviar."}
          </p>
          <button onClick={() => openWhatsApp(done.request)} className="da-btn-accent !bg-none !bg-[#25d366] !shadow-emerald-500/30">
            <SocialIcon id="whatsapp" className="h-5 w-5" /> Enviar pelo WhatsApp
          </button>
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
