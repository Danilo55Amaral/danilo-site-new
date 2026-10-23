import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { THEME_INIT_SCRIPT } from "@/engine/theme";
import { LINKS, PROFILE } from "@/engine/profile";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const display = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-display", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

const TITLE = `${PROFILE.name} — Engenheiro de Software, Cientista de Dados e Professor de Programação`;
const DESCRIPTION =
  "Sites, sistemas web, APIs e projetos de dados sob medida, além de aulas de programação. Conheça os projetos de Danilo Amaral, fundador e desenvolvedor do CodeGuilds.";

export const metadata: Metadata = {
  metadataBase: new URL(PROFILE.siteUrl),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Danilo Amaral",
    "desenvolvedor full-stack",
    "engenheiro de software",
    "cientista de dados",
    "professor de programação",
    "criação de sites",
    "Next.js",
    "React",
    "CodeGuilds",
    "Pernambuco",
  ],
  authors: [{ name: PROFILE.name, url: PROFILE.siteUrl }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: PROFILE.siteUrl,
    title: TITLE,
    description: DESCRIPTION,
    siteName: PROFILE.name,
    images: [{ url: PROFILE.photo, width: 800, height: 800, alt: PROFILE.name }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07070b" },
    { media: "(prefers-color-scheme: light)", color: "#f6f7fb" },
  ],
};

// Dados estruturados (schema.org): o Google entende quem é a pessoa e quais são as redes dela.
const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PROFILE.name,
  alternateName: PROFILE.fullName,
  url: PROFILE.siteUrl,
  image: `${PROFILE.siteUrl}${PROFILE.photo}`,
  jobTitle: PROFILE.roles,
  alumniOf: "Centro Universitário Leonardo Da Vinci (UNIASSELVI)",
  address: { "@type": "PostalAddress", addressLocality: "Vitória de Santo Antão", addressRegion: "PE", addressCountry: "BR" },
  sameAs: [LINKS.github, LINKS.linkedin, LINKS.instagram],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // O script do <head> põe a classe `light` antes do React — daí o suppressHydrationWarning.
    <html lang="pt-br" suppressHydrationWarning className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
