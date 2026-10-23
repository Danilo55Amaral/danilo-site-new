"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { FEATURED, INITIAL_PROJECTS, PROJECTS, Project, TRACKS, Track } from "@/engine/projects";
import { LINKS } from "@/engine/profile";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { ArrowRightIcon, ArrowUpRightIcon, CheckIcon, SocialIcon } from "./Icons";

// ============================================================================
// PROJETOS — o destaque do SPE em cartão grande, um atalho pro CodeGuilds e a
// grade com o filtro por trilha. A grade começa com INITIAL_PROJECTS cartões e
// o botão "Ver todos" mostra o resto.
// ============================================================================

function ProjectCard({ project }: { project: Project }) {
  const content = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden border-b border-slate-800/80 bg-da-sunken">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        {project.href && (
          <span className="absolute right-3 top-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white text-da-ink opacity-0 shadow-lg transition-all group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRightIcon className="h-4 w-4" />
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-lg font-bold text-white">{project.title}</h3>
        <p className="text-sm leading-relaxed text-slate-400">{project.description}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {project.tags.map((t) => (
            <span key={t} className="da-chip !py-0.5 !text-[11px]">
              {t}
            </span>
          ))}
        </div>
      </div>
    </>
  );

  const className = "da-card group flex h-full flex-col overflow-hidden transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-slate-700";
  return project.href ? (
    <a href={project.href} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
}

export default function Projects() {
  const [track, setTrack] = useState<Track | "todos">("todos");
  const [showAll, setShowAll] = useState(false);
  const featured = FEATURED[0];

  const filtered = useMemo(() => (track === "todos" ? PROJECTS : PROJECTS.filter((p) => p.tracks.includes(track))), [track]);
  const visible = showAll ? filtered : filtered.slice(0, INITIAL_PROJECTS);

  return (
    <section id="projetos" className="da-section bg-da-surface/40">
      <div className="da-container">
        <SectionHeading
          eyebrow="Portfólio"
          title="Projetos que"
          highlight="saíram do papel"
          description="Sistemas para a gestão pública, plataformas educacionais, APIs e análises de dados. Uma amostra do que posso construir para você."
        />

        {/* destaque: SPE */}
        <Reveal>
          <div className="da-card group grid overflow-hidden lg:grid-cols-[1.25fr_1fr]">
            <div className="relative min-h-[16rem] overflow-hidden bg-da-sunken lg:min-h-[24rem]">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(min-width: 1024px) 640px, 100vw"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-col gap-5 p-7 sm:p-10">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-300">{featured.kicker}</span>
              <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">{featured.title}</h3>
              <p className="leading-relaxed text-slate-400">{featured.description}</p>
              <ul className="flex flex-col gap-2">
                {featured.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2.5 text-sm text-slate-300">
                    <CheckIcon className="h-4 w-4 text-emerald-400" /> {h}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap gap-2">
                {featured.tags.map((t) => (
                  <span key={t} className="da-chip">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* atalho pro CodeGuilds */}
        <Reveal className="mt-5">
          <a
            href="#codeguilds"
            className="group flex flex-col items-start justify-between gap-4 rounded-3xl border border-amber-500/25 bg-gradient-to-r from-amber-500/10 via-violet-500/10 to-transparent p-6 transition-colors hover:border-amber-500/50 sm:flex-row sm:items-center"
          >
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {["ignis", "noctis", "flavus", "sapientia"].map((h) => (
                  <Image key={h} src={`/img/codeguilds/${h}.png`} alt="" width={44} height={44} className="h-11 w-11 object-contain drop-shadow" />
                ))}
              </div>
              <div>
                <p className="font-display text-lg font-bold text-white">CodeGuilds — fundei e desenvolvo</p>
                <p className="text-sm text-slate-400">A plataforma educacional gamificada que é o meu maior projeto.</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-300">
              Ver destaque <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </a>
        </Reveal>

        {/* filtro por trilha */}
        <div className="mb-8 mt-16 flex flex-wrap items-center justify-center gap-2" role="tablist" aria-label="Filtrar projetos por trilha">
          {TRACKS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={track === t.id}
              onClick={() => {
                setTrack(t.id);
                setShowAll(false);
              }}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                track === t.id ? "bg-white text-da-ink shadow-lg" : "border border-slate-800 bg-da-raised text-slate-400 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <Reveal key={`${track}-${p.id}`} delay={(i % 3) * 80}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {filtered.length > INITIAL_PROJECTS && (
            <button onClick={() => setShowAll((s) => !s)} className="da-btn-secondary">
              {showAll ? "Mostrar menos" : `Ver todos os ${filtered.length} projetos`}
            </button>
          )}
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="da-btn-secondary">
            <SocialIcon id="github" className="h-4 w-4" /> Mais no GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
