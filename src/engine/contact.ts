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

export const WHATSAPP_PHONE = "5581982151014";

export interface ContactForm {
  name: string;
  service: ServiceId | "outro";
  message: string;
}

export const SERVICE_OPTIONS: { id: ContactForm["service"]; label: string }[] = [
  ...SERVICES.filter((s) => !s.unavailable).map((s) => ({ id: s.id, label: s.title })),
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

/**
 * Copia o texto pra área de transferência e diz se deu certo. Tenta a API
 * moderna e, se o navegador bloquear (celular, navegador dentro de app, aba
 * sem foco), cai pro jeito antigo: um campo escondido + "copiar".
 */
export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // bloqueado: tenta o jeito antigo abaixo
  }
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  area.setSelectionRange(0, text.length);
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  area.remove();
  return ok;
}

/** O link que abre a conversa: com a mensagem escrita (se houver telefone) ou o link do perfil. */
export function whatsappUrl(message: string): string {
  return WHATSAPP_PHONE ? `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}` : LINKS.whatsapp;
}
