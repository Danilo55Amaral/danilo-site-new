import Image from "next/image";
import { COURSES } from "@/engine/about";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import ServiceLink from "./ServiceLink";
import { ArrowRightIcon, CheckIcon } from "./Icons";

// ============================================================================
// ENSINO — o Danilo professor: o que ensina na Passaporte Edu, os formatos de
// aula que oferece e o CodeGuilds como a sala de aula gamificada dele.
// ============================================================================

const FORMATS = ["Aulas particulares (online ou presencial)", "Turmas para escolas e cursos", "Workshops e mentorias para empresas"];

export default function Teaching() {
  return (
    <section id="ensino" className="da-section bg-da-surface/40">
      <div className="da-container">
        <SectionHeading
          eyebrow="Professor de Programação"
          title="Ensino que"
          highlight="forma novos devs"
          description="Na Passaporte Edu, ensino lógica, linguagens de programação e o desenvolvimento prático de apps e jogos 2D e 3D — com a experiência de quem vive o mercado."
        />

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {COURSES.map((c, i) => (
              <Reveal key={c.title} delay={i * 80}>
                <div className="da-card flex h-full flex-col gap-3 p-6 transition-[transform,border-color] hover:-translate-y-1 hover:border-amber-500/40">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/15 text-2xl ring-1 ring-amber-500/25">{c.icon}</span>
                  <h3 className="font-display text-lg font-bold text-white">{c.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={150}>
            <div className="relative flex h-full flex-col gap-6 overflow-hidden rounded-3xl border border-violet-500/30 bg-gradient-to-br from-violet-600/20 via-da-card to-amber-500/10 p-8">
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-violet-500/20 blur-3xl" aria-hidden="true" />
              <div className="relative flex items-center gap-3">
                <Image src="/img/codeguilds/sapientia.png" alt="" width={56} height={56} className="h-14 w-14 object-contain" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-300">Minha sala de aula</p>
                  <p className="font-display text-xl font-bold text-white">Aprender jogando</p>
                </div>
              </div>
              <p className="relative leading-relaxed text-slate-300">
                Nas minhas turmas, os alunos estudam no <strong className="text-white">CodeGuilds</strong>, a plataforma gamificada que
                criei: cada conteúdo vira missão, cada acerto vale XP e a turma inteira joga junta pelas casas.
              </p>
              <ul className="relative flex flex-col gap-2.5">
                {FORMATS.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-slate-300">
                    <CheckIcon className="h-4 w-4 shrink-0 text-emerald-400" /> {f}
                  </li>
                ))}
              </ul>
              <ServiceLink service="aulas" className="da-btn-primary group relative mt-auto self-start">
                Agendar uma aula <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </ServiceLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
