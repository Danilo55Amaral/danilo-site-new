import { CatalogItem, formatBRL, priceLabel } from "@/engine/catalog";
import { ArrowRightIcon, CalendarIcon, CheckIcon, ClockIcon } from "../Icons";
import PickButton from "./PickButton";

/**
 * O cartão de um serviço do catálogo: nome, preço, prazo, o que está incluso
 * e o botão que leva pro painel de pedido. O "Mais escolhido" ganha a borda em
 * degradê girando e o botão colorido — é a âncora entre o básico e o premium.
 * Serviço indisponível (`unavailable`) aparece esmaecido, sem destaque e sem botão.
 */
export default function CatalogCard({ item, unavailable = false }: { item: CatalogItem; unavailable?: boolean }) {
  const price = priceLabel(item);
  const free = item.from === 0;
  const popular = item.popular && !unavailable;

  const body = (
    <div
      className={`relative flex h-full flex-col gap-5 rounded-[1.4rem] p-6 sm:p-7 ${
        popular ? "bg-da-card" : "border border-slate-800/80 bg-da-card transition-colors hover:border-slate-700"
      } ${unavailable ? "opacity-60 saturate-50" : ""}`}
    >
      {popular && (
        <span className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-da-onaccent shadow-lg shadow-fuchsia-500/30">
          ★ Mais escolhido
        </span>
      )}

      <div className="flex flex-col gap-2">
        <h3 className="font-display text-xl font-bold text-white">{item.name}</h3>
        <p className="text-sm leading-relaxed text-slate-400">{item.pitch}</p>
      </div>

      {/* preço */}
      <div className="flex flex-col gap-1 rounded-2xl border border-slate-800/80 bg-da-sunken px-4 py-3.5">
        {price.prefix && <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">{price.prefix}</span>}
        <div className="flex items-baseline gap-1">
          <span className={`whitespace-nowrap font-display text-3xl font-bold ${free ? "text-emerald-300" : "text-white"}`}>{price.value}</span>
          {price.suffix && <span className="text-sm font-medium text-slate-500">{price.suffix}</span>}
        </div>
        <span className="text-xs text-slate-500">
          {item.to ? `Faixa típica: ${formatBRL(item.from)} a ${formatBRL(item.to)}` : item.from > 0 && !price.suffix ? "Valor final sob consulta" : " "}
        </span>
      </div>

      <p className="flex items-center gap-2 text-xs font-medium text-slate-400">
        <ClockIcon className="h-4 w-4 shrink-0 text-violet-300" /> {item.deadline}
      </p>

      <ul className="flex flex-col gap-2.5">
        {item.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
            <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-col gap-4 border-t border-slate-800/80 pt-5">
        <p className="text-xs text-slate-500">
          <span className="font-semibold text-slate-400">Ideal para:</span> {item.idealFor}
        </p>
        {unavailable ? (
          <span className="flex w-full cursor-not-allowed items-center justify-center rounded-full border border-dashed border-slate-700 px-6 py-3.5 text-sm font-semibold text-slate-500">
            Indisponível no momento
          </span>
        ) : (
          <PickButton
            itemId={item.id}
            mode={item.booking ? "agendamento" : "orcamento"}
            className={`group ${popular || free ? "da-btn-accent" : "da-btn-secondary"} w-full`}
          >
            {item.booking ? (
              <>
                <CalendarIcon className="h-4 w-4" /> {free ? "Agendar grátis" : "Agendar"}
              </>
            ) : (
              <>
                Pedir orçamento <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </PickButton>
        )}
      </div>
    </div>
  );

  return popular ? (
    <div className="da-ring h-full rounded-[1.5rem] p-[2px] shadow-2xl shadow-violet-500/10">{body}</div>
  ) : (
    <div className="h-full p-[2px]">{body}</div>
  );
}
