"use client";

import { useEffect, useState } from "react";
import { AVAILABLE_ITEMS, SCHEDULE, nextBusinessDays, priceLabel } from "@/engine/catalog";
import { BookingRequest } from "@/engine/requests";
import { CalendarIcon } from "../Icons";
import { Chip, ContactFields, ContactValues, EMPTY_CONTACT, Honeypot, Step } from "./fields";

const BOOKABLE = AVAILABLE_ITEMS.filter((i) => i.booking);

function isoDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/**
 * O pedido de agendamento: o que agendar (diagnóstico grátis ou consultoria),
 * online ou presencial, o dia (próximos dias úteis), o horário e o assunto.
 * O horário só fica reservado quando o Danilo confirmar.
 */
export default function BookingForm({
  initialItem,
  sending,
  onSubmit,
}: {
  initialItem?: string;
  sending: boolean;
  onSubmit: (request: BookingRequest, honeypot: string) => void;
}) {
  const [itemId, setItemId] = useState(initialItem ?? "diagnostico-gratuito");
  const [format, setFormat] = useState(SCHEDULE.formats[0]);
  const [days, setDays] = useState<Date[]>([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [topic, setTopic] = useState("");
  const [contact, setContact] = useState<ContactValues>(EMPTY_CONTACT);
  const [honeypot, setHoneypot] = useState("");

  // Os dias dependem do relógio do visitante: calcula só no navegador (sem divergir do HTML do servidor)
  useEffect(() => setDays(nextBusinessDays()), []);

  useEffect(() => {
    if (initialItem && BOOKABLE.some((i) => i.id === initialItem)) setItemId(initialItem);
  }, [initialItem]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(
      {
        kind: "agendamento",
        itemId,
        format,
        date,
        time,
        topic,
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        company: contact.company || undefined,
      },
      honeypot,
    );
  }

  return (
    <form onSubmit={submit} className="relative grid gap-10 lg:grid-cols-[1fr_1.1fr]" noValidate>
      <Honeypot idPrefix="agenda" value={honeypot} onChange={setHoneypot} />

      <div className="flex flex-col gap-8">
        <Step n={1} title="O que você quer agendar?">
          <div className="grid gap-2.5">
            {BOOKABLE.map((i) => {
              const price = priceLabel(i);
              const active = itemId === i.id;
              return (
                <button
                  type="button"
                  key={i.id}
                  onClick={() => setItemId(i.id)}
                  aria-pressed={active}
                  className={`flex items-center justify-between gap-4 rounded-2xl border px-4 py-3.5 text-left transition-all ${
                    active ? "border-violet-500/60 bg-violet-500/10 ring-4 ring-violet-500/10" : "border-slate-800 bg-da-raised hover:border-slate-600"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${active ? "border-violet-400" : "border-slate-600"}`}
                    >
                      {active && <span className="h-2.5 w-2.5 rounded-full bg-violet-400" />}
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm font-semibold text-white">{i.name}</span>
                      <span className="text-xs text-slate-500">{i.deadline}</span>
                    </span>
                  </span>
                  <span className={`shrink-0 text-sm font-bold ${i.from === 0 ? "text-emerald-300" : "text-white"}`}>
                    {price.value}
                    <span className="font-medium text-slate-500">{price.suffix}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </Step>

        <Step n={2} title="Formato">
          <div className="flex flex-wrap gap-2">
            {SCHEDULE.formats.map((f) => (
              <Chip key={f} active={format === f} onClick={() => setFormat(f)}>
                {f}
              </Chip>
            ))}
          </div>
        </Step>
      </div>

      <div className="flex flex-col gap-8">
        <Step n={3} title="Escolha o dia">
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {days.map((d) => {
              const iso = isoDate(d);
              const active = date === iso;
              return (
                <button
                  type="button"
                  key={iso}
                  onClick={() => setDate(iso)}
                  aria-pressed={active}
                  className={`flex flex-col items-center rounded-2xl border px-2 py-2.5 transition-all ${
                    active
                      ? "border-transparent bg-gradient-to-br from-violet-600 to-fuchsia-600 text-da-onaccent shadow-lg shadow-fuchsia-500/20"
                      : "border-slate-800 bg-da-raised text-slate-300 hover:border-slate-600"
                  }`}
                >
                  <span className={`text-[11px] font-semibold uppercase ${active ? "opacity-90" : "text-slate-500"}`}>
                    {d.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", "")}
                  </span>
                  <span className="font-display text-xl font-bold">{d.getDate()}</span>
                  <span className={`text-[11px] ${active ? "opacity-90" : "text-slate-500"}`}>
                    {d.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "")}
                  </span>
                </button>
              );
            })}
          </div>
        </Step>

        <Step n={4} title="Horário">
          <div className="flex flex-wrap gap-2">
            {SCHEDULE.slots.map((s) => (
              <Chip key={s} active={time === s} onClick={() => setTime(s)}>
                {s}
              </Chip>
            ))}
          </div>
        </Step>

        <Step n={5} title="Assunto" hint="opcional">
          <label htmlFor="agenda-assunto" className="sr-only">
            Assunto
          </label>
          <textarea
            id="agenda-assunto"
            rows={3}
            className="da-input resize-y"
            placeholder="Sobre o que você quer conversar?"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            maxLength={1000}
          />
        </Step>

        <Step n={6} title="Seus dados">
          <ContactFields idPrefix="agenda" value={contact} onChange={setContact} />
        </Step>

        <div className="flex flex-col gap-3">
          <button type="submit" disabled={sending} className="da-btn-accent w-full !py-4 text-base disabled:cursor-wait disabled:opacity-60">
            <CalendarIcon className="h-4 w-4" /> {sending ? "Enviando..." : "Solicitar agendamento"}
          </button>
          <p className="text-center text-xs text-slate-500">O horário fica reservado quando eu confirmar por e-mail ou WhatsApp.</p>
        </div>
      </div>
    </form>
  );
}
