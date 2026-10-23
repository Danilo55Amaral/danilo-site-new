import Image from "next/image";
import { PROFILE, SOCIALS, heroStats } from "@/engine/profile";
import CountUp from "./CountUp";
import TypingRoles from "./TypingRoles";
import { ArrowRightIcon, GraduationIcon, SocialIcon } from "./Icons";

// ============================================================================
// TOPO — a primeira dobra: a chamada de venda, os cargos sendo digitados, os
// botões de orçamento e projetos e, do lado, a foto com a moldura girando e
// os cartões flutuando (a janela de código, o selo de fundador do CodeGuilds e
// a pós em Ciência de Dados). Embaixo, os números.
// ============================================================================

/** As manchas de luz que passeiam no fundo do topo. */
function Aurora() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="da-grid absolute inset-0" />
      <div className="da-animate-aurora absolute -left-32 -top-40 h-[34rem] w-[34rem] rounded-full bg-violet-600/25 blur-[120px]" />
      <div
        className="da-animate-aurora absolute -right-24 top-10 h-[30rem] w-[30rem] rounded-full bg-fuchsia-600/20 blur-[120px]"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="da-animate-aurora absolute bottom-0 left-1/3 h-[24rem] w-[24rem] rounded-full bg-cyan-500/15 blur-[120px]"
        style={{ animationDelay: "-12s" }}
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-da-bg to-transparent" />
    </div>
  );
}

/** A janelinha de código que flutua ao lado da foto (sempre escura, como um editor). */
function CodeWindow() {
  return (
    <div className="da-dark-scope da-animate-float absolute -top-10 hidden w-56 rounded-2xl border border-slate-700/60 bg-[#0b0b12]/95 p-4 font-mono text-[10.5px] text-slate-300 leading-relaxed shadow-2xl shadow-black/40 backdrop-blur sm:-left-20 sm:block lg:-left-28">
      <div className="mb-3 flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
      </div>
      <p>
        <span className="text-fuchsia-400">const</span> <span className="text-sky-300">danilo</span> <span className="text-slate-500">=</span> {"{"}
      </p>
      <p className="pl-4">
        <span className="text-slate-300">stack</span>: [<span className="text-emerald-300">&quot;React&quot;</span>, <span className="text-emerald-300">&quot;Next&quot;</span>,{" "}
        <span className="text-emerald-300">&quot;Node&quot;</span>],
      </p>
      <p className="pl-4">
        <span className="text-slate-300">dados</span>: [<span className="text-emerald-300">&quot;Python&quot;</span>, <span className="text-emerald-300">&quot;Pandas&quot;</span>],
      </p>
      <p className="pl-4">
        <span className="text-slate-300">fundador</span>: <span className="text-emerald-300">&quot;CodeGuilds&quot;</span>,
      </p>
      <p className="pl-4">
        <span className="text-slate-300">disponivel</span>: <span className="text-amber-300">true</span>,
      </p>
      <p>{"};"}</p>
    </div>
  );
}

function Portrait() {
  return (
    <div className="relative mx-auto w-full max-w-[26rem] lg:mr-0">
      {/* brilho atrás da foto */}
      <div className="absolute -inset-10 -z-10 rounded-full bg-gradient-to-tr from-violet-600/40 via-fuchsia-500/25 to-cyan-400/30 blur-3xl" aria-hidden="true" />

      <div className="da-ring rounded-[2.5rem] p-[3px]">
        <div className="relative aspect-square overflow-hidden rounded-[2.4rem] bg-da-card">
          <Image
            src={PROFILE.photo}
            alt={`${PROFILE.name}, engenheiro de software, trabalhando no notebook`}
            fill
            priority
            sizes="(min-width: 1024px) 416px, 90vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
      </div>

      <CodeWindow />

      {/* selo de fundador do CodeGuilds */}
      <a
        href="#codeguilds"
        className="da-animate-float absolute -bottom-6 -left-2 flex items-center gap-3 rounded-2xl border border-amber-500/30 bg-da-card/95 py-2.5 pl-2.5 pr-4 shadow-xl shadow-black/20 backdrop-blur transition-transform hover:scale-105 sm:-left-10"
        style={{ animationDelay: "-2s" }}
      >
        <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400/20 to-violet-500/20">
          <Image src="/img/codeguilds/flavus.png" alt="" width={36} height={36} className="h-9 w-9 object-contain" />
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-300">Fundador & Dev</span>
          <span className="font-display text-sm font-bold text-white">CodeGuilds</span>
        </span>
      </a>

      {/* pós em ciência de dados */}
      <div
        className="da-animate-float absolute -right-2 bottom-20 flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-da-card/95 py-2.5 pl-2.5 pr-4 shadow-xl shadow-black/20 backdrop-blur sm:-right-8"
        style={{ animationDelay: "-4s" }}
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300">
          <GraduationIcon className="h-5 w-5" />
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-300">Pós-graduado</span>
          <span className="font-display text-sm font-bold text-white">Ciência de Dados</span>
        </span>
      </div>
    </div>
  );
}

export default function Hero() {
  const stats = heroStats();
  return (
    <section id="inicio" className="relative isolate overflow-hidden pb-16 pt-28 sm:pt-36">
      <Aurora />

      <div className="da-container grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        <div className="flex flex-col items-start gap-7">
          <span className="da-reveal is-visible inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="da-animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Disponível para novos projetos e turmas
          </span>

          <div className="flex flex-col gap-4">
            <p className="text-base font-medium text-slate-400 sm:text-lg">
              Prazer, eu sou o <span className="font-semibold text-white">{PROFILE.name}</span> 👋
            </p>
            <h1 className="font-display text-[2.6rem] font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[4.2rem]">
              Transformo ideias em <span className="da-gradient-text">software que gera resultado.</span>
            </h1>
          </div>

          <p className="font-mono text-base text-slate-300 sm:text-lg">
            <span className="text-slate-600">&gt;</span> <TypingRoles roles={PROFILE.roles} />
          </p>

          <p className="max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
            Desenvolvo sites, sistemas web e APIs sob medida, transformo dados em decisões e ensino programação para a próxima geração
            de devs. Do primeiro rascunho ao deploy — com código limpo, prazo combinado e suporte humanizado.
          </p>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a href="#contato" className="da-btn-accent group">
              Solicitar orçamento
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#projetos" className="da-btn-secondary">
              Ver projetos
            </a>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 bg-da-raised text-slate-400 transition-all hover:-translate-y-0.5 hover:border-violet-500/50 hover:text-white"
                >
                  <SocialIcon id={s.id} className="h-4 w-4" />
                </a>
              ))}
            </div>
            <span className="hidden h-6 w-px bg-slate-800 sm:block" />
            <span className="hidden text-sm text-slate-500 sm:block">{PROFILE.location}</span>
          </div>
        </div>

        <Portrait />
      </div>

      <div className="da-container mt-24">
        <dl className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="da-card flex flex-col gap-1 px-5 py-5 sm:px-6">
              <dt className="order-2 text-xs leading-snug text-slate-500 sm:text-sm">{s.label}</dt>
              <dd className="order-1 font-display text-3xl font-bold text-white sm:text-4xl">
                <CountUp value={s.value} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
