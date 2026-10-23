// ============================================================================
// CONTATO — monta a mensagem do formulário e o link do WhatsApp. O site não
// tem back end: o pedido vai direto pro WhatsApp do Danilo.
//
// Com WHATSAPP_PHONE preenchido (só números, com DDI e DDD: "5581999999999"),
// a mensagem já abre escrita na conversa. Vazio, abre o link curto do perfil
// (LINKS.whatsapp) e a mensagem vai copiada, pronta pra colar.
// ============================================================================

import { LINKS } from "./profile";
import { SERVICES, ServiceId } from "./services";

export const WHATSAPP_PHONE = "";

export interface ContactForm {
  name: string;
  service: ServiceId | "outro";
  message: string;
}

export const SERVICE_OPTIONS: { id: ContactForm["service"]; label: string }[] = [
  ...SERVICES.map((s) => ({ id: s.id, label: s.title })),
  { id: "outro", label: "Outro assunto" },
];

export function buildMessage(form: ContactForm): string {
  const service = SERVICE_OPTIONS.find((o) => o.id === form.service)?.label ?? "Outro assunto";
  return [
    `Olá, Danilo! Meu nome é ${form.name.trim()}.`,
    `Tenho interesse em: ${service}.`,
    "",
    form.message.trim(),
    "",
    "(Mensagem enviada pelo seu site)",
  ].join("\n");
}

/** O link que abre a conversa: com a mensagem escrita (se houver telefone) ou o link do perfil. */
export function whatsappUrl(message: string): string {
  return WHATSAPP_PHONE ? `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}` : LINKS.whatsapp;
}
