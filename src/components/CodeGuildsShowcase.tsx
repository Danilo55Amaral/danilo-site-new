import Image from "next/image";
import { Cinzel_Decorative } from "next/font/google";
import { GUILD_FEATURES, GUILD_HOUSES, GUILD_REPO, GUILD_STACK, GUILD_STATS } from "@/engine/codeguilds";
import { PROFILE } from "@/engine/profile";
import Reveal from "./Reveal";
import ServiceLink from "./ServiceLink";
import { ArrowUpRightIcon, CheckIcon, SocialIcon, SparkleIcon } from "./Icons";

// ============================================================================
// CODEGUILDS — a vitrine do projeto que o Danilo fundou e desenvolve. A seção
// é sempre escura (.da-dark-scope), no clima roxo e dourado do próprio jogo:
// a tela inicial de verdade numa janela de navegador inclinada, os brasões
// das quatro casas, os números, o que a plataforma faz e o papel do Danilo.
// ============================================================================

// A mesma fonte do logo na tela inicial do CodeGuilds
const decorative = Cinzel_Decorative({ subsets: ["latin"], weight: ["700", "900"], display: "swap" });

const ROLES = [
  "Idealização do produto e da experiência gamificada",
  "Front-end em Next.js, React e Tailwind",
  "API, banco de dados e regras do jogo no servidor",
  "Conteúdo pedagógico: missões e livros ilustrados",
];

/** Céu estrelado: pontinhos espalhados com dois degradês repetidos. */
function StarSky() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 20px 30px, #fff 50%, transparent 51%), radial-gradient(1px 1px at 120px 80px, #fde68a 50%, transparent 51%), radial-gradient(1.5px 1.5px at 200px 160px, #c4b5fd 50%, transparent 51%)",
          backgroundSize: "240px 200px",
        }}
      />
      <div className="absolute left-1/2 top-0 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-violet-700/30 blur-[140px]" />
      <div className="absolute -bottom-40 right-0 h-[30rem] w-[30rem] rounded-full bg-amber-500/15 blur-[140px]" />
      <div className="absolute -left-40 top-1/2 h-[26rem] w-[26rem] rounded-full bg-fuchsia-700/20 blur-[140px]" />
      {/* as luzes somem antes do fim da seção, sem corte seco */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-[#07060f]" />
    </div>
  );
}

function BrowserFrame() {
  return (
    <div className="group relative mx-auto max-w-5xl [perspective:1800px]">
      <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-r from-amber-500/30 via-violet-600/40 to-fuchsia-600/30 blur-3xl transition-opacity group-hover:opacity-80" />
      <div className="overflow-hidden rounded-3xl border border-amber-400/25 bg-[#0b0a14] shadow-2xl shadow-black/60 transition-transform duration-700 lg:[transform:rotateX(10deg)] lg:group-hover:[transform:rotateX(0deg)]">
        <div className="flex items-center gap-3 border-b border-white/5 bg-[#100e1c] px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-400/80" />
            <span className="h-3 w-3 rounded-full bg-amber-400/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
          </div>
          <div className="mx-auto flex max-w-sm flex-1 items-center justify-center gap-2 rounded-full bg-white/5 px-4 py-1 text-[11px] text-slate-400">
            <span className="text-emerald-400">●</span> codeguilds<span className="hidden sm:inline"> · A Academia dos Heróis do Conhecimento</span>
          </div>
        </div>
        <Image
          src="/img/codeguilds/tela-inicial.webp"
          alt="Tela inicial do CodeGuilds: o logo dourado, o botão Play, os heróis de um lado e os vilões do outro"
          width={1440}
          height={852}
          sizes="(min-width: 1024px) 1024px, 100vw"
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}

export default function CodeGuildsShowcase() {
  return (
    <section id="codeguilds" className="da-dark-scope relative isolate overflow-hidden bg-[#07060f] py-28 text-slate-300 sm:py-32">
      <StarSky />

      <div className="da-container">
        {/* título */}
        <Reveal className="flex flex-col items-center gap-5 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
            <SparkleIcon className="h-3.5 w-3.5" /> Projeto em destaque · Fundador & Desenvolvedor
          </span>
          <h2
            className={`${decorative.className} bg-gradient-to-b from-amber-100 via-amber-300 to-amber-600 bg-clip-text text-5xl font-black text-transparent drop-shadow-[0_4px_30px_rgba(251,191,36,0.25)] sm:text-7xl lg:text-8xl`}
          >
            CodeGuilds
          </h2>
          <p className="font-display text-lg font-semibold uppercase tracking-[0.25em] text-violet-300 sm:text-xl">
            A Academia dos Heróis do Conhecimento
          </p>
          <p className="max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            Idealizei, fundei e desenvolvo o CodeGuilds: uma plataforma educacional gamificada em que os alunos entram para uma das
            quatro casas, cumprem missões de todas as matérias, ganham XP, moedas e itens lendários — e aprendem jogando.
          </p>
        </Reveal>

        {/* a tela inicial de verdade */}
        <Reveal className="mt-16">
          <BrowserFrame />
        </Reveal>

        {/* as quatro casas */}
        <div className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {GUILD_HOUSES.map((house, i) => (
            <Reveal key={house.id} delay={i * 90}>
              <div className="group flex flex-col items-center gap-3 rounded-3xl border border-white/5 bg-white/[0.03] px-4 py-6 text-center transition-colors hover:border-white/15">
                <div className="da-animate-float relative h-24 w-24 sm:h-28 sm:w-28" style={{ animationDelay: `${-i * 1.4}s` }}>
                  <div
                    className="absolute inset-2 rounded-full blur-2xl transition-opacity group-hover:opacity-100"
                    style={{ background: `rgb(${house.glow} / 0.45)`, opacity: 0.7 }}
                  />
                  <Image src={house.crest} alt={`Brasão da Casa ${house.name}`} fill sizes="112px" className="relative object-contain" />
                </div>
                <div>
                  <p className="font-display text-lg font-bold text-white">Casa {house.name}</p>
                  <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: `rgb(${house.glow})` }}>
                    {house.virtue}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* números */}
        <Reveal className="mt-6">
          <dl className="grid grid-cols-2 divide-white/5 overflow-hidden rounded-3xl border border-white/5 bg-white/[0.03] sm:grid-cols-4 sm:divide-x">
            {GUILD_STATS.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1 px-4 py-6 text-center">
                <dd className="bg-gradient-to-b from-amber-200 to-amber-500 bg-clip-text font-display text-4xl font-bold text-transparent sm:text-5xl">{s.value}</dd>
                <dt className="text-sm text-slate-400">{s.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* o que a plataforma faz */}
        <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GUILD_FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 90}>
              <div className="flex h-full gap-4 rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-6 transition-colors hover:border-violet-400/30">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-500/15 text-2xl ring-1 ring-violet-400/20">{f.icon}</span>
                <div>
                  <h3 className="font-display text-base font-bold text-white">{f.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">{f.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* o papel do Danilo + a stack */}
        <Reveal className="mt-20">
          <div className="relative overflow-hidden rounded-[2rem] border border-amber-400/20 bg-gradient-to-br from-violet-950/80 via-[#0d0b1a] to-[#120d06] p-8 sm:p-12">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" aria-hidden="true" />
            <div className="relative grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-2xl ring-2 ring-amber-400/50">
                    <Image src={PROFILE.photo} alt={PROFILE.name} fill sizes="64px" className="object-cover" />
                  </div>
                  <div>
                    <p className="font-display text-xl font-bold text-white">{PROFILE.name}</p>
                    <p className="text-sm font-semibold text-amber-300">Fundador & Desenvolvedor do CodeGuilds</p>
                  </div>
                </div>
                <blockquote className="border-l-2 border-amber-400/60 pl-5 text-lg leading-relaxed text-slate-200">
                  “Criei o CodeGuilds porque acredito que aprender pode ser tão envolvente quanto um jogo. Cada missão concluída é um aluno
                  descobrindo que é capaz.”
                </blockquote>
                <ul className="grid gap-2.5">
                  {ROLES.map((r) => (
                    <li key={r} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" /> {r}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-6">
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Construído com</p>
                  <div className="flex flex-wrap gap-2">
                    {GUILD_STACK.map((t) => (
                      <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm font-medium text-slate-200">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-slate-400">
                  Uma plataforma completa, do zero: painéis de aluno, professor e administrador, API própria com login seguro, entregas de
                  arquivos na nuvem e eventos sazonais com chefões. Quer levar o CodeGuilds para a sua escola ou criar algo assim para o seu
                  negócio?
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <ServiceLink
                    service="aulas"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-300 to-amber-500 px-6 py-3.5 text-sm font-bold text-[#1a1203] shadow-lg shadow-amber-500/25 transition-transform hover:scale-[1.03]"
                  >
                    Quero na minha escola <ArrowUpRightIcon className="h-4 w-4" />
                  </ServiceLink>
                  <a
                    href={GUILD_REPO}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/30"
                  >
                    <SocialIcon id="github" className="h-4 w-4" /> Ver no GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
