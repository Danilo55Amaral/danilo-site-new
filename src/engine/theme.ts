// ============================================================================
// THEME — tema escuro (padrão) ou claro. A escolha do visitante fica no
// localStorage e vira a classe `light` no <html>; as cores em si são trocadas
// por variáveis CSS (ver tailwind.config.ts). Quem ainda não escolheu segue o
// tema do sistema operacional (prefers-color-scheme).
// ============================================================================

export type Theme = "dark" | "light";

const THEME_KEY = "da-theme";

function systemTheme(): Theme {
  return window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function getTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  try {
    const saved = window.localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    // sem localStorage (aba privada bloqueada): vale o tema do sistema
  }
  return systemTheme();
}

export function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("light", theme === "light");
}

export function setTheme(theme: Theme) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(THEME_KEY, theme);
  } catch {
    // sem localStorage: o tema vale só até recarregar
  }
  applyTheme(theme);
}

/**
 * Roda no <head>, antes da página aparecer — senão quem usa o modo claro veria
 * um "piscar" do tema escuro a cada carregamento.
 */
export const THEME_INIT_SCRIPT = `try{var t=localStorage.getItem("${THEME_KEY}");if(t==="light"||(!t&&matchMedia("(prefers-color-scheme: light)").matches))document.documentElement.classList.add("light")}catch(e){}`;
