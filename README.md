# Danilo Amaral — site pessoal

Site de apresentação e venda de serviços do Danilo Amaral: Engenheiro de Software, Cientista de Dados, Professor de Programação e fundador do CodeGuilds.

Mesma base do CodeGuilds: Next.js 14.2.5 (App Router), React 18, TypeScript, Tailwind CSS 3 e Node.js 20.9+.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000. Para o build de produção: `npm run build` e `npm start`.

## Seções

Uma página só (`src/app/page.tsx`), na ordem de uma conversa de venda:

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
    theme.ts       -> tema escuro/claro salvo no navegador (classe `light` no <html>)
    store.ts       -> hooks: tema, rolagem, seção ativa, elemento visível, serviço escolhido
  components/      -> uma seção por arquivo (Hero, Services, CodeGuildsShowcase...) e as peças (Reveal, Spotlight, CountUp, Icons...)
  app/             -> layout (fontes, SEO, JSON-LD), página e globals.css
public/img/        -> foto, prints dos projetos, diplomas e brasões do CodeGuilds
```

## Tema claro e escuro

Igual ao CodeGuilds: cada cor do Tailwind lê uma variável CSS (`tailwind.config.ts`). Sem a classe `light` vale o escuro; com ela, só as variáveis mudam. Quem nunca escolheu segue o tema do sistema operacional. `.da-dark-scope` mantém um trecho sempre escuro (a seção do CodeGuilds e a janela de código do topo).

## Para editar

- **Textos e números**: quase tudo está em `src/engine/` — não precisa mexer nos componentes.
- **WhatsApp com mensagem pronta**: preencha `WHATSAPP_PHONE` em `src/engine/contact.ts` (só números, com DDI e DDD). Vazio, o formulário copia a mensagem e abre o link curto do perfil.
- **Novo projeto**: adicione em `PROJECTS` (`src/engine/projects.ts`) e a imagem em `public/img/projetos/`.

© Danilo Amaral
