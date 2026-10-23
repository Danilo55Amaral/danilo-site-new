import { NextResponse } from "next/server";
import { ContactRequest, newProtocol, requestText, requestTitle, summaryLines, validateRequest } from "@/engine/requests";

// ============================================================================
// POST /api/contato — recebe o pedido de orçamento ou de agendamento da página
// /catalogo e manda por e-mail pro Danilo, pelo Resend (resend.com, sem
// dependência: é um fetch na API deles). O "responder" do e-mail já vai pro
// cliente.
//
// Variáveis de ambiente (Vercel → Settings → Environment Variables):
//   RESEND_API_KEY      a chave da conta no Resend
//   CONTACT_TO_EMAIL    o e-mail que recebe os pedidos
//   CONTACT_FROM_EMAIL  (opcional) remetente com domínio verificado no Resend;
//                       sem ele, sai de onboarding@resend.dev
// Sem RESEND_API_KEY/CONTACT_TO_EMAIL a rota responde 503 e o formulário
// manda o pedido pelo WhatsApp.
// ============================================================================

const DEFAULT_FROM = "Site Danilo Amaral <onboarding@resend.dev>";

// Limite simples por IP (por instância): 5 pedidos a cada 10 minutos
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function tooMany(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

function emailHtml(r: ContactRequest, protocol: string): string {
  const rows = summaryLines(r)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:10px 14px;color:#64748b;font-size:13px;white-space:nowrap;vertical-align:top">${escapeHtml(k)}</td>` +
        `<td style="padding:10px 14px;color:#0f172a;font-size:14px;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
    )
    .join("");
  const phone = r.phone.replace(/\D/g, "");
  const wa = `https://wa.me/${phone.length <= 11 ? `55${phone}` : phone}`;
  return `<div style="font-family:Arial,Helvetica,sans-serif;background:#f6f7fb;padding:24px">
  <div style="max-width:620px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0">
    <div style="background:linear-gradient(90deg,#7c3aed,#c026d3);padding:20px 24px;color:#fff">
      <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;opacity:.85">${r.kind === "orcamento" ? "Novo orçamento" : "Novo agendamento"} · ${protocol}</div>
      <div style="font-size:20px;font-weight:bold;margin-top:4px">${escapeHtml(requestTitle(r))}</div>
    </div>
    <table style="width:100%;border-collapse:collapse">${rows}</table>
    <div style="padding:20px 24px;border-top:1px solid #e2e8f0">
      <a href="${wa}" style="display:inline-block;background:#25d366;color:#fff;text-decoration:none;padding:12px 20px;border-radius:999px;font-weight:bold;font-size:14px">Responder no WhatsApp</a>
    </div>
  </div>
</div>`;
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    return NextResponse.json({ message: "O envio por e-mail ainda não está configurado." }, { status: 503 });
  }

  let body: Partial<ContactRequest> & { website?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Pedido inválido." }, { status: 400 });
  }

  // Campo invisível: gente não preenche, robô preenche. Finge que deu certo.
  if (body.website) return NextResponse.json({ ok: true, protocol: newProtocol() });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (tooMany(ip)) {
    return NextResponse.json({ message: "Muitos pedidos seguidos. Espere alguns minutos ou fale pelo WhatsApp." }, { status: 429 });
  }

  const error = validateRequest(body);
  if (error) return NextResponse.json({ message: error }, { status: 400 });

  const request = body as ContactRequest;
  const protocol = newProtocol();
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM,
      to: [to],
      reply_to: request.email.trim(),
      subject: `${request.kind === "orcamento" ? "💼" : "📅"} ${requestTitle(request)} · ${request.name.trim()} (${protocol})`,
      html: emailHtml(request, protocol),
      text: `${requestText(request).replace(/\*/g, "")}\n\nProtocolo: ${protocol}`,
    }),
  });

  if (!res.ok) {
    console.error("Resend falhou", res.status, await res.text().catch(() => ""));
    return NextResponse.json({ message: "Não consegui enviar agora." }, { status: 502 });
  }

  return NextResponse.json({ ok: true, protocol });
}
