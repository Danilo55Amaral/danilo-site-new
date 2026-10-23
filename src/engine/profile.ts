// ============================================================================
// PERFIL — quem é o Danilo: nome, cargos, links das redes e os números do topo.
// Tudo que aparece em mais de uma seção (WhatsApp, redes, foto) sai daqui.
// ============================================================================

export const PROFILE = {
  name: "Danilo Amaral",
  fullName: "Danilo Gabriel Amaral Ferreira",
  photo: "/img/danilo.webp",
  location: "Recife, Pernambuco",
  /** Os cargos que se revezam no topo, digitados um de cada vez. */
  roles: ["Engenheiro de Software", "Cientista de Dados", "Professor de Programação"],
  /** O ano em que começou na área de TI (Brisanet), pra contar os anos de experiência. */
  careerStart: 2019,
  siteUrl: "https://danilo-landing-page.vercel.app",
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
}

/** As seções do menu, na ordem da página (o id é a âncora de cada uma). */
export const NAV: NavItem[] = [
  { id: "inicio", label: "Início" },
  { id: "servicos", label: "Serviços" },
  { id: "codeguilds", label: "CodeGuilds" },
  { id: "sobre", label: "Sobre" },
  { id: "projetos", label: "Projetos" },
  { id: "ensino", label: "Ensino" },
  { id: "contato", label: "Contato" },
];
