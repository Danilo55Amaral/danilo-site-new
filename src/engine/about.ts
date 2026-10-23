// ============================================================================
// SOBRE — a trajetória (linha do tempo), a formação, as recomendações do
// LinkedIn, o trabalho como professor e as perguntas frequentes.
// ============================================================================

export interface Milestone {
  period: string;
  title: string;
  place: string;
  text: string;
}

/** A linha do tempo da seção Sobre, da primeira experiência até hoje. */
export const CAREER: Milestone[] = [
  {
    period: "2019",
    title: "Redes & fibra óptica",
    place: "Brisanet Telecomunicações",
    text: "O começo na TI: redes de computadores, tecnologia wireless e fibra óptica. Foi aqui que nasceu a vontade de programar.",
  },
  {
    period: "2021 – 2022",
    title: "Desenvolvedor (estágio)",
    place: "CMTECH",
    text: "Front-end com React, JavaScript e TypeScript e back-end com PHP e ScriptCase no ERP Silia, que gerencia o licenciamento ambiental de Pernambuco para cerca de 40.000 empresas. MySQL e SCRUM em equipe.",
  },
  {
    period: "2022 – hoje",
    title: "Desenvolvedor Full-stack & Consultor",
    place: "Projetos próprios e consultorias",
    text: "Lojas virtuais, portfólios, CRM e o Sistema de Painel Eletrônico da Câmara Municipal de Chã de Alegria, com React, Next, Node.js, TypeScript, MySQL e Docker.",
  },
  {
    period: "Hoje",
    title: "Professor de Linguagem de Programação",
    place: "Passaporte Edu",
    text: "Ensino lógica, linguagens de programação e o desenvolvimento prático de apps e jogos 2D e 3D, levando a experiência do mercado para a sala de aula.",
  },
];

export interface Degree {
  title: string;
  level: string;
  school: string;
  year: string;
  image: string;
}

export const DEGREES: Degree[] = [
  {
    title: "Análise e Desenvolvimento de Sistemas",
    level: "Graduação · Tecnólogo",
    school: "Centro Universitário Leonardo Da Vinci (UNIASSELVI)",
    year: "2023",
    image: "/img/diplomas/ads.png",
  },
  {
    title: "Ciência de Dados",
    level: "Pós-graduação Lato Sensu · 360 h",
    school: "Centro Universitário Leonardo Da Vinci (UNIASSELVI)",
    year: "2024",
    image: "/img/diplomas/ciencia-de-dados.png",
  },
];

export interface Testimonial {
  name: string;
  role: string;
  /** Como a pessoa trabalhou com o Danilo (do LinkedIn). */
  relation: string;
  quote: string;
}

/** Recomendações reais do LinkedIn do Danilo. */
export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Roberto Sales",
    role: "Gestor de projetos · DBA · Analista funcional",
    relation: "Trabalhou com Danilo na mesma equipe (Cmtech/Inhalt)",
    quote:
      "Danilo Gabriel é um jovem muito inteligente, estudioso e persistente. Hoje, sou testemunha do seu esforço e conquistas, que certamente irão moldar o excelente profissional que ele promete ser. Recomendo Danilo, pois sei que a sua determinação o levará a ser um grande profissional!",
  },
  {
    name: "Giullianno Lemos",
    role: "Gerente Regional · Especialista ERP Varejo · SaaS",
    relation: "Era sênior em relação a Danilo",
    quote:
      "Danilo é aquele profissional exemplar! Comprometido, proativo, resiliente, muito inteligente; nos momentos de aperto, sempre busca as soluções. Muito sério e competente, indico Danilo para quaisquer empresas que desejarem contratá-lo.",
  },
  {
    name: "Luiz Henrique Rêgo",
    role: "Gestor de RH · Especialista em Gestão de Pessoas",
    relation: "Trabalhou com Danilo em equipes diferentes",
    quote:
      "Danilo, cara sensacional, que além de talentoso, é uma pessoa que se dedica e usa o seu talento para fazer todos crescerem. Parabéns!",
  },
];

export interface Course {
  icon: string;
  title: string;
  text: string;
}

/** O que o Danilo ensina (seção Ensino). */
export const COURSES: Course[] = [
  { icon: "🧠", title: "Lógica de programação", text: "A base de tudo: pensar como um programador, passo a passo." },
  { icon: "💻", title: "Linguagens", text: "JavaScript, Python, Java, Lua, HTML e CSS na prática." },
  { icon: "📱", title: "Criação de apps", text: "Do rascunho ao app no celular com o MIT App Inventor." },
  { icon: "🎮", title: "Jogos 2D e 3D", text: "Scratch e Roblox Studio para criar mundos e jogos." },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ: FaqItem[] = [
  {
    question: "O que Danilo Amaral oferece?",
    answer:
      "Desenvolvimento de sites, sistemas web e APIs sob medida, projetos de ciência de dados, consultorias em tecnologia e aulas de programação para pessoas, turmas e empresas.",
  },
  {
    question: "Quais são as suas áreas de especialização?",
    answer: "Desenvolvimento web (front-end e back-end), computação em nuvem, ciência de dados e ensino de programação.",
  },
  {
    question: "Quais tipos de projetos você desenvolve?",
    answer:
      "Sites de portfólio e landing pages, plataformas web, e-commerce, sistemas de CRM, painéis administrativos, plataformas educacionais e soluções personalizadas em TI.",
  },
  {
    question: "Quanto custa e quanto tempo leva um projeto?",
    answer:
      "Depende do escopo. Depois de uma conversa rápida (sem compromisso), você recebe uma proposta por escrito com o que será entregue, o prazo de cada etapa e o investimento — sem surpresas no meio do caminho.",
  },
  {
    question: "Você oferece suporte técnico depois da entrega?",
    answer: "Sim. Todo projeto inclui suporte técnico personalizado e humanizado depois da publicação, além de treinamento para usar o que foi entregue.",
  },
  {
    question: "Quais tecnologias você utiliza?",
    answer: "Node.js, React, Next.js, TypeScript, Python, bancos de dados SQL, Docker, Tailwind CSS e outras ferramentas modernas do mercado.",
  },
  {
    question: "Você utiliza metodologias ágeis?",
    answer: "Sim. Trabalho com SCRUM e Kanban: o projeto é entregue em etapas e você acompanha (e ajusta) cada uma delas.",
  },
  {
    question: "Você dá aulas particulares ou para empresas?",
    answer:
      "Sim. Além das turmas na Passaporte Edu, dou aulas particulares, mentorias e workshops de programação para escolas e empresas, do zero ao avançado.",
  },
];
