import { FAQ } from "@/engine/about";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { PlusIcon } from "./Icons";

/**
 * Perguntas frequentes em <details>: abre e fecha sem JavaScript, e o Google
 * lê as respostas mesmo fechadas. O "+" vira "×" quando a pergunta está aberta.
 */
export default function Faq() {
  return (
    <section id="faq" className="da-section bg-da-surface/40">
      <div className="da-container grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            align="left"
            eyebrow="FAQ"
            title="Perguntas"
            highlight="frequentes"
            description="Não achou o que procurava? Me chama no WhatsApp — respondo rapidinho."
          />
        </div>

        <div className="flex flex-col gap-3">
          {FAQ.map((item, i) => (
            <Reveal key={item.question} delay={i * 50}>
              <details className="da-card group p-0 transition-colors open:border-violet-500/40" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-display text-base font-semibold text-white [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-700 text-slate-400 transition-all group-open:rotate-45 group-open:border-violet-500/60 group-open:bg-violet-500/15 group-open:text-violet-300">
                    <PlusIcon className="h-4 w-4" />
                  </span>
                </summary>
                <p className="px-6 pb-6 text-sm leading-relaxed text-slate-400">{item.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
