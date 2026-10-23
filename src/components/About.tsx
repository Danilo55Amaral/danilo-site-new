import Image from "next/image";
import { CAREER } from "@/engine/about";
import { PROFILE } from "@/engine/profile";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { MapPinIcon } from "./Icons";

// ============================================================================
// SOBRE — a história do Danilo (à esquerda, com a foto) e a linha do tempo da
// carreira (à direita), da Brisanet em 2019 até a sala de aula hoje.
// ============================================================================

const HIGHLIGHTS = [
  { value: "ADS", label: "Graduado em Análise e Desenvolvimento de Sistemas" },
  { value: "Pós", label: "Pós-graduado em Ciência de Dados" },
  { value: "40 mil", label: "empresas no ERP Silia, que ajudei a desenvolver" },
];

export default function About() {
  return (
    <section id="sobre" className="da-section">
      <div className="da-container">
        <SectionHeading
          eyebrow="Sobre mim"
          title="Da fibra óptica ao"
          highlight="código que transforma"
          description="Desenvolvedor, cientista de dados e professor. Uma trajetória construída com curiosidade, estudo e muito projeto no ar."
        />

        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr]">
          {/* a história */}
          <Reveal className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-3xl ring-2 ring-violet-500/40">
                <Image src={PROFILE.photo} alt={PROFILE.name} fill sizes="80px" className="object-cover" />
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-white">{PROFILE.name}</p>
                <p className="flex items-center gap-1.5 text-sm text-slate-500">
                  <MapPinIcon className="h-4 w-4" /> Natural de {PROFILE.location}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 text-base leading-relaxed text-slate-400">
              <p>
                Sou graduado em <strong className="font-semibold text-slate-200">Análise e Desenvolvimento de Sistemas</strong> e
                pós-graduado em <strong className="font-semibold text-slate-200">Ciência de Dados</strong> pelo Centro Universitário
                Leonardo Da Vinci (UNIASSELVI).
              </p>
              <p>
                Como desenvolvedor full-stack, crio projetos próprios e consultorias com React, Next, TypeScript, Node.js, MySQL e Docker.
                Já desenvolvi lojas virtuais, portfólios, sistemas de CRM e o{" "}
                <strong className="font-semibold text-slate-200">Sistema de Painel Eletrônico da Câmara Municipal de Chã de Alegria</strong>.
              </p>
              <p>
                Também sou o fundador e desenvolvedor do <a href="#codeguilds" className="font-semibold text-amber-300 underline-offset-4 hover:underline">CodeGuilds</a>,
                e atuo como <strong className="font-semibold text-slate-200">Professor de Linguagem de Programação</strong> na Passaporte Edu,
                levando a experiência do mercado para formar novos profissionais de tecnologia.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {HIGHLIGHTS.map((h) => (
                <div key={h.value} className="da-card flex flex-col gap-1 p-4">
                  <span className="font-display text-xl font-bold text-white sm:text-2xl">{h.value}</span>
                  <span className="text-xs leading-snug text-slate-500">{h.label}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* linha do tempo */}
          <ol className="relative flex flex-col gap-5 border-l border-slate-800 pl-8">
            {CAREER.map((m, i) => (
              <Reveal key={m.title} as="li" delay={i * 100} className="relative">
                <span className="absolute -left-[2.6rem] top-6 flex h-5 w-5 items-center justify-center rounded-full border-4 border-da-bg bg-gradient-to-br from-violet-500 to-fuchsia-500" />
                <div className="da-card flex flex-col gap-2 p-6 transition-colors hover:border-slate-700">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-violet-500/15 px-3 py-0.5 text-xs font-bold text-violet-300">{m.period}</span>
                    <span className="text-xs font-medium text-slate-500">{m.place}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-white">{m.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{m.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
