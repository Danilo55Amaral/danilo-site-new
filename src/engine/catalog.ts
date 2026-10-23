// ============================================================================
// CATÁLOGO — os serviços com preço, prazo e o que está incluso, os planos de
// manutenção, os extras e as condições de pagamento (página /catalogo).
//
// Como os preços foram montados (pesquisa de mercado, out/2026): o valor-hora
// de referência é o de um desenvolvedor full-stack pleno freelancer (mediana
// de R$ 170/h, faixa R$ 120–260/h) e o de consultor pleno/sênior (R$ 180–320/h).
// Os pacotes ficam acima do freelancer iniciante e abaixo de agência/software
// house para o mesmo escopo — preço de profissional, sem ser "barato demais"
// (proposta muito abaixo do mercado passa insegurança). Os preços são "a
// partir de" + a faixa típica: o valor final sai na proposta, pelo escopo.
//
// Pra reajustar: mude `from`/`to` aqui e o site inteiro acompanha.
// ============================================================================

import type { ServiceId } from "./services";

export type CategoryId = ServiceId | "lojas";

export type Unit = "projeto" | "hora" | "mês" | "pacote" | "integração" | "workshop" | "sessão";

export interface CatalogItem {
  id: string;
  category: CategoryId;
  name: string;
  /** A frase de venda, embaixo do nome. */
  pitch: string;
  /** Preço de partida (0 = grátis). */
  from: number;
  /** Teto da faixa típica; sem ele, o cartão mostra "sob consulta" acima do `from`. */
  to?: number;
  unit: Unit;
  deadline: string;
  features: string[];
  idealFor: string;
  /** O mais escolhido da categoria: ganha destaque (âncora de preço entre o básico e o premium). */
  popular?: boolean;
  /** Serviço que se agenda (consultoria, aula), em vez de pedir orçamento. */
  booking?: boolean;
}

export interface Category {
  id: CategoryId;
  label: string;
  title: string;
  description: string;
  /** Categoria fora de venda no momento: o texto do aviso. Os cartões aparecem, mas sem pedido nem agendamento. */
  unavailable?: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "sites",
    label: "Sites",
    title: "Sites & Landing Pages",
    description: "Presença profissional que aparece no Google e transforma visitantes em clientes.",
  },
  {
    id: "lojas",
    label: "Lojas virtuais",
    title: "Lojas Virtuais",
    description: "Venda todos os dias, com pagamento por Pix, cartão e boleto — da vitrine simples à loja própria.",
  },
  {
    id: "sistemas",
    label: "Sistemas web",
    title: "Sistemas Web sob Medida",
    description: "Tire a empresa das planilhas: CRMs, painéis, agendamentos e plataformas do jeito que o seu negócio funciona.",
  },
  {
    id: "apis",
    label: "APIs & automações",
    title: "APIs, Apps & Automações",
    description: "Back-end, integrações, aplicativos instaláveis e robôs que acabam com o trabalho repetitivo.",
  },
  {
    id: "dados",
    label: "Ciência de dados",
    title: "Ciência de Dados",
    description: "Seus dados organizados, analisados e transformados em painéis para decidir com números.",
  },
  {
    id: "consultoria",
    label: "Consultoria",
    title: "Consultoria em Tecnologia",
    description: "Um especialista ao seu lado para decidir a tecnologia certa, revisar projetos e evitar prejuízo.",
  },
  {
    id: "aulas",
    label: "Aulas & mentoria",
    title: "Aulas & Mentoria",
    description: "Aprenda a programar com quem ensina todos os dias — do zero ao primeiro projeto publicado.",
    // Por enquanto o Danilo dá aulas só na Passaporte Edu (é professor de tecnologia lá).
    // Quando abrir as aulas particulares, é só apagar esta linha.
    unavailable:
      "No momento, minhas aulas são exclusivas da Passaporte Edu, onde sou Professor de Tecnologia. Aulas particulares, mentorias e turmas próprias estão em definição — em breve por aqui.",
  },
];

export const CATALOG: CatalogItem[] = [
  // ---- Sites ----------------------------------------------------------------
  {
    id: "landing-page",
    category: "sites",
    name: "Landing Page",
    pitch: "Uma página de alta conversão para campanhas, lançamentos e profissionais autônomos.",
    from: 1800,
    to: 3500,
    unit: "projeto",
    deadline: "7 a 12 dias úteis",
    features: [
      "Página única focada em conversão",
      "Design exclusivo, responsivo e com tema claro/escuro",
      "Botão de WhatsApp e formulário de contato",
      "SEO técnico e carregamento rápido (Next.js)",
      "Google Analytics e pixel de anúncios",
      "Publicação com o seu domínio",
    ],
    idealFor: "Campanhas, lançamentos e autônomos",
  },
  {
    id: "site-institucional",
    category: "sites",
    name: "Site Institucional",
    pitch: "O site completo da sua empresa, com as páginas certas para vender e passar confiança.",
    from: 3500,
    to: 7000,
    unit: "projeto",
    deadline: "15 a 25 dias úteis",
    features: [
      "Até 6 páginas (início, sobre, serviços, contato...)",
      "Design sob medida para a sua marca",
      "SEO on-page em todas as páginas",
      "Google Meu Negócio e mapa integrados",
      "Formulários e WhatsApp em todas as páginas",
      "Treinamento para atualizar os conteúdos",
    ],
    idealFor: "Empresas, clínicas, escritórios e prestadores de serviço",
    popular: true,
  },
  {
    id: "site-premium",
    category: "sites",
    name: "Site Premium com Painel",
    pitch: "Uma experiência de marca marcante, com painel para editar tudo e blog para atrair clientes.",
    from: 7500,
    to: 15000,
    unit: "projeto",
    deadline: "25 a 40 dias úteis",
    features: [
      "Páginas ilimitadas e painel para editar tudo",
      "Blog completo com categorias e busca",
      "Animações e acabamento premium",
      "Agendamento online ou área de membros",
      "Multi-idioma (opcional)",
      "Relatório de performance e SEO",
    ],
    idealFor: "Marcas que querem se destacar e gerar leads todo dia",
  },

  // ---- Lojas virtuais ------------------------------------------------------
  {
    id: "catalogo-whatsapp",
    category: "lojas",
    name: "Catálogo Digital + WhatsApp",
    pitch: "Sua vitrine online: o cliente escolhe os produtos e o pedido chega pronto no seu WhatsApp.",
    from: 1500,
    to: 3000,
    unit: "projeto",
    deadline: "7 a 10 dias úteis",
    features: [
      "Vitrine com fotos, preços e categorias",
      "Pedido enviado direto para o seu WhatsApp",
      "Painel simples para editar produtos e preços",
      "Link pronto para Instagram e redes sociais",
    ],
    idealFor: "Restaurantes, revendedores e pequenos negócios",
  },
  {
    id: "loja-plataforma",
    category: "lojas",
    name: "Loja em Plataforma",
    pitch: "Loja completa na Nuvemshop ou Shopify, personalizada e pronta para vender.",
    from: 2500,
    to: 5000,
    unit: "projeto",
    deadline: "10 a 20 dias úteis",
    features: [
      "Configuração completa da plataforma",
      "Tema personalizado com a sua identidade",
      "Cadastro de até 50 produtos",
      "Pagamentos (Pix, cartão, boleto) e frete",
      "Domínio, e-mail e Google Shopping",
      "Treinamento para operar a loja",
    ],
    idealFor: "Quem quer começar a vender online rápido",
    popular: true,
  },
  {
    id: "loja-sob-medida",
    category: "lojas",
    name: "Loja Virtual sob Medida",
    pitch: "Loja própria, sem mensalidade de plataforma e sem limites para crescer.",
    from: 12000,
    to: 30000,
    unit: "projeto",
    deadline: "6 a 10 semanas",
    features: [
      "Loja em Next.js, rápida e otimizada para o Google",
      "Carrinho, checkout e pagamentos (Mercado Pago/Stripe)",
      "Painel de produtos, pedidos, estoque e clientes",
      "Cupons, frete calculado e e-mails automáticos",
      "Integração com ERP ou planilhas (sob escopo)",
    ],
    idealFor: "Lojas que já vendem e querem escalar",
  },

  // ---- Sistemas web --------------------------------------------------------
  {
    id: "sistema-essencial",
    category: "sistemas",
    name: "Sistema Essencial (MVP)",
    pitch: "O primeiro sistema da sua empresa: organizado, seguro e acessível de qualquer lugar.",
    from: 9000,
    to: 20000,
    unit: "projeto",
    deadline: "4 a 8 semanas",
    features: [
      "Login seguro com níveis de acesso",
      "Até 5 módulos (cadastros, agenda, financeiro...)",
      "Painel com indicadores e relatórios",
      "Funciona no computador e no celular",
      "Banco de dados na nuvem com backup",
    ],
    idealFor: "Tirar a operação das planilhas e do papel",
  },
  {
    id: "sistema-profissional",
    category: "sistemas",
    name: "Sistema Profissional",
    pitch: "CRM, ERP leve, agendamentos ou painel de gestão — feito para o seu processo, não o contrário.",
    from: 20000,
    to: 45000,
    unit: "projeto",
    deadline: "8 a 14 semanas",
    features: [
      "Módulos sob medida para o seu processo",
      "Integrações (pagamentos, WhatsApp, e-mail, APIs)",
      "Permissões por equipe e histórico de ações",
      "Painel administrativo completo",
      "Documentação e treinamento da equipe",
    ],
    idealFor: "Empresas que precisam de um sistema do seu jeito",
    popular: true,
  },
  {
    id: "plataforma-saas",
    category: "sistemas",
    name: "Plataforma / SaaS",
    pitch: "Um produto digital completo para vender por assinatura — como o CodeGuilds, que criei do zero.",
    from: 45000,
    unit: "projeto",
    deadline: "A partir de 14 semanas",
    features: [
      "Multiusuário, planos e cobrança recorrente",
      "Arquitetura escalável (Next.js, Node, PostgreSQL)",
      "Gamificação, área do aluno ou marketplace",
      "Painéis para clientes, equipe e administração",
      "Acompanhamento do lançamento",
    ],
    idealFor: "Startups, escolas e empreendedores digitais",
  },

  // ---- APIs, apps & automações ---------------------------------------------
  {
    id: "automacao",
    category: "apis",
    name: "Automação & Robôs",
    pitch: "Scripts que fazem sozinhos o trabalho repetitivo que hoje toma horas da sua equipe.",
    from: 1500,
    to: 6000,
    unit: "projeto",
    deadline: "1 a 3 semanas",
    features: [
      "Scripts em Python ou Node.js",
      "Relatórios e e-mails automáticos",
      "Coleta e tratamento de dados (web e planilhas)",
      "Rotinas agendadas na nuvem",
    ],
    idealFor: "Tarefas repetitivas e copia-e-cola",
  },
  {
    id: "integracao",
    category: "apis",
    name: "Integração entre Sistemas",
    pitch: "Conecte loja, ERP, CRM, planilhas e WhatsApp para os dados andarem sozinhos.",
    from: 2500,
    to: 8000,
    unit: "integração",
    deadline: "1 a 3 semanas",
    features: [
      "Gateways de pagamento e emissores de nota (via API)",
      "Sincronização automática de dados",
      "Webhooks, filas e reprocessamento",
      "Logs e alertas de falha",
    ],
    idealFor: "Acabar com o retrabalho entre sistemas",
    popular: true,
  },
  {
    id: "api-backend",
    category: "apis",
    name: "API REST / Back-end",
    pitch: "O back-end do seu app ou site: seguro, documentado e pronto para crescer.",
    from: 6000,
    to: 18000,
    unit: "projeto",
    deadline: "3 a 6 semanas",
    features: [
      "API em Node.js + TypeScript documentada",
      "Banco SQL modelado (MySQL ou PostgreSQL)",
      "Autenticação, permissões e validação",
      "Testes automatizados, Docker e deploy",
    ],
    idealFor: "Apps e sistemas que precisam de um back-end próprio",
  },
  {
    id: "app-pwa",
    category: "apis",
    name: "Aplicativo Web (PWA)",
    pitch: "Um app instalável no celular, sem pagar dois apps nativos nem depender das lojas.",
    from: 8000,
    to: 22000,
    unit: "projeto",
    deadline: "5 a 10 semanas",
    features: [
      "Instala no Android, iPhone e computador",
      "Funciona offline e envia notificações",
      "Login, painel e integração com a sua API",
      "Atualiza na hora, sem aprovação de loja",
    ],
    idealFor: "Ter um app com custo de site",
  },

  // ---- Ciência de dados ----------------------------------------------------
  {
    id: "diagnostico-dados",
    category: "dados",
    name: "Diagnóstico de Dados",
    pitch: "Descubra o que os seus dados já dizem: organização, análise e um relatório claro.",
    from: 1200,
    to: 2500,
    unit: "projeto",
    deadline: "5 a 7 dias úteis",
    features: [
      "Limpeza e organização de planilhas e bases",
      "Análise exploratória com Python (Pandas)",
      "Relatório com os principais insights",
      "Reunião de apresentação dos resultados",
    ],
    idealFor: "Primeiro passo para decidir com dados",
  },
  {
    id: "dashboard",
    category: "dados",
    name: "Dashboard de Indicadores",
    pitch: "Um painel interativo com os números que importam, atualizado sozinho.",
    from: 3500,
    to: 9000,
    unit: "projeto",
    deadline: "2 a 4 semanas",
    features: [
      "Painel com os KPIs do seu negócio",
      "Conexão com planilhas, bancos ou sistemas",
      "Atualização automática dos dados",
      "Acesso pelo navegador e pelo celular",
    ],
    idealFor: "Gestores que querem acompanhar tudo em tempo real",
    popular: true,
  },
  {
    id: "engenharia-dados",
    category: "dados",
    name: "Engenharia de Dados & ETL",
    pitch: "Junte dados espalhados em vários lugares num banco organizado e confiável.",
    from: 5000,
    to: 15000,
    unit: "projeto",
    deadline: "3 a 6 semanas",
    features: [
      "Modelagem de banco de dados",
      "Pipelines de ETL com Python e SQL",
      "Integração de várias fontes de dados",
      "Agendamento, Docker e monitoramento",
    ],
    idealFor: "Empresas com dados em vários sistemas",
  },

  // ---- Consultoria ---------------------------------------------------------
  {
    id: "diagnostico-gratuito",
    category: "consultoria",
    name: "Diagnóstico Gratuito",
    pitch: "30 minutos para entender a sua ideia e indicar o melhor caminho — sem compromisso.",
    from: 0,
    unit: "sessão",
    deadline: "Online, pelo Google Meet",
    features: [
      "Conversa sobre a sua ideia ou problema",
      "Indicação do melhor caminho técnico",
      "Estimativa inicial de prazo e investimento",
      "Sem compromisso de contratação",
    ],
    idealFor: "O primeiro passo de qualquer projeto",
    booking: true,
  },
  {
    id: "consultoria-avulsa",
    category: "consultoria",
    name: "Consultoria Avulsa",
    pitch: "Uma hora com um especialista para destravar uma decisão técnica importante.",
    from: 250,
    unit: "hora",
    deadline: "Online ou presencial em Recife",
    features: [
      "Arquitetura, stack e boas práticas",
      "Revisão de código e de projeto",
      "Solução de problemas técnicos",
      "Resumo por escrito com os próximos passos",
    ],
    idealFor: "Decisões técnicas pontuais",
    booking: true,
  },
  {
    id: "diagnostico-tecnico",
    category: "consultoria",
    name: "Diagnóstico Técnico Completo",
    pitch: "Antes de investir alto: uma análise completa com riscos, custos e o plano de ação.",
    from: 2500,
    to: 6000,
    unit: "pacote",
    deadline: "1 a 2 semanas",
    features: [
      "Análise do sistema, do código ou da ideia",
      "Relatório com riscos e oportunidades",
      "Roadmap com estimativa de custos e prazos",
      "Recomendação de stack e de fornecedores",
    ],
    idealFor: "Quem vai contratar ou refazer um sistema",
    popular: true,
  },
  {
    id: "cto-sob-demanda",
    category: "consultoria",
    name: "CTO sob Demanda",
    pitch: "Um responsável técnico para a sua empresa, sem o custo de contratar um.",
    from: 1800,
    unit: "mês",
    deadline: "Contrato mensal",
    features: [
      "4 encontros por mês com o seu time",
      "Suporte técnico pelo WhatsApp",
      "Acompanhamento de fornecedores e entregas",
      "Revisão de propostas e contratos de TI",
    ],
    idealFor: "Empresas sem um responsável de tecnologia",
  },

  // ---- Aulas & mentoria ----------------------------------------------------
  {
    id: "aula-particular",
    category: "aulas",
    name: "Aula Particular",
    pitch: "Aprenda no seu ritmo, com um professor só para você.",
    from: 90,
    unit: "hora",
    deadline: "Online ou presencial em Recife",
    features: [
      "Lógica, JavaScript, Python, HTML/CSS e mais",
      "Conteúdo adaptado ao seu objetivo",
      "Exercícios e projetos práticos",
      "Aula experimental de 30 min grátis",
    ],
    idealFor: "Iniciantes, estudantes e reforço escolar",
    booking: true,
  },
  {
    id: "pacote-aulas",
    category: "aulas",
    name: "Pacote Mensal — 8 aulas",
    pitch: "Duas aulas por semana com plano de estudos: o jeito mais rápido de aprender de verdade.",
    from: 640,
    unit: "mês",
    deadline: "2 aulas por semana",
    features: [
      "Plano de estudos personalizado",
      "R$ 80 por aula (11% de desconto)",
      "Missões gamificadas no CodeGuilds",
      "Dúvidas pelo WhatsApp entre as aulas",
    ],
    idealFor: "Quem quer constância e resultado",
    popular: true,
    booking: true,
  },
  {
    id: "mentoria-carreira",
    category: "aulas",
    name: "Mentoria de Carreira Dev",
    pitch: "Um plano para conseguir o primeiro emprego ou os primeiros clientes em tecnologia.",
    from: 600,
    unit: "pacote",
    deadline: "4 encontros",
    features: [
      "Plano de estudos e de carreira",
      "Revisão de portfólio, GitHub e LinkedIn",
      "Simulação de entrevista técnica",
      "Projeto prático para o portfólio",
    ],
    idealFor: "Quem está entrando na área de tecnologia",
    booking: true,
  },
  {
    id: "turmas-empresas",
    category: "aulas",
    name: "Turmas, Escolas & Empresas",
    pitch: "Workshops e cursos de programação para turmas, escolas e equipes de empresas.",
    from: 1500,
    unit: "workshop",
    deadline: "Sob agendamento",
    features: [
      "Workshops de 4 horas a cursos completos",
      "Programação, apps, jogos 2D/3D e IA",
      "Turmas gamificadas com o CodeGuilds",
      "Certificado de participação",
    ],
    idealFor: "Escolas, cursos livres e times de empresas",
  },
];

// ---------------------------------------------------------------------------
// Planos de manutenção (receita recorrente: o cliente fica, o site não para)
// ---------------------------------------------------------------------------

export interface Plan {
  id: string;
  name: string;
  monthly: number;
  pitch: string;
  features: string[];
  popular?: boolean;
}

/** No anual, o cliente paga 10 meses e leva 12. */
export const ANNUAL_MONTHS_PAID = 10;

export const PLANS: Plan[] = [
  {
    id: "essencial",
    name: "Essencial",
    monthly: 149,
    pitch: "Seu site no ar, seguro e atualizado.",
    features: ["Hospedagem e domínio gerenciados", "Backups e monitoramento 24/7", "Atualizações de segurança", "1 hora de ajustes por mês"],
  },
  {
    id: "profissional",
    name: "Profissional",
    monthly: 349,
    pitch: "Para quem quer o site sempre evoluindo.",
    features: [
      "Tudo do Essencial",
      "3 horas de ajustes ou melhorias por mês",
      "Relatório mensal de acessos",
      "SEO contínuo",
      "Suporte prioritário no WhatsApp",
    ],
    popular: true,
  },
  {
    id: "empresarial",
    name: "Empresarial",
    monthly: 890,
    pitch: "Para sistemas web e lojas que não podem parar.",
    features: [
      "Tudo do Profissional",
      "8 horas de desenvolvimento por mês",
      "Para sistemas web, lojas e APIs",
      "Resposta em até 24 horas úteis",
      "Reunião mensal de evolução",
    ],
  },
];

// ---------------------------------------------------------------------------
// Extras (somam no orçamento estimado)
// ---------------------------------------------------------------------------

export interface AddOn {
  id: string;
  name: string;
  /** Valor fixo em reais; ou `percent` sobre o projeto. */
  price?: number;
  percent?: number;
  note?: string;
}

export const ADDONS: AddOn[] = [
  { id: "pagina-extra", name: "Página extra", price: 350 },
  { id: "blog", name: "Blog com painel de conteúdo", price: 1200 },
  { id: "textos", name: "Textos otimizados para o Google", price: 150, note: "por página" },
  { id: "agendamento", name: "Agendamento online", price: 900 },
  { id: "integracao-whatsapp", name: "Integração com WhatsApp, CRM ou e-mail marketing", price: 500 },
  { id: "migracao", name: "Migração do site ou sistema antigo", price: 600 },
  { id: "google", name: "Google Meu Negócio + Analytics configurados", price: 300 },
  { id: "multi-idioma", name: "Versão em outro idioma", percent: 30 },
  { id: "expresso", name: "Prazo expresso (prioridade na agenda)", percent: 30 },
];

// ---------------------------------------------------------------------------
// Pagamento e garantias
// ---------------------------------------------------------------------------

export const PAYMENT_TERMS = [
  { icon: "⚡", title: "Pix à vista", text: "5% de desconto no pagamento integral antecipado." },
  { icon: "🤝", title: "50% + 50%", text: "Metade para começar e metade na entrega (projetos até R$ 5 mil)." },
  { icon: "🧩", title: "Por etapas", text: "Acima de R$ 5 mil: 40% na entrada, 30% no meio e 30% na entrega." },
  { icon: "💳", title: "Cartão em até 12x", text: "Pelo link de pagamento, com as taxas da operadora." },
];

export const GUARANTEES = [
  "Proposta por escrito com escopo, prazo e preço",
  "Entregas por etapas, com a sua aprovação",
  "30 dias de suporte grátis após a entrega",
  "Código, domínio e contas no seu nome",
];

// ---------------------------------------------------------------------------
// Agenda (consultorias)
// ---------------------------------------------------------------------------

export const SCHEDULE = {
  /** Quantos dias úteis à frente aparecem no calendário. */
  days: 12,
  /** Começa a mostrar a partir de N dias úteis (tempo pra confirmar). */
  startIn: 1,
  slots: ["09:00", "10:30", "14:00", "15:30", "17:00", "19:00"],
  formats: ["Online (Google Meet)", "Presencial em Recife"],
};

// ---------------------------------------------------------------------------
// Regras
// ---------------------------------------------------------------------------

/** Um plano de manutenção visto como item do catálogo (pra entrar no pedido de orçamento). */
export function planAsItem(plan: Plan): CatalogItem {
  return {
    id: `plano-${plan.id}`,
    category: "sites",
    name: `Plano de Manutenção ${plan.name}`,
    pitch: plan.pitch,
    from: plan.monthly,
    unit: "mês",
    deadline: "Contrato mensal",
    features: plan.features,
    idealFor: "Manter o site seguro e evoluindo",
  };
}

export const PLAN_ITEMS: CatalogItem[] = PLANS.map(planAsItem);

export function getCategory(id: CategoryId): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

/** O serviço pode ser pedido/agendado agora (a categoria dele não está fora de venda). */
export function isAvailable(item: CatalogItem): boolean {
  return !getCategory(item.category)?.unavailable;
}

/** Os serviços à venda agora (os indisponíveis aparecem no catálogo, mas não entram nos formulários). */
export const AVAILABLE_ITEMS: CatalogItem[] = CATALOG.filter(isAvailable);

export function getItem(id: string | null | undefined): CatalogItem | undefined {
  return CATALOG.find((i) => i.id === id) ?? PLAN_ITEMS.find((i) => i.id === id);
}

export function itemsOf(category: CategoryId): CatalogItem[] {
  return CATALOG.filter((i) => i.category === category);
}

const BRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export function formatBRL(value: number): string {
  return BRL.format(value).replace(/ /g, " ");
}

const UNIT_LABEL: Record<Unit, string> = {
  projeto: "",
  hora: "/hora",
  mês: "/mês",
  pacote: "/pacote",
  integração: "/integração",
  workshop: "/workshop",
  sessão: "",
};

export function unitLabel(unit: Unit): string {
  return UNIT_LABEL[unit];
}

/** "a partir de R$ 3.500" / "Grátis" / "R$ 250/hora". */
export function priceLabel(item: CatalogItem): { prefix: string; value: string; suffix: string } {
  if (item.from === 0) return { prefix: "", value: "Grátis", suffix: "" };
  const fixed = !item.to && (item.unit === "hora" || item.unit === "mês" || item.unit === "pacote" || item.unit === "workshop");
  return { prefix: fixed ? "" : "a partir de", value: formatBRL(item.from), suffix: unitLabel(item.unit) };
}

/** Itens que entram no orçamento estimado com extras (projetos com faixa de preço). */
export function isEstimable(item: CatalogItem): boolean {
  return item.to !== undefined && !item.booking;
}

/**
 * O orçamento estimado: a faixa do serviço + os extras de valor fixo, e os
 * percentuais (idioma, prazo expresso) aplicados sobre o total.
 */
export function estimate(item: CatalogItem, addonIds: string[]): { min: number; max: number } {
  const addons = ADDONS.filter((a) => addonIds.includes(a.id));
  const fixed = addons.reduce((sum, a) => sum + (a.price ?? 0), 0);
  const factor = 1 + addons.reduce((sum, a) => sum + (a.percent ?? 0), 0) / 100;
  const max = item.to ?? item.from;
  const round = (n: number) => Math.round(n / 50) * 50;
  return { min: round((item.from + fixed) * factor), max: round((max + fixed) * factor) };
}

/** Os próximos dias úteis (seg a sex) para o calendário de agendamento. */
export function nextBusinessDays(from = new Date(), count = SCHEDULE.days, startIn = SCHEDULE.startIn): Date[] {
  const days: Date[] = [];
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  let skipped = 0;
  while (days.length < count) {
    d.setDate(d.getDate() + 1);
    const weekday = d.getDay();
    if (weekday === 0 || weekday === 6) continue;
    if (skipped < startIn - 1) {
      skipped++;
      continue;
    }
    days.push(new Date(d));
  }
  return days;
}

// ---------------------------------------------------------------------------
// Perguntas sobre preço e contratação (FAQ da página do catálogo)
// ---------------------------------------------------------------------------

export const CATALOG_FAQ = [
  {
    question: "Os preços do catálogo são fechados?",
    answer:
      "São valores de referência. Cada projeto tem uma faixa (a partir de… até…) e o preço final sai na proposta por escrito, depois de entender o escopo. Sem surpresas no meio do caminho: o que está na proposta é o que você paga.",
  },
  {
    question: "Por que o diagnóstico de 30 minutos é gratuito?",
    answer:
      "Porque o melhor projeto começa entendendo o problema. Na conversa eu indico o caminho mais econômico — às vezes é um site simples, às vezes uma automação — e você recebe uma estimativa de prazo e investimento, sem compromisso.",
  },
  {
    question: "Hospedagem e domínio estão inclusos?",
    answer:
      "A publicação está inclusa em todos os projetos. O domínio (cerca de R$ 40 por ano no .com.br) e a hospedagem ficam no seu nome; para não se preocupar com nada, os planos de manutenção já cuidam de tudo.",
  },
  {
    question: "E se eu precisar de mudanças depois da entrega?",
    answer:
      "Todo projeto tem 30 dias de suporte grátis para correções. Depois disso, você pode contratar um plano de manutenção mensal com horas de ajustes inclusas ou pedir melhorias avulsas.",
  },
  {
    question: "Como funciona o pagamento?",
    answer:
      "Pix à vista com 5% de desconto, 50% na entrada e 50% na entrega (projetos até R$ 5 mil) ou por etapas (40/30/30) nos maiores. Também aceito cartão em até 12x pelo link de pagamento.",
  },
  {
    question: "Você atende só em Recife?",
    answer:
      "Atendo o Brasil inteiro, online. Para clientes de Recife e região, as reuniões também podem ser presenciais.",
  },
];
