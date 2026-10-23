// ============================================================================
// HABILIDADES — as 27 tecnologias, agrupadas por área. O ícone vem do Devicon
// (CDN): `icon` é o caminho dentro de /icons. As duas que o Devicon não tem
// (Styled Components e Google Analytics) vêm do Simple Icons (`simple`). Os
// logos escuros (GitHub, Next, Vercel...) ganham `invert` pra continuar
// visíveis no tema escuro.
// ============================================================================

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons";
const SIMPLE_ICONS = "https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons";

export interface Skill {
  name: string;
  icon: string;
  /** Logo preto: inverte as cores no tema escuro. */
  invert?: boolean;
  /** O ícone vem do Simple Icons (`icon` = nome do arquivo, sem .svg). */
  simple?: boolean;
}

export interface SkillGroup {
  title: string;
  skills: Skill[];
}

export function skillIcon(skill: Skill): string {
  return skill.simple ? `${SIMPLE_ICONS}/${skill.icon}.svg` : `${DEVICON}/${skill.icon}`;
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Front-end",
    skills: [
      { name: "React", icon: "react/react-original.svg" },
      { name: "Next.js", icon: "nextjs/nextjs-original.svg", invert: true },
      { name: "Angular", icon: "angular/angular-original.svg" },
      { name: "TypeScript", icon: "typescript/typescript-original.svg" },
      { name: "JavaScript", icon: "javascript/javascript-original.svg" },
      { name: "HTML5", icon: "html5/html5-original.svg" },
      { name: "CSS3", icon: "css3/css3-original.svg" },
      { name: "Tailwind CSS", icon: "tailwindcss/tailwindcss-original.svg" },
      { name: "Styled Components", icon: "styledcomponents", simple: true, invert: true },
      { name: "Bootstrap", icon: "bootstrap/bootstrap-original.svg" },
    ],
  },
  {
    title: "Back-end & Dados",
    skills: [
      { name: "Node.js", icon: "nodejs/nodejs-original.svg" },
      { name: "Python", icon: "python/python-original.svg" },
      { name: "PHP", icon: "php/php-original.svg" },
      { name: "MySQL", icon: "mysql/mysql-original.svg" },
      { name: "Firebase", icon: "firebase/firebase-original.svg" },
      { name: "Docker", icon: "docker/docker-original.svg" },
      { name: "Bash", icon: "bash/bash-original.svg", invert: true },
      { name: "npm", icon: "npm/npm-original-wordmark.svg" },
    ],
  },
  {
    title: "Nuvem & produtividade",
    skills: [
      { name: "Git", icon: "git/git-original.svg" },
      { name: "GitHub", icon: "github/github-original.svg", invert: true },
      { name: "Vercel", icon: "vercel/vercel-original.svg", invert: true },
      { name: "Netlify", icon: "netlify/netlify-original.svg" },
      { name: "Figma", icon: "figma/figma-original.svg" },
      { name: "Slack", icon: "slack/slack-original.svg" },
      { name: "Trello", icon: "trello/trello-original.svg" },
      { name: "Notion", icon: "notion/notion-original.svg", invert: true },
      { name: "Google Analytics", icon: "googleanalytics", simple: true, invert: true },
    ],
  },
];

/** A faixa que corre embaixo do topo: as tecnologias mais pedidas pelos clientes. */
export const MARQUEE_SKILLS: Skill[] = [
  "React", "Next.js", "TypeScript", "Node.js", "Python", "Tailwind CSS", "Docker", "MySQL", "JavaScript", "Git", "Firebase", "Vercel",
].map((name) => SKILL_GROUPS.flatMap((g) => g.skills).find((s) => s.name === name)!);
