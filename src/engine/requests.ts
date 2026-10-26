// ============================================================================
// PEDIDOS — o que o visitante manda pela página /catalogo: um pedido de
// orçamento (serviço, detalhes, prazo) ou um pedido de agendamento (consultoria,
// dia e horário). As mesmas regras valem no formulário e na API
// (app/api/contato/route.ts): validação, resumo em texto e o e-mail que chega
// pro Danilo.
// ============================================================================

import { ADDONS, estimate, formatBRL, getItem, isAvailable, isDayAvailable, isEstimable, isFormatAvailable, parseIsoDate } from "./catalog";

export const DEADLINES = [
  { id: "sem-pressa", label: "Sem pressa" },
  { id: "30-dias", label: "Em até 30 dias" },
  { id: "15-dias", label: "Em até 15 dias" },
  { id: "urgente", label: "Urgente (até 7 dias)" },
  { id: "data", label: "Tenho uma data específica" },
] as const;

export const BUDGETS = [
  "Até R$ 2 mil",
  "R$ 2 mil a R$ 5 mil",
  "R$ 5 mil a R$ 15 mil",
  "R$ 15 mil a R$ 40 mil",
  "Acima de R$ 40 mil",
  "Ainda não sei",
] as const;

interface Contact {
  name: string;
  email: string;
  phone: string;
  company?: string;
}

export interface OrderRequest extends Contact {
  kind: "orcamento";
  itemId: string;
  addons: string[];
  details: string;
  deadline: string;
  /** Só com deadline "data" (AAAA-MM-DD). */
  deadlineDate?: string;
  budget: string;
}

export interface BookingRequest extends Contact {
  kind: "agendamento";
  itemId: string;
  format: string;
  /** AAAA-MM-DD */
  date: string;
  time: string;
  topic: string;
}

export type ContactRequest = OrderRequest | BookingRequest;

const MAX = { name: 80, email: 120, phone: 30, company: 80, details: 3000, topic: 1000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// O que chega da internet: qualquer campo pode faltar (e o tipo ainda não foi conferido)
type UncheckedRequest = Partial<Omit<OrderRequest, "kind">> & Partial<Omit<BookingRequest, "kind">> & { kind?: string };

/** Confere o pedido e devolve a primeira mensagem de erro (ou null se estiver tudo certo). */
export function validateRequest(r: UncheckedRequest): string | null {
  if (r.kind !== "orcamento" && r.kind !== "agendamento") return "Tipo de pedido inválido.";
  if (!r.name || r.name.trim().length < 2) return "Informe o seu nome.";
  if (!r.email || !EMAIL_RE.test(r.email.trim())) return "Informe um e-mail válido.";
  const digits = (r.phone ?? "").replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 13) return "Informe um WhatsApp com DDD.";
  if (r.name.length > MAX.name || r.email.length > MAX.email || (r.company?.length ?? 0) > MAX.company) return "Algum campo ficou grande demais.";
  const item = getItem(r.itemId);
  if (!item) return "Escolha um serviço do catálogo.";
  if (!isAvailable(item)) return "Este serviço está indisponível no momento.";

  if (r.kind === "orcamento") {
    if (!r.details || r.details.trim().length < 10) return "Conte um pouco mais sobre o projeto (pelo menos 10 caracteres).";
    if (r.details.length > MAX.details) return "Os detalhes passaram de 3.000 caracteres.";
    if (!r.deadline) return "Escolha o prazo de entrega.";
    if (r.deadline === "data" && !/^\d{4}-\d{2}-\d{2}$/.test(r.deadlineDate ?? "")) return "Escolha a data de entrega.";
    if (!r.budget) return "Escolha uma faixa de investimento.";
  } else {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(r.date ?? "")) return "Escolha o dia.";
    if (!r.time) return "Escolha o horário.";
    if (!isDayAvailable(parseIsoDate(r.date!))) return "Esse dia está indisponível no momento. Escolha outro dia.";
    if (!r.format) return "Escolha o formato do atendimento.";
    if (!isFormatAvailable(r.format)) return "Esse formato está indisponível no momento.";
    if ((r.topic?.length ?? 0) > MAX.topic) return "O assunto passou de 1.000 caracteres.";
  }
  return null;
}

/** "2026-10-27" -> "terça-feira, 27 de outubro de 2026" */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

/** As linhas do resumo (rótulo, valor), na ordem do e-mail e da mensagem de WhatsApp. */
export function summaryLines(r: ContactRequest): [string, string][] {
  const item = getItem(r.itemId);
  const lines: [string, string][] = [
    ["Nome", r.name],
    ["E-mail", r.email],
    ["WhatsApp", r.phone],
  ];
  if (r.company) lines.push(["Empresa", r.company]);
  lines.push(["Serviço", item?.name ?? r.itemId]);

  if (r.kind === "orcamento") {
    const addons = ADDONS.filter((a) => r.addons.includes(a.id)).map((a) => a.name);
    if (addons.length) lines.push(["Extras", addons.join(", ")]);
    const deadline = DEADLINES.find((d) => d.id === r.deadline)?.label ?? r.deadline;
    lines.push(["Prazo", r.deadline === "data" && r.deadlineDate ? `Até ${formatDate(r.deadlineDate)}` : deadline]);
    lines.push(["Investimento", r.budget]);
    if (item && isEstimable(item)) {
      const { min, max } = estimate(item, r.addons);
      lines.push(["Estimativa do catálogo", `${formatBRL(min)} a ${formatBRL(max)}`]);
    }
    lines.push(["Detalhes", r.details]);
  } else {
    lines.push(["Formato", r.format]);
    lines.push(["Dia", formatDate(r.date)]);
    lines.push(["Horário", r.time]);
    if (r.topic) lines.push(["Assunto", r.topic]);
  }
  return lines;
}

export function requestTitle(r: ContactRequest): string {
  const item = getItem(r.itemId)?.name ?? "serviço";
  return r.kind === "orcamento" ? `Pedido de orçamento — ${item}` : `Pedido de agendamento — ${item}`;
}

/** O pedido em texto corrido (WhatsApp e versão texto do e-mail). */
export function requestText(r: ContactRequest): string {
  const lines = summaryLines(r).map(([k, v]) => `*${k}:* ${v}`);
  return [`Olá, Danilo! ${requestTitle(r)} pelo site.`, "", ...lines].join("\n");
}

/** Um código curto pro cliente citar na conversa (ex.: DA-L8K2QZ). */
export function newProtocol(now = Date.now()): string {
  return `DA-${now.toString(36).toUpperCase().slice(-6)}`;
}
