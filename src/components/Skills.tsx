import { SKILL_GROUPS, skillIcon } from "@/engine/skills";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

// ============================================================================
// HABILIDADES — as 27 tecnologias num "painel de sistema" (a homenagem ao
// STATUS: ONLINE do site antigo), separadas por área.
// ============================================================================

const TOTAL = SKILL_GROUPS.reduce((n, g) => n + g.skills.length, 0);

export default function Skills() {
  return (
    <section id="habilidades" className="da-section">
      <div className="da-container">
        <SectionHeading
          eyebrow="Habilidades"
          title="Meu"
          highlight="arsenal tecnológico"
          description="As ferramentas que uso todos os dias para entregar projetos modernos, rápidos e fáceis de manter."
        />

        <Reveal>
          <div className="da-card overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 bg-da-sunken px-6 py-3 font-mono text-xs">
              <span className="flex items-center gap-2 text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px] shadow-emerald-400" /> STATUS: ONLINE
              </span>
              <span className="text-slate-500">~/danilo/skills</span>
              <span className="text-violet-300">{TOTAL} MÓDULOS</span>
            </div>

            <div className="grid divide-y divide-slate-800/80 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
              {SKILL_GROUPS.map((group) => (
                <div key={group.title} className="flex flex-col gap-5 p-6 sm:p-8">
                  <h3 className="flex items-center justify-between font-display text-lg font-bold text-white">
                    {group.title}
                    <span className="font-mono text-xs font-medium text-slate-600">{group.skills.length}</span>
                  </h3>
                  <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-2">
                    {group.skills.map((skill) => (
                      <li
                        key={skill.name}
                        className="group flex min-h-[2.75rem] items-center gap-2.5 rounded-2xl border border-slate-800/80 bg-da-raised px-3 py-2 transition-all hover:-translate-y-0.5 hover:border-violet-500/40"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={skillIcon(skill)}
                          alt=""
                          width={22}
                          height={22}
                          loading="lazy"
                          className={`h-[22px] w-[22px] shrink-0 transition-transform group-hover:scale-110 ${skill.invert ? "da-invert" : ""}`}
                        />
                        <span className="text-[13px] font-medium leading-tight text-slate-300">{skill.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
