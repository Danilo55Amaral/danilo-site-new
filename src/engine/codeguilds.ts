// ============================================================================
// CODEGUILDS — a vitrine do projeto que o Danilo fundou e desenvolve: uma
// academia do conhecimento gamificada. Os brasões das casas (public/img/
// codeguilds) e os números vêm do próprio projeto.
// ============================================================================

export interface GuildHouse {
  id: string;
  name: string;
  virtue: string;
  crest: string;
  /** Cor do brilho atrás do brasão (rgb), igual à da casa na plataforma. */
  glow: string;
}

export const GUILD_HOUSES: GuildHouse[] = [
  { id: "ignis", name: "Ignis", virtue: "Coragem", crest: "/img/codeguilds/ignis.png", glow: "248 113 113" },
  { id: "noctis", name: "Noctis", virtue: "Astúcia", crest: "/img/codeguilds/noctis.png", glow: "52 211 153" },
  { id: "flavus", name: "Flavus", virtue: "Lealdade", crest: "/img/codeguilds/flavus.png", glow: "251 191 36" },
  { id: "sapientia", name: "Sapientia", virtue: "Lógica", crest: "/img/codeguilds/sapientia.png", glow: "96 165 250" },
];

export const GUILD_STATS = [
  { value: "4", label: "casas para os alunos" },
  { value: "21", label: "matérias com missões" },
  { value: "14", label: "livros ilustrados" },
  { value: "6", label: "eventos especiais" },
];

export interface GuildFeature {
  icon: string;
  title: string;
  text: string;
}

export const GUILD_FEATURES: GuildFeature[] = [
  { icon: "⚔️", title: "Missões que viram aventura", text: "Quizzes e entregas de todas as matérias valem XP, moedas e itens lendários." },
  { icon: "🏰", title: "Quatro casas rivais", text: "Cada aluno escolhe a sua casa, cria o avatar e disputa o ranking com a turma." },
  { icon: "📚", title: "Biblioteca virtual", text: "Livros ilustrados de Biologia, Física, Astronomia, Programação e muito mais." },
  { icon: "🐉", title: "Eventos e chefões", text: "Halloween, Natal, invasão zumbi e o Dragão Ancestral no Multiverso." },
  { icon: "🎓", title: "Painel do professor", text: "Cria missões, corrige entregas, manda comunicados e acompanha cada aluno." },
  { icon: "🛡️", title: "Seguro de ponta a ponta", text: "Regras do jogo validadas na API, senhas com Argon2 e sessões em cookie httpOnly." },
];

export const GUILD_STACK = ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS", "Fastify", "Kysely", "PostgreSQL", "Supabase", "Docker"];

export const GUILD_REPO = "https://github.com/Danilo55Amaral/code-guilds";
