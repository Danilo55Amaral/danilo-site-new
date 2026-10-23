// ============================================================================
// PERFIL — quem é o Danilo: nome, cargos, links das redes e os números do topo.
// Tudo que aparece em mais de uma seção (WhatsApp, redes, foto) sai daqui.
// ============================================================================

export const PROFILE = {
  name: "Danilo Amaral",
  fullName: "Danilo Gabriel Amaral Ferreira",
  photo: "/img/danilo.webp",
  /** Onde mora hoje (topo e Sobre). */
  location: "Recife, Pernambuco",
  /** Onde nasceu (Sobre). */
  hometown: "Vitória de Santo Antão, Pernambuco",
  /** Os cargos que se revezam no topo, digitados um de cada vez. */
  roles: ["Engenheiro de Software", "Cientista de Dados", "Professor de Programação"],
  /** O ano em que começou na área de TI (Brisanet), pra contar os anos de experiência. */
  careerStart: 2019,
  siteUrl: "https://danilo-site-new.vercel.app",
};

export const LINKS = {
  whatsapp: "https://wa.me/message/ZAEPJ4ITGJ3WL1",
  github: "https://github.com/Danilo55Amaral",
  linkedin: "https://www.linkedin.com/in/danilo-gabriel-amaral-ferreira-305457195/",
  instagram: "https://www.instagram.com/danilo_kairois",
};

export type SocialId = "whatsapp" | "github" | "linkedin" | "instagram";

export interface Social {
  id: SocialId;
  label: string;
  /** O que aparece embaixo do nome no cartão de contato. */
  handle: string;
  href: string;
}

export const SOCIALS: Social[] = [
  { id: "whatsapp", label: "WhatsApp", handle: "Resposta rápida", href: LINKS.whatsapp },
  { id: "linkedin", label: "LinkedIn", handle: "Danilo Gabriel Amaral", href: LINKS.linkedin },
  { id: "github", label: "GitHub", handle: "@Danilo55Amaral", href: LINKS.github },
  { id: "instagram", label: "Instagram", handle: "@danilo_kairois", href: LINKS.instagram },
];

/** Anos de experiência na área, contando o ano de início. */
export function yearsOfExperience(now = new Date()): number {
  return now.getFullYear() - PROFILE.careerStart;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

/** Os números embaixo do topo (sobem do zero quando aparecem na tela). */
export function heroStats(): Stat[] {
  return [
    { value: yearsOfExperience(), suffix: "+", label: "anos em tecnologia" },
    { value: 40, suffix: " mil+", label: "empresas atendidas por sistemas que desenvolvi" },
    { value: 20, suffix: "+", label: "projetos publicados" },
    { value: 27, suffix: "", label: "tecnologias no dia a dia" },
  ];
}

export interface NavItem {
  id: string;
  label: string;
  /** "/#secao" (âncora da home, funciona de qualquer página) ou uma página. */
  href: string;
}

/** O catálogo de serviços com preços (página própria). */
export const CATALOG_PATH = "/catalogo";

/** O menu: as seções da home, na ordem da página, e o catálogo de preços. */
export const NAV: NavItem[] = [
  { id: "servicos", label: "Serviços", href: "/#servicos" },
  { id: "codeguilds", label: "CodeGuilds", href: "/#codeguilds" },
  { id: "sobre", label: "Sobre", href: "/#sobre" },
  { id: "projetos", label: "Projetos", href: "/#projetos" },
  { id: "ensino", label: "Ensino", href: "/#ensino" },
  { id: "precos", label: "Preços", href: CATALOG_PATH },
  { id: "contato", label: "Contato", href: "/#contato" },
];
