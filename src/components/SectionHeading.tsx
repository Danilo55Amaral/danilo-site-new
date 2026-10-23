import Reveal from "./Reveal";

/**
 * O título padrão das seções: a etiqueta pequena em cima (`eyebrow`), o título
 * grande (o trecho em `highlight` sai em degradê) e o texto de apoio.
 */
export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "center" | "left";
}) {
  const centered = align === "center";
  return (
    <Reveal className={`mb-14 flex flex-col gap-4 ${centered ? "items-center text-center" : "items-start"}`}>
      <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">
        <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
        {eyebrow}
      </span>
      <h2 className="max-w-3xl text-balance font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title} {highlight && <span className="da-gradient-text">{highlight}</span>}
      </h2>
      {description && <p className="max-w-2xl text-balance text-base leading-relaxed text-slate-400 sm:text-lg">{description}</p>}
    </Reveal>
  );
}
