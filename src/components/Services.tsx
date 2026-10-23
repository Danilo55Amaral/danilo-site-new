import { Accent, PROCESS, SERVICES } from "@/engine/services";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import Spotlight from "./Spotlight";
import ServiceLink from "./ServiceLink";
import { ArrowUpRightIcon, CheckIcon, ServiceIcon } from "./Icons";

// ============================================================================
// SERVIÇOS — os seis cartões do que o Danilo vende (cada um com o brilho que
// segue o mouse na cor do serviço) e, embaixo, os quatro passos de como um
// projeto anda, do primeiro contato à entrega.
// ============================================================================

// Classes inteiras (e não montadas com a cor), pro Tailwind enxergar cada uma.
const ACCENT_STYLE: Record<Accent, { icon: string; glow: string; line: string }> = {
  violet: { icon: "bg-violet-500/15 text-violet-300 ring-violet-500/30", glow: "139 92 246", line: "from-violet-500" },
  fuchsia: { icon: "bg-fuchsia-500/15 text-fuchsia-300 ring-fuchsia-500/30", glow: "217 70 239", line: "from-fuchsia-500" },
  cyan: { icon: "bg-cyan-500/15 text-cyan-300 ring-cyan-500/30", glow: "34 211 238", line: "from-cyan-500" },
  emerald: { icon: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30", glow: "52 211 153", line: "from-emerald-500" },
  amber: { icon: "bg-amber-500/15 text-amber-300 ring-amber-500/30", glow: "251 191 36", line: "from-amber-500" },
  sky: { icon: "bg-sky-500/15 text-sky-300 ring-sky-500/30", glow: "56 189 248", line: "from-sky-500" },
};

export default function Services() {
  return (
    <section id="servicos" className="da-section">
      <div className="da-container">
        <SectionHeading
          eyebrow="Serviços"
          title="Como posso"
          highlight="acelerar o seu negócio"
          description="Da landing page que vende ao sistema que organiza a empresa inteira — e as aulas que formam quem vai construir o próximo. Escolha por onde começar."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const style = ACCENT_STYLE[service.accent];
            return (
              <Reveal key={service.id} delay={i * 80}>
                <Spotlight
                  glow={style.glow}
                  className="da-card group flex h-full flex-col gap-5 overflow-hidden p-7 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-slate-700"
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${style.line} to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                  />
                  <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ring-1 ${style.icon}`}>
                    <ServiceIcon id={service.id} />
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-display text-xl font-bold text-white">{service.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-400">{service.pitch}</p>
                  </div>
                  <ul className="mt-auto flex flex-col gap-2.5 border-t border-slate-800/80 pt-5">
                    {service.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <ServiceLink
                    service={service.id}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-colors hover:text-fuchsia-300"
                  >
                    Quero esse serviço <ArrowUpRightIcon className="h-4 w-4" />
                  </ServiceLink>
                </Spotlight>
              </Reveal>
            );
          })}
        </div>

        {/* COMO TRABALHO */}
        <div className="mt-24">
          <Reveal className="mb-10 flex flex-col items-center gap-3 text-center">
            <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Como <span className="da-gradient-text">trabalho</span>
            </h3>
            <p className="max-w-xl text-slate-400">Um processo simples, transparente e sem surpresas — você sabe o que acontece em cada etapa.</p>
          </Reveal>

          <ol className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {/* a linha que liga os passos (só no computador) */}
            <div
              className="absolute left-0 right-0 top-[2.1rem] hidden h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent lg:block"
              aria-hidden="true"
            />
            {PROCESS.map((step, i) => (
              <Reveal key={step.title} as="li" delay={i * 100} className="relative">
                <div className="flex h-full flex-col gap-3 rounded-3xl border border-slate-800/80 bg-da-card/80 p-6 backdrop-blur">
                  <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 font-display text-sm font-bold text-da-onaccent shadow-lg shadow-fuchsia-500/30">
                    0{i + 1}
                  </span>
                  <h4 className="font-display text-lg font-bold text-white">{step.title}</h4>
                  <p className="text-sm leading-relaxed text-slate-400">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
