"use client";

import Link from "next/link";
import { useState } from "react";
import { ContactForm, SERVICE_OPTIONS, WHATSAPP_PHONE, buildMessage, whatsappUrl } from "@/engine/contact";
import { CATALOG_PATH, SOCIALS } from "@/engine/profile";
import Reveal from "./Reveal";
import { ArrowRightIcon, ArrowUpRightIcon, CheckIcon, SendIcon, SocialIcon, TagIcon } from "./Icons";

// ============================================================================
// CONTATO — a chamada final da home: o formulário rápido (que vira uma
// mensagem no WhatsApp, ver engine/contact.ts), os cartões das redes e o
// atalho pro catálogo, onde fica o pedido de orçamento completo.
// ============================================================================

const EMPTY: ContactForm = { name: "", service: "sites", message: "" };

export default function Contact() {
  const [form, setForm] = useState<ContactForm>(EMPTY);
  const [sent, setSent] = useState(false);

  const canSend = form.name.trim().length > 1 && form.message.trim().length > 4;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSend) return;
    const message = buildMessage(form);
    if (!WHATSAPP_PHONE) {
      try {
        await navigator.clipboard.writeText(message);
      } catch {
        // sem permissão de área de transferência: a conversa abre do mesmo jeito
      }
    }
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <section id="contato" className="da-section overflow-hidden">
      <div className="da-container">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2.5rem] border border-slate-800/80 bg-da-card p-6 sm:p-12 lg:p-16">
            {/* luzes do fundo */}
            <div className="absolute -left-24 -top-24 -z-10 h-80 w-80 rounded-full bg-violet-600/25 blur-[100px]" aria-hidden="true" />
            <div className="absolute -bottom-24 -right-24 -z-10 h-80 w-80 rounded-full bg-fuchsia-600/20 blur-[100px]" aria-hidden="true" />
            <div className="da-grid absolute inset-0 -z-10 opacity-60" aria-hidden="true" />

            <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
              <div className="flex flex-col gap-6">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Contato
                </span>
                <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
                  Vamos tirar o seu projeto <span className="da-gradient-text">do papel?</span>
                </h2>
                <p className="text-base leading-relaxed text-slate-400 sm:text-lg">
                  Conte o que você precisa: um site, uma loja, um sistema ou uma análise de dados. A primeira conversa é sem
                  compromisso e você recebe uma proposta clara.
                </p>

                <ul className="grid gap-3 [&>*]:min-w-0 sm:grid-cols-2">
                  {SOCIALS.map((s) => (
                    <li key={s.id}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 rounded-2xl border border-slate-800 bg-da-raised/80 p-3.5 transition-all hover:-translate-y-0.5 hover:border-violet-500/40"
                      >
                        <span
                          className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                            s.id === "whatsapp" ? "bg-emerald-500/15 text-emerald-300" : "bg-violet-500/15 text-violet-300"
                          }`}
                        >
                          <SocialIcon id={s.id} className="h-5 w-5" />
                        </span>
                        <span className="flex min-w-0 flex-1 flex-col">
                          <span className="text-sm font-semibold text-white">{s.label}</span>
                          <span className="truncate text-xs text-slate-500">{s.handle}</span>
                        </span>
                        <ArrowUpRightIcon className="h-4 w-4 text-slate-600 transition-colors group-hover:text-white" />
                      </a>
                    </li>
                  ))}
                </ul>

                <Link
                  href={CATALOG_PATH}
                  className="group flex items-center gap-4 rounded-2xl border border-violet-500/30 bg-violet-500/10 p-4 transition-colors hover:border-violet-500/60"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-da-ink">
                    <TagIcon className="h-5 w-5" />
                  </span>
                  <span className="flex flex-1 flex-col">
                    <span className="text-sm font-semibold text-white">Prefere ver os preços antes?</span>
                    <span className="text-xs text-slate-400">Catálogo com valores, prazos e agendamento online</span>
                  </span>
                  <ArrowRightIcon className="h-4 w-4 text-violet-300 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              <form onSubmit={submit} className="flex flex-col gap-5 rounded-3xl border border-slate-800/80 bg-da-bg/60 p-6 backdrop-blur sm:p-8">
                <div>
                  <label htmlFor="contato-nome" className="da-label">
                    Seu nome
                  </label>
                  <input
                    id="contato-nome"
                    className="da-input"
                    placeholder="Como posso te chamar?"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    autoComplete="name"
                  />
                </div>

                <fieldset>
                  <legend className="da-label">O que você precisa?</legend>
                  <div className="flex flex-wrap gap-2">
                    {SERVICE_OPTIONS.map((o) => {
                      const active = form.service === o.id;
                      return (
                        <button
                          type="button"
                          key={o.id}
                          onClick={() => setForm({ ...form, service: o.id })}
                          aria-pressed={active}
                          className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all ${
                            active
                              ? "border-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600 text-da-onaccent shadow-md shadow-fuchsia-500/20"
                              : "border-slate-800 bg-da-raised text-slate-400 hover:text-white"
                          }`}
                        >
                          {o.label}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="contato-mensagem" className="da-label">
                    Conte um pouco sobre o projeto
                  </label>
                  <textarea
                    id="contato-mensagem"
                    rows={5}
                    className="da-input resize-none"
                    placeholder="Ex.: Preciso de um site para a minha empresa, com página de serviços e botão de WhatsApp..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>

                <button type="submit" disabled={!canSend} className="da-btn-accent group disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100">
                  <SendIcon className="h-4 w-4" /> Enviar pelo WhatsApp
                </button>

                {sent ? (
                  <p className="flex items-start gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs leading-relaxed text-emerald-300" role="status">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0" />
                    {WHATSAPP_PHONE
                      ? "Pronto! A conversa abriu no WhatsApp com a sua mensagem — é só enviar."
                      : "Pronto! Sua mensagem foi copiada. Na conversa que abriu no WhatsApp, é só colar e enviar."}
                  </p>
                ) : (
                  <p className="text-center text-xs text-slate-500">Primeira conversa sem compromisso · Proposta por escrito</p>
                )}
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
