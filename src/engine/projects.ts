// ============================================================================
// PROJETOS — o portfólio. O SPE é o destaque, com cartão grande (o CodeGuilds
// tem uma seção só dele, ver engine/codeguilds.ts); os demais entram na grade
// com o filtro por trilha (Front-end, Back-end, Dados). As imagens ficam em
// public/img/projetos.
// ============================================================================

export type Track = "frontend" | "backend" | "dados";

export const TRACKS: { id: Track | "todos"; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "frontend", label: "Front-end" },
  { id: "backend", label: "Back-end" },
  { id: "dados", label: "Ciência de Dados" },
];

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tracks: Track[];
  tags: string[];
  /** Repositório ou site publicado; sem link, o cartão não é clicável. */
  href?: string;
}

export interface FeaturedProject extends Project {
  /** A etiqueta em cima do título ("Gestão pública · Full-stack"). */
  kicker: string;
  highlights: string[];
}

const GH = "https://github.com/Danilo55Amaral";

export const FEATURED: FeaturedProject[] = [
  {
    id: "spe",
    kicker: "Gestão pública · Full-stack",
    title: "SPE — Sistema de Painel Eletrônico",
    description:
      "Uma solução inovadora que modernizou a gestão pública da Câmara Municipal de Chã de Alegria: o painel eletrônico das sessões, com os vereadores, data e hora, e uma API dedicada.",
    image: "/img/projetos/spe.png",
    tracks: ["frontend", "backend"],
    tags: ["React", "Node.js", "TypeScript", "API REST"],
    highlights: ["Painel eletrônico das sessões", "API própria para o sistema", "Desenvolvido com Fabrício Santos"],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "eu-sou-junior",
    title: "Eu Sou Junior",
    description: "Site de portfólio profissional, rápido e responsivo.",
    image: "/img/projetos/eu-sou-junior.png",
    tracks: ["frontend"],
    tags: ["Next.js", "Tailwind"],
    href: "https://site-junior-ribeiro.vercel.app",
  },
  {
    id: "dt-money-2",
    title: "DT Money 2.0",
    description: "Controle de finanças com novas funcionalidades e um visual mais clean.",
    image: "/img/projetos/dt-money-2.png",
    tracks: ["frontend"],
    tags: ["React", "TypeScript", "Styled"],
    href: `${GH}/dtmoney2.0`,
  },
  {
    id: "template-admin",
    title: "Template Administrativo",
    description: "Sistema administrativo com login pela API do Firebase do Google.",
    image: "/img/projetos/template-admin.png",
    tracks: ["frontend"],
    tags: ["Next.js", "Firebase", "Tailwind"],
    href: `${GH}/Projeto-Template-Administrativo`,
  },
  {
    id: "api-restful",
    title: "API Restful Node.js",
    description: "API completa em Node.js com TypeScript, banco de dados e testes.",
    image: "/img/projetos/codigo.jpg",
    tracks: ["backend"],
    tags: ["Node.js", "TypeScript", "SQL"],
    href: `${GH}/Api-Restful-Nodejs`,
  },
  {
    id: "python-dados",
    title: "Python para Ciência de Dados",
    description: "Análises com Pandas e NumPy, as bibliotecas mais usadas em Ciência de Dados.",
    image: "/img/projetos/pandas.png",
    tracks: ["dados"],
    tags: ["Python", "Pandas", "NumPy"],
    href: `${GH}/Python-para-Ciencia-de-Dados`,
  },
  {
    id: "docker",
    title: "Banco de Dados com Docker",
    description: "Subindo bancos de dados em contêineres para desenvolvimento e produção.",
    image: "/img/projetos/docker.png",
    tracks: ["backend", "dados"],
    tags: ["Docker", "MySQL"],
    href: `${GH}/Utilizando-Docker-com-Banco-de-dados`,
  },
  {
    id: "quiz",
    title: "Quiz Full-stack",
    description: "Quiz de perguntas e respostas com front-end e back-end próprios.",
    image: "/img/projetos/quiz.png",
    tracks: ["frontend", "backend"],
    tags: ["React", "Node.js"],
    href: `${GH}/Projeto-Quiz-FullStack`,
  },
  {
    id: "modelagem",
    title: "Projeto Lógico de Banco de Dados",
    description: "Modelagem relacional completa, do diagrama às consultas SQL.",
    image: "/img/projetos/modelagem.png",
    tracks: ["backend", "dados"],
    tags: ["SQL", "Modelagem"],
    href: `${GH}/Desafio-Projeto-Logico-De-Banco-De-Dados`,
  },
  {
    id: "mybank",
    title: "MyBank 2.0",
    description: "Sistema bancário em Python com depósitos, saques, extrato e usuários.",
    image: "/img/projetos/mybank.png",
    tracks: ["backend"],
    tags: ["Python"],
    href: `${GH}/Desafio-Otimizando-Sistema-Bancario-Python`,
  },
  {
    id: "oficina",
    title: "Banco de Dados de uma Oficina",
    description: "Projeto lógico de banco para o dia a dia de uma oficina mecânica.",
    image: "/img/projetos/modelagem-oficina.png",
    tracks: ["backend", "dados"],
    tags: ["SQL", "Modelagem"],
    href: `${GH}/Desafio-Projeto-Logico-Oficina`,
  },
  {
    id: "ignite-timer",
    title: "Ignite Timer",
    description: "Temporizador de foco com ciclos, histórico e contexto global.",
    image: "/img/projetos/ignite-timer.png",
    tracks: ["frontend"],
    tags: ["React", "TypeScript"],
    href: `${GH}/Ignite-Timer`,
  },
  {
    id: "dt-money",
    title: "DT Money",
    description: "A primeira versão do sistema de controle de finanças.",
    image: "/img/projetos/dt-money.png",
    tracks: ["frontend"],
    tags: ["React", "TypeScript"],
    href: `${GH}/dtmoney`,
  },
  {
    id: "fundamentos-node",
    title: "Fundamentos do Node.js",
    description: "API RESTful feita à mão, sem nenhuma dependência externa.",
    image: "/img/projetos/codigo.jpg",
    tracks: ["backend"],
    tags: ["Node.js"],
    href: `${GH}/Fundamentos-Nodejs`,
  },
  {
    id: "monty-hall",
    title: "Monty Hall",
    description: "O jogo da porta misteriosa: descubra em qual porta está o presente.",
    image: "/img/projetos/monty-hall.jpg",
    tracks: ["frontend"],
    tags: ["Next.js", "React"],
    href: `${GH}/Desafio-Monty-Hall`,
  },
  {
    id: "calculadora",
    title: "Calculadora",
    description: "A calculadora mais linda já criada ^-^",
    image: "/img/projetos/calculadora.png",
    tracks: ["frontend"],
    tags: ["React"],
    href: `${GH}/Desafio-Calculadora-React`,
  },
  {
    id: "lista-tarefas",
    title: "Lista de Tarefas",
    description: "Organizador de tarefas simples e direto ao ponto.",
    image: "/img/projetos/lista-tarefas.jpg",
    tracks: ["frontend"],
    tags: ["JavaScript"],
  },
];

/** Quantos cartões a grade mostra antes do botão "Ver todos". */
export const INITIAL_PROJECTS = 6;
