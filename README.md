# Danilo Amaral — site pessoal

Site de apresentação e venda de serviços do Danilo Amaral: Engenheiro de Software, Cientista de Dados, Professor de Programação e fundador do CodeGuilds.

Mesma base do CodeGuilds: Next.js 14.2.5 (App Router), React 18, TypeScript, Tailwind CSS 3 e Node.js 20.9+.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000. Para o build de produção: `npm run build` e `npm start`.

## Páginas

- `/` — a home (`src/app/page.tsx`), na ordem de uma conversa de venda (seções abaixo)
- `/catalogo` — o catálogo de serviços com preços, planos de manutenção, extras, formas de pagamento e o painel de pedido (orçamento ou agendamento)
- `POST /api/contato` — recebe os pedidos do catálogo e manda por e-mail (ver "Pedidos por e-mail")

## Seções da home

0. **Topo** — chamada de venda, cargos sendo digitados, foto com moldura animada e os números
1. **Faixa de tecnologias** — rolando sem parar
2. **Serviços** — seis cartões (sites, sistemas, APIs, dados, aulas, consultoria) e o "Como trabalho"
3. **CodeGuilds** — a vitrine do projeto (sempre escura, no clima roxo e dourado do jogo): tela inicial real, brasões das casas, números, recursos e o papel de fundador
4. **Sobre** — história e linha do tempo da carreira
5. **Projetos** — destaque do SPE e a grade com filtro por trilha
6. **Habilidades** — as 27 tecnologias por área
7. **Ensino** — o Danilo professor (Passaporte Edu) e os formatos de aula
8. **Formação & Recomendações** — diplomas (abrem em tela cheia) e as recomendações do LinkedIn
9. **FAQ** e **Contato** — o formulário vira uma mensagem no WhatsApp

## Estrutura

```
src/
  engine/          -> dados e regras (sem JSX)
    profile.ts     -> nome, cargos, redes, números do topo e o menu
    services.ts    -> os serviços vendidos e os passos do "Como trabalho"
    codeguilds.ts  -> casas, números, recursos e stack do CodeGuilds
    projects.ts    -> portfólio (destaque + grade com trilhas)
    skills.ts      -> as 27 tecnologias e os ícones (Devicon / Simple Icons)
    about.ts       -> linha do tempo, diplomas, recomendações, aulas e FAQ
    contact.ts     -> mensagem do formulário e link do WhatsApp
    catalog.ts     -> catálogo: serviços com preço e prazo, planos, extras, pagamento, agenda e a estimativa
    requests.ts    -> pedidos de orçamento/agendamento: validação, resumo e texto (mesmas regras no site e na API)
    theme.ts       -> tema escuro/claro salvo no navegador (classe `light` no <html>)
    store.ts       -> hooks: tema, rolagem, seção ativa, elemento visível, serviço escolhido no catálogo
  services/api.ts  -> cliente HTTP das rotas de app/api
  components/      -> uma seção por arquivo (Hero, Services, CodeGuildsShowcase...) e as peças (Reveal, Spotlight, CountUp, Icons...)
    catalog/       -> cartões, barra de categorias, planos, painel de pedido e os formulários do catálogo
  app/             -> layout (cabeçalho, rodapé, fontes, SEO, JSON-LD), páginas, api/contato e globals.css
public/img/        -> foto, prints dos projetos, diplomas e brasões do CodeGuilds
```

## Tema claro e escuro

Igual ao CodeGuilds: cada cor do Tailwind lê uma variável CSS (`tailwind.config.ts`). Sem a classe `light` vale o escuro; com ela, só as variáveis mudam. Quem nunca escolheu segue o tema do sistema operacional. `.da-dark-scope` mantém um trecho sempre escuro (a seção do CodeGuilds e a janela de código do topo).

## Pedidos por e-mail (Resend)

Os pedidos do catálogo chegam por e-mail pelo [Resend](https://resend.com) (plano grátis: 3.000 e-mails/mês). Na Vercel, em **Settings → Environment Variables**:

| Variável | Valor |
|---|---|
| `RESEND_API_KEY` | a chave criada em resend.com → API Keys |
| `CONTACT_TO_EMAIL` | o e-mail que recebe os pedidos (o mesmo da conta no Resend, enquanto não houver domínio verificado) |
| `CONTACT_FROM_EMAIL` | opcional: remetente com domínio verificado no Resend (ex.: `Site <contato@seudominio.com.br>`) |

Depois de salvar, faça um novo deploy. Sem essas variáveis, o formulário continua funcionando: o pedido vai pelo WhatsApp, já escrito.

## Para editar

- **Textos e números**: quase tudo está em `src/engine/` — não precisa mexer nos componentes.
- **WhatsApp com mensagem pronta**: preencha `WHATSAPP_PHONE` em `src/engine/contact.ts` (só números, com DDI e DDD). Vazio, o formulário copia a mensagem e abre o link curto do perfil.
- **Novo projeto**: adicione em `PROJECTS` (`src/engine/projects.ts`) e a imagem em `public/img/projetos/`.
- **Preços, prazos e pacotes**: `CATALOG`, `PLANS`, `ADDONS` e `PAYMENT_TERMS` em `src/engine/catalog.ts` (o comentário do topo explica a lógica dos preços). O site inteiro, a estimativa e o e-mail acompanham.
- **Horários da agenda**: `SCHEDULE` em `src/engine/catalog.ts`.
- **Pausar uma categoria** (como as aulas hoje): `unavailable` na categoria em `CATEGORIES` (`src/engine/catalog.ts`) e no serviço em `SERVICES` (`src/engine/services.ts`). Os cartões aparecem com o aviso, sem pedido nem agendamento, e a API recusa esses serviços. Para reabrir, apague a linha `unavailable`.

© Danilo Amaral
