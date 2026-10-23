import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import colors from "tailwindcss/colors";

// ============================================================================
// TEMAS — escuro (padrão) e claro.
//
// Cada cor da paleta (white, slate-500, violet-300...) lê uma variável CSS cujo
// valor padrão é a própria cor do Tailwind. Sem a classe `light` no <html>,
// nenhuma variável é definida e tudo sai exatamente como no tema escuro.
// Com `html.light`, só as variáveis mudam: fundos escuros viram claros, os
// cinzas se invertem (texto claro vira escuro) e os tons claros de destaque
// (200–400) viram os escuros (800–600), pra ter contraste no fundo branco.
//
// `.da-dark-scope` volta as variáveis pro padrão dentro de um trecho — usado
// nos blocos que são sempre escuros (a janela de código do topo, por exemplo).
// ============================================================================

const FAMILIES = [
  "slate", "red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal",
  "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose",
] as const;
const SHADES = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"] as const;
type Shade = (typeof SHADES)[number];

/** "#0d0d14" -> "13 13 20" (formato que o Tailwind usa com <alpha-value>). */
function rgb(hex: string): string {
  const h = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)).join(" ");
}

function colorVar(name: string, hex: string): string {
  return `rgb(var(--da-c-${name}, ${rgb(hex)}) / <alpha-value>)`;
}

// Cores próprias do site. Valor = tema escuro.
const DA_DARK = {
  bg: "#07070b", // fundo da página
  surface: "#0b0b12", // faixas de seção com fundo diferente
  card: "#0f0f18", // cartões
  raised: "#141420", // botão secundário, chips
  sunken: "#09090f", // campos, caixas dentro de cartões
  hover: "#181826", // fundo ao passar o mouse
  ink: "#07070b", // texto dos botões brancos
  onaccent: "#ffffff", // texto sobre botão colorido (branco nos dois temas)
};

const DA_LIGHT: Record<keyof typeof DA_DARK, string> = {
  bg: "#f6f7fb",
  surface: "#eef0f7",
  card: "#ffffff",
  raised: "#ffffff",
  sunken: "#f3f4f9",
  hover: "#eceef6",
  ink: "#ffffff",
  onaccent: "#ffffff",
};

// No claro os cinzas se invertem; o 400 ganha um tom próprio pra não empatar com o 500.
const SLATE_LIGHT: Record<Shade, string> = {
  "50": colors.slate[950],
  "100": colors.slate[800],
  "200": colors.slate[700],
  "300": colors.slate[600],
  "400": "#556377",
  "500": colors.slate[500],
  "600": colors.slate[400],
  "700": colors.slate[300],
  "800": colors.slate[200],
  "900": colors.slate[100],
  "950": colors.slate[50],
};

// Demais cores: tons de texto (50–400) e de fundo escuro (800–950) trocam de lado; 500–700 ficam.
const ACCENT_SWAP: Partial<Record<Shade, Shade>> = {
  "50": "950", "100": "900", "200": "800", "300": "700", "400": "600", "800": "200", "900": "100", "950": "50",
};

const themedColors: Record<string, Record<string, string> | string> = {
  white: colorVar("white", "#ffffff"),
  da: Object.fromEntries(Object.entries(DA_DARK).map(([k, hex]) => [k, colorVar(`da-${k}`, hex)])),
};
const lightVars: Record<string, string> = { "--da-c-white": rgb(colors.slate[900]) };
const allVarNames: string[] = ["--da-c-white"];

for (const [k, hex] of Object.entries(DA_LIGHT)) {
  lightVars[`--da-c-da-${k}`] = rgb(hex);
  allVarNames.push(`--da-c-da-${k}`);
}

for (const family of FAMILIES) {
  const palette = colors[family] as Record<Shade, string>;
  themedColors[family] = Object.fromEntries(SHADES.map((s) => [s, colorVar(`${family}-${s}`, palette[s])]));
  for (const s of SHADES) {
    const name = `--da-c-${family}-${s}`;
    allVarNames.push(name);
    const lightHex = family === "slate" ? SLATE_LIGHT[s] : ACCENT_SWAP[s] ? palette[ACCENT_SWAP[s]!] : undefined;
    if (lightHex && lightHex !== palette[s]) lightVars[name] = rgb(lightHex);
  }
}

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: themedColors,
      // As fontes vêm do next/font (ver app/layout.tsx), cada uma numa variável CSS.
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        "html.light": { ...lightVars, colorScheme: "light" },
        // `initial` deixa a variável inválida, e aí vale o valor padrão (tema escuro).
        ".da-dark-scope": Object.fromEntries(allVarNames.map((n) => [n, "initial"])),
      });
    }),
  ],
};
export default config;
