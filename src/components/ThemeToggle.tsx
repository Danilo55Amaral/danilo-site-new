"use client";

import { useTheme } from "@/engine/store";
import { MoonIcon, SunIcon } from "./Icons";

/**
 * Botão que alterna o tema: no escuro mostra o ☀️ (vai pro claro); no claro
 * mostra a 🌙 (volta pro escuro). O ícone gira na troca.
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  const label = isDark ? "Ativar modo claro" : "Ativar modo escuro";
  return (
    <button
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`group relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-800 bg-da-raised transition-colors hover:border-slate-600 ${
        isDark ? "text-amber-300" : "text-violet-400"
      } ${className}`}
    >
      <span key={theme} className="transition-transform duration-500 group-hover:rotate-45">
        {isDark ? <SunIcon className="h-[18px] w-[18px]" /> : <MoonIcon className="h-4 w-4" />}
      </span>
    </button>
  );
}
