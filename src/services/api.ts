// ============================================================================
// API — o cliente HTTP do site pra falar com as rotas de app/api.
//
// Quando a rota responde com erro, as funções lançam um ApiError com a
// mensagem que ela mandou (já em português). Sem conexão, a mensagem explica.
// O status 503 quer dizer que o envio por e-mail ainda não foi configurado: o
// formulário cai pro WhatsApp.
// ============================================================================

import type { ContactRequest } from "@/engine/requests";

export class ApiError extends Error {
  /** Status HTTP da resposta; 0 = nem chegou no servidor (sem internet). */
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

const OFFLINE_MESSAGE = "Não foi possível falar com o servidor. Confira sua internet e tente de novo.";

/** Manda o pedido (orçamento ou agendamento) e devolve o protocolo. */
export async function sendContactRequest(request: ContactRequest & { website?: string }): Promise<{ protocol: string }> {
  let res: Response;
  try {
    res = await fetch("/api/contato", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });
  } catch {
    throw new ApiError(OFFLINE_MESSAGE, 0);
  }
  const body = (await res.json().catch(() => null)) as { message?: string; protocol?: string } | null;
  if (!res.ok) throw new ApiError(body?.message ?? `Erro ${res.status} no servidor.`, res.status);
  return { protocol: body?.protocol ?? "" };
}
