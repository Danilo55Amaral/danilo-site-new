"use client";

import { useEffect, useState } from "react";
import { ADDONS, AVAILABLE_ITEMS, CATEGORIES, PLAN_ITEMS, estimate, formatBRL, getItem, isEstimable, priceLabel } from "@/engine/catalog";
import { BUDGETS, DEADLINES, OrderRequest } from "@/engine/requests";
import { SendIcon, TagIcon } from "../Icons";
import { Chip, ContactFields, ContactValues, EMPTY_CONTACT, Honeypot, Step } from "./fields";

// Os serviços que se pede por orçamento (os de agendar ficam na outra aba; os indisponíveis, em nenhuma)
const ORDERABLE = AVAILABLE_ITEMS.filter((i) => !i.booking);

/**
 * O pedido de orçamento: o serviço (com os extras e a estimativa ao vivo), os
 * detalhes, o prazo de entrega, a faixa de investimento e os dados do cliente.
 * Quem envia é o OrderPanel (onSubmit).
 */
export default function OrderForm({
  initialItem,
  note,
  sending,
  onSubmit,
}: {
  initialItem?: string;
  note?: string;
  sending: boolean;
  onSubmit: (request: OrderRequest, honeypot: string) => void;
}) {
  const [itemId, setItemId] = useState(initialItem ?? "site-institucional");
  const [addons, setAddons] = useState<string[]>([]);
  const [details, setDetails] = useState("");
  const [deadline, setDeadline] = useState<string>("30-dias");
  const [deadlineDate, setDeadlineDate] = useState("");
  const [budget, setBudget] = useState("");
  const [contact, setContact] = useState<ContactValues>(EMPTY_CONTACT);
  const [honeypot, setHoneypot] = useState("");

  // Um novo clique em "Escolher" nos cartões troca o serviço (e traz a observação, se houver)
  useEffect(() => {
    if (initialItem && [...ORDERABLE, ...PLAN_ITEMS].some((i) => i.id === initialItem)) setItemId(initialItem);
  }, [initialItem]);
  useEffect(() => {
    if (note) setDetails((d) => (d.includes(note) ? d : d ? `${d}\n${note}` : note));
  }, [note]);

  const item = getItem(itemId);
  const estimable = item ? isEstimable(item) : false;
  const range = item && estimable ? estimate(item, addons) : null;
  const price = item ? priceLabel(item) : null;

  function toggleAddon(id: string) {
    setAddons((list) => (list.includes(id) ? list.filter((a) => a !== id) : [...list, id]));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(
      {
        kind: "orcamento",
        itemId,
        addons: estimable ? addons : [],
        details,
        deadline,
        deadlineDate: deadline === "data" ? deadlineDate : undefined,
        budget,
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
      <Honeypot idPrefix="pedido" value={honeypot} onChange={setHoneypot} />

      {/* coluna 1: o serviço e a estimativa */}
      <div className="flex flex-col gap-8">
        <Step n={1} title="Escolha o serviço">
          <label htmlFor="pedido-servico" className="sr-only">
            Serviço
          </label>
          <select id="pedido-servico" className="da-input cursor-pointer" value={itemId} onChange={(e) => setItemId(e.target.value)}>
            {CATEGORIES.map((c) => {
              const items = ORDERABLE.filter((i) => i.category === c.id);
              if (!items.length) return null;
              return (
                <optgroup key={c.id} label={c.title}>
                  {items.map((i) => (
                    <option key={i.id} value={i.id}>
                      {i.name}
                    </option>
                  ))}
                </optgroup>
              );
            })}
            <optgroup label="Planos de manutenção">
              {PLAN_ITEMS.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.name}
                </option>
              ))}
            </optgroup>
          </select>
          {item && price && (
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-800/80 bg-da-sunken px-4 py-3 text-sm">
              <span className="text-slate-400">{item.deadline}</span>
              <span className="font-semibold text-white">
                {price.prefix} {price.value}
                {price.suffix}
              </span>
            </div>
          )}
        </Step>

        {estimable && (
          <Step n={2} title="Extras" hint="opcional">
            <div className="flex flex-wrap gap-2">
              {ADDONS.map((a) => (
                <Chip key={a.id} active={addons.includes(a.id)} onClick={() => toggleAddon(a.id)}>
                  {a.name}{" "}
                  <span className="opacity-70">
                    +{a.percent ? `${a.percent}%` : formatBRL(a.price ?? 0)}
                    {a.note ? ` ${a.note}` : ""}
                  </span>
                </Chip>
              ))}
            </div>
          </Step>
        )}

        {/* estimativa ao vivo */}
        <div className="relative overflow-hidden rounded-3xl border border-violet-500/30 bg-gradient-to-br from-violet-600/20 via-da-card to-fuchsia-600/10 p-6">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-fuchsia-500/20 blur-3xl" aria-hidden="true" />
          <p className="relative flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-violet-300">
            <TagIcon className="h-4 w-4" /> {range ? "Estimativa do seu projeto" : "Investimento"}
          </p>
          <p className="relative mt-2 font-display text-3xl font-bold text-white sm:text-4xl" aria-live="polite">
            {range ? (
              <>
                {formatBRL(range.min)} <span className="text-slate-500">a</span> {formatBRL(range.max)}
              </>
            ) : price ? (
              `${price.value}${price.suffix}`
            ) : null}
          </p>
          <p className="relative mt-2 text-xs leading-relaxed text-slate-400">
            Valor de referência pelo catálogo. O preço final vem na proposta por escrito, depois da conversa sobre o escopo.
          </p>
        </div>
      </div>

      {/* coluna 2: detalhes, prazo, investimento e contato */}
      <div className="flex flex-col gap-8">
        <Step n={estimable ? 3 : 2} title="Conte sobre o projeto">
          <label htmlFor="pedido-detalhes" className="sr-only">
            Detalhes do projeto
          </label>
          <textarea
            id="pedido-detalhes"
            rows={5}
            className="da-input resize-y"
            placeholder="O que você precisa, para quem é, o que já existe (site antigo, logo, textos), referências que você gosta..."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            maxLength={3000}
          />
        </Step>

        <Step n={estimable ? 4 : 3} title="Prazo de entrega">
          <div className="flex flex-wrap gap-2">
            {DEADLINES.map((d) => (
              <Chip key={d.id} active={deadline === d.id} onClick={() => setDeadline(d.id)}>
                {d.label}
              </Chip>
            ))}
          </div>
          {deadline === "data" && (
            <input
              type="date"
              className="da-input sm:max-w-xs"
              aria-label="Data de entrega"
              value={deadlineDate}
              onChange={(e) => setDeadlineDate(e.target.value)}
            />
          )}
        </Step>

        <Step n={estimable ? 5 : 4} title="Investimento previsto">
          <div className="flex flex-wrap gap-2">
            {BUDGETS.map((b) => (
              <Chip key={b} active={budget === b} onClick={() => setBudget(b)}>
                {b}
              </Chip>
            ))}
          </div>
        </Step>

        <Step n={estimable ? 6 : 5} title="Seus dados">
          <ContactFields idPrefix="pedido" value={contact} onChange={setContact} />
        </Step>

        <button type="submit" disabled={sending} className="da-btn-accent group w-full !py-4 text-base disabled:cursor-wait disabled:opacity-60">
          <SendIcon className="h-4 w-4" /> {sending ? "Enviando..." : "Enviar pedido de orçamento"}
        </button>
      </div>
    </form>
  );
}
