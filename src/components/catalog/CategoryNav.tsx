"use client";

import { useEffect, useRef } from "react";
import { CATEGORIES } from "@/engine/catalog";
import { useActiveSection } from "@/engine/store";
import { ServiceIcon } from "../Icons";

const IDS = [...CATEGORIES.map((c) => c.id), "planos", "pedido"];

/**
 * A barra de categorias que gruda embaixo do cabeçalho enquanto o visitante
 * rola o catálogo. A categoria na tela fica marcada e, no celular, a barra
 * rola sozinha até ela.
 */
export default function CategoryNav() {
  const active = useActiveSection(IDS);
  const listRef = useRef<HTMLDivElement>(null);

  // Rola só a barra (scrollIntoView rolaria a página inteira até ela, no celular)
  useEffect(() => {
    const list = listRef.current;
    const el = list?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!list || !el) return;
    list.scrollTo({ left: el.offsetLeft - list.clientWidth / 2 + el.clientWidth / 2, behavior: "smooth" });
  }, [active]);

  return (
    <div className="sticky top-16 z-30 border-y border-slate-800/70 bg-da-bg/80 backdrop-blur-xl">
      <div
        ref={listRef}
        className="da-container relative flex gap-2 overflow-x-auto py-3 [mask-image:linear-gradient(to_right,#000_92%,transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {CATEGORIES.map((c) => (
          <a
            key={c.id}
            data-id={c.id}
            href={`#${c.id}`}
            className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
              active === c.id ? "bg-white text-da-ink shadow-lg" : "border border-slate-800 bg-da-raised text-slate-400 hover:text-white"
            }`}
          >
            <ServiceIcon id={c.id} className="h-4 w-4" />
            {c.label}
            {c.unavailable && (
              <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-300">em breve</span>
            )}
          </a>
        ))}
        <a
          data-id="planos"
          href="#planos"
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
            active === "planos" ? "bg-white text-da-ink shadow-lg" : "border border-slate-800 bg-da-raised text-slate-400 hover:text-white"
          }`}
        >
          Manutenção
        </a>
        <a
          data-id="pedido"
          href="#pedido"
          className="shrink-0 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2 text-sm font-semibold text-da-onaccent shadow-md shadow-fuchsia-500/20"
        >
          Fazer pedido
        </a>
      </div>
    </div>
  );
}
