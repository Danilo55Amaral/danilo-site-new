import { MARQUEE_SKILLS, skillIcon } from "@/engine/skills";

/**
 * A faixa de tecnologias correndo sem parar embaixo do topo. A lista vai
 * duplicada: quando a primeira cópia sai pela esquerda, a segunda já está no
 * lugar dela, e a animação (translateX -50%) recomeça sem pulo.
 */
export default function TechMarquee() {
  const items = [...MARQUEE_SKILLS, ...MARQUEE_SKILLS];
  return (
    <section aria-label="Tecnologias que utilizo" className="border-y border-slate-800/60 bg-da-surface/60 py-6">
      <div className="da-marquee-mask overflow-hidden">
        <ul className="da-animate-marquee flex w-max gap-12 pr-12">
          {items.map((skill, i) => (
            <li key={`${skill.name}-${i}`} className="flex items-center gap-3 text-slate-400" aria-hidden={i >= MARQUEE_SKILLS.length}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={skillIcon(skill)}
                alt=""
                width={28}
                height={28}
                loading="lazy"
                className={`h-7 w-7 ${skill.invert ? "da-invert" : ""}`}
              />
              <span className="whitespace-nowrap font-display text-lg font-semibold">{skill.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
