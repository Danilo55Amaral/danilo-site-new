"use client";

import { useState } from "react";
import { ANNUAL_MONTHS_PAID, PLANS, formatBRL } from "@/engine/catalog";
import Reveal from "../Reveal";
import { CheckIcon, ShieldIcon } from "../Icons";
import PickButton from "./PickButton";

/**
 * Os planos de manutenção, com a chave mensal/anual (no anual, 12 meses pelo
 * preço de 10). Escolher um plano abre o pedido de orçamento do site.
 */
export default function Plans() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="flex items-center gap-1 rounded-full border border-slate-800 bg-da-raised p-1" role="group" aria-label="Forma de cobrança">
        {[false, true].map((a) => (
          <button
            key={String(a)}
            onClick={() => setAnnual(a)}
            aria-pressed={annual === a}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${annual === a ? "bg-white text-da-ink shadow" : "text-slate-400 hover:text-white"}`}
          >
            {a ? (
              <>
                Anual <span className="ml-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] text-emerald-300">2 meses grátis</span>
              </>
            ) : (
              "Mensal"
            )}
          </button>
        ))}
      </div>

      <div className="grid w-full gap-5 md:grid-cols-3">
        {PLANS.map((plan, i) => {
          const perMonth = annual ? Math.round((plan.monthly * ANNUAL_MONTHS_PAID) / 12) : plan.monthly;
          const card = (
            <div className={`relative flex h-full flex-col gap-6 rounded-[1.4rem] bg-da-card p-7 ${plan.popular ? "" : "border border-slate-800/80"}`}>
              {plan.popular && (
                <span className="absolute -top-3 left-7 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-da-onaccent">
                  ★ Recomendado
                </span>
              )}
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-300 ring-1 ring-violet-500/30">
                  <ShieldIcon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold text-white">{plan.name}</h3>
                  <p className="text-xs text-slate-500">{plan.pitch}</p>
                </div>
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-4xl font-bold text-white">{formatBRL(perMonth)}</span>
                  <span className="text-sm text-slate-500">/mês</span>
                </div>
                <p className="mt-1 h-4 text-xs text-emerald-300">
                  {annual ? `${formatBRL(plan.monthly * ANNUAL_MONTHS_PAID)} por ano · economia de ${formatBRL(plan.monthly * (12 - ANNUAL_MONTHS_PAID))}` : ""}
                </p>
              </div>
              <ul className="flex flex-col gap-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /> {f}
                  </li>
                ))}
              </ul>
              <PickButton
                itemId={`plano-${plan.id}`}
                mode="orcamento"
                note={annual ? "Quero a cobrança anual (12 meses pelo preço de 10)." : undefined}
                className={`mt-auto w-full ${plan.popular ? "da-btn-accent" : "da-btn-secondary"}`}
              >
                Quero o plano {plan.name}
              </PickButton>
            </div>
          );
          return (
            <Reveal key={plan.id} delay={i * 90}>
              {plan.popular ? <div className="da-ring h-full rounded-[1.5rem] p-[2px]">{card}</div> : <div className="h-full p-[2px]">{card}</div>}
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
