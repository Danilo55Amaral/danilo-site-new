"use client";

import { useEffect, useState } from "react";
import { LINKS, NAV, PROFILE } from "@/engine/profile";
import { useActiveSection, useScroll } from "@/engine/store";
import ThemeToggle from "./ThemeToggle";
import { CloseIcon, MenuIcon, SocialIcon } from "./Icons";

const SECTION_IDS = NAV.map((n) => n.id);

/** O monograma "DA" com o degradê da marca. */
export function Logo() {
  return (
    <a href="#inicio" className="group flex items-center gap-2.5" aria-label={`${PROFILE.name} — início`}>
      <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 font-display text-sm font-bold text-da-onaccent shadow-lg shadow-fuchsia-500/30 transition-transform group-hover:rotate-6">
        DA
      </span>
      <span className="font-display text-base font-bold tracking-tight text-white">
        Danilo<span className="text-fuchsia-400">.</span>dev
      </span>
    </a>
  );
}

/**
 * Cabeçalho fixo: transparente no topo, vidro fosco depois de rolar. O link da
 * seção que está na tela fica marcado, e a barrinha embaixo mostra quanto da
 * página já foi lido. No celular, o menu abre em tela cheia.
 */
export default function Header() {
  const { progress, scrolled } = useScroll();
  const active = useActiveSection(SECTION_IDS);
  const [open, setOpen] = useState(false);

  // Menu aberto no celular: trava a rolagem da página por baixo, e o Esc fecha
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled || open ? "border-b border-slate-800/70 bg-da-bg/75 backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <div className="da-container flex h-16 items-center justify-between gap-4">
          <Logo />

          <nav className="hidden items-center gap-1 rounded-full border border-slate-800/80 bg-da-card/60 p-1 backdrop-blur lg:flex" aria-label="Seções do site">
            {NAV.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  active === item.id ? "bg-white text-da-ink" : "text-slate-400 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a href="#contato" className="da-btn-accent hidden !px-5 !py-2.5 sm:inline-flex">
              Vamos conversar
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 bg-da-raised text-slate-200 lg:hidden"
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* quanto da página já foi lido */}
        <div
          className="absolute bottom-[-1px] left-0 h-[2px] origin-left bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400"
          style={{ width: "100%", transform: `scaleX(${progress})` }}
          aria-hidden="true"
        />
      </header>

      {/* fora do <header>: o backdrop-blur dele prenderia o painel fixo dentro dos 4rem do cabeçalho */}
      {open && (
        <div className="fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col gap-2 overflow-y-auto bg-da-bg px-4 pb-10 pt-6 lg:hidden">
          {NAV.map((item, i) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
              className="da-reveal is-visible flex items-center justify-between rounded-2xl border border-slate-800 bg-da-card px-5 py-4 font-display text-lg font-semibold text-white"
              style={{ "--da-delay": `${i * 40}ms` } as React.CSSProperties}
            >
              {item.label}
              <span className="text-sm text-slate-600">0{i + 1}</span>
            </a>
          ))}
          <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="da-btn-accent mt-4">
            <SocialIcon id="whatsapp" className="h-4 w-4" /> Falar no WhatsApp
          </a>
        </div>
      )}
    </>
  );
}
