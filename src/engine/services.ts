// ============================================================================
// SERVIÇOS — o que o Danilo vende. Cada serviço vira um cartão na seção
// Serviços e uma opção no formulário de contato. O `accent` é a família de cor
// do Tailwind usada no ícone e no brilho do cartão.
// ============================================================================

export type ServiceId = "sites" | "sistemas" | "apis" | "dados" | "aulas" | "consultoria";

export type Accent = "violet" | "fuchsia" | "cyan" | "emerald" | "amber" | "sky";

export interface Service {
  id: ServiceId;
  /** Fora de venda no momento: o cartão mostra o aviso em vez do link pro catálogo. */
  unavailable?: string;
  title: string;
  /** A frase de venda, logo abaixo do título. */
  pitch: string;
  /** O que o cliente recebe (os itens com ✓ do cartão). */
  deliverables: string[];
  accent: Accent;
}

export const SERVICES: Service[] = [
  {
    id: "sites",
    title: "Sites & Landing Pages",
    pitch: "Sites rápidos, bonitos e prontos para o Google, feitos para transformar visitantes em clientes.",
    deliverables: ["Next.js com SEO e performance nota 90+", "Layout responsivo e tema claro/escuro", "Publicação na nuvem e domínio próprio"],
    accent: "violet",
  },
  {
    id: "sistemas",
    title: "Sistemas Web sob medida",
    pitch: "CRMs, painéis, plataformas e e-commerces que automatizam o seu negócio — do jeito que ele funciona.",
    deliverables: ["Login, permissões e painel administrativo", "Integração com APIs e pagamentos", "Arquitetura pronta para crescer"],
    accent: "fuchsia",
  },
  {
    id: "apis",
    title: "APIs & Back-end",
    pitch: "APIs seguras e bem documentadas em Node.js e TypeScript, com bancos de dados que aguentam o tranco.",
    deliverables: ["APIs REST com Node.js e TypeScript", "MySQL, PostgreSQL e Docker", "Autenticação segura e testes"],
    accent: "cyan",
  },
  {
    id: "dados",
    title: "Ciência de Dados",
    pitch: "Seus dados viram decisões: análises, relatórios e dashboards que mostram onde está o resultado.",
    deliverables: ["Análise com Python, Pandas e NumPy", "ETL e modelagem de bancos de dados", "Dashboards e indicadores do negócio"],
    accent: "emerald",
  },
  {
    id: "aulas",
    unavailable: "Indisponível no momento",
    title: "Aulas & Mentoria",
    pitch: "Hoje dou aulas só na Passaporte Edu, como Professor de Tecnologia. Aulas particulares e turmas próprias: em breve.",
    deliverables: ["Lógica, JavaScript, Python e mais", "Criação de apps e jogos 2D e 3D", "Aulas particulares e mentorias (em breve)"],
    accent: "amber",
  },
  {
    id: "consultoria",
    title: "Consultoria em Tecnologia",
    pitch: "Um olhar técnico para tirar sua ideia do papel: escolha de stack, arquitetura, nuvem e boas práticas.",
    deliverables: ["Diagnóstico e plano técnico do projeto", "Revisão de código e arquitetura", "Metodologias ágeis (SCRUM e Kanban)"],
    accent: "sky",
  },
];

export interface ProcessStep {
  title: string;
  text: string;
}

/** Como um projeto anda, do primeiro contato à entrega (seção "Como trabalho"). */
export const PROCESS: ProcessStep[] = [
  {
    title: "Conversa & diagnóstico",
    text: "Entendo o seu negócio, o problema e o objetivo. Nada de tecniquês: a gente fala a mesma língua.",
  },
  {
    title: "Proposta sem surpresas",
    text: "Escopo, prazo e investimento claros, por escrito. Você sabe exatamente o que vai receber e quando.",
  },
  {
    title: "Desenvolvimento ágil",
    text: "Entregas a cada etapa com SCRUM e Kanban. Você acompanha o projeto crescendo e ajusta no caminho.",
  },
  {
    title: "Entrega & suporte",
    text: "Publicação, treinamento e suporte técnico humanizado depois do lançamento. Eu não sumo.",
  },
];
