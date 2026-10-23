"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { DEGREES, Degree, TESTIMONIALS } from "@/engine/about";
import { LINKS } from "@/engine/profile";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { CloseIcon, ExpandIcon, GraduationIcon, QuoteIcon, SocialIcon } from "./Icons";

// ============================================================================
// CREDENCIAIS — os diplomas (clicar abre o diploma em tela cheia) e as
// recomendações reais do LinkedIn.
// ============================================================================

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

/** O diploma em tela cheia, por cima da página. Esc ou clique fora fecha. */
function DegreeViewer({ degree, onClose }: { degree: Degree; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Diploma de ${degree.title}`}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
    >
      <button
        onClick={onClose}
        aria-label="Fechar"
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
      >
        <CloseIcon />
      </button>
      <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <Image src={degree.image} alt={`Diploma de ${degree.title}`} width={1123} height={794} className="h-auto w-full rounded-2xl shadow-2xl" />
      </div>
    </div>
  );
}

export default function Credentials() {
  const [open, setOpen] = useState<Degree | null>(null);

  return (
    <section id="credenciais" className="da-section">
      <div className="da-container">
        <SectionHeading
          eyebrow="Formação & Recomendações"
          title="Credibilidade que"
          highlight="você pode conferir"
          description="Formação acadêmica sólida e o reconhecimento de quem já trabalhou comigo."
        />

        {/* diplomas */}
        <div className="grid gap-5 md:grid-cols-2">
          {DEGREES.map((d, i) => (
            <Reveal key={d.title} delay={i * 100}>
              <button
                onClick={() => setOpen(d)}
                className="da-card group flex w-full flex-col overflow-hidden text-left transition-[transform,border-color] hover:-translate-y-1 hover:border-slate-700"
              >
                <div className="relative aspect-[1123/794] overflow-hidden border-b border-slate-800/80 bg-white">
                  <Image
                    src={d.image}
                    alt={`Diploma de ${d.title}`}
                    fill
                    sizes="(min-width: 768px) 560px, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                    <ExpandIcon className="h-4 w-4" />
                  </span>
                </div>
                <div className="flex items-start gap-4 p-6">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-300 ring-1 ring-violet-500/30">
                    <GraduationIcon className="h-6 w-6" />
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-fuchsia-300">
                      {d.level} · {d.year}
                    </span>
                    <span className="font-display text-xl font-bold text-white">{d.title}</span>
                    <span className="text-sm text-slate-500">{d.school}</span>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        {/* recomendações */}
        <div className="mt-20 grid gap-5 [&>*]:min-w-0 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <figure className="da-card relative flex h-full flex-col gap-6 p-7">
                <QuoteIcon className="h-9 w-9 text-violet-500/40" />
                <blockquote className="flex-1 text-[15px] leading-relaxed text-slate-300">“{t.quote}”</blockquote>
                <figcaption className="flex items-center gap-3 border-t border-slate-800/80 pt-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 font-display text-sm font-bold text-da-onaccent">
                    {initials(t.name)}
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="font-semibold text-white">{t.name}</span>
                    <span className="text-xs leading-snug text-slate-500">{t.role}</span>
                    <span className="text-xs text-slate-600">{t.relation}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 flex justify-center">
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="da-btn-secondary">
            <SocialIcon id="linkedin" className="h-4 w-4" /> Ver recomendações no LinkedIn
          </a>
        </Reveal>
      </div>

      {open && <DegreeViewer degree={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
