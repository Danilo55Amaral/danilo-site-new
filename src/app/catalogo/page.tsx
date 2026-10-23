import type { Metadata } from "next";
import Link from "next/link";
import CatalogCard from "@/components/catalog/CatalogCard";
import CategoryNav from "@/components/catalog/CategoryNav";
import OrderPanel from "@/components/catalog/OrderPanel";
import PickButton from "@/components/catalog/PickButton";
import Plans from "@/components/catalog/Plans";
import Faq from "@/components/Faq";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { ArrowRightIcon, CalendarIcon, CheckIcon, ClockIcon, PlusIcon, ServiceIcon, ShieldIcon } from "@/components/Icons";
import { ADDONS, AVAILABLE_ITEMS, CATALOG_FAQ, CATEGORIES, GUARANTEES, PAYMENT_TERMS, formatBRL, itemsOf } from "@/engine/catalog";
import { PROFILE } from "@/engine/profile";

// ============================================================================
// /catalogo — a vitrine de serviços com preço: o visitante vê as categorias,
// compara os pacotes, escolhe um serviço (ou agenda o diagnóstico grátis) e
// faz o pedido no painel do fim da página, que chega por e-mail pro Danilo.
// A ordem segue o funil: confiança → escolha → extras → condições → pedido.
// ============================================================================

export const metadata: Metadata = {
  title: `Catálogo de serviços e preços — ${PROFILE.name}`,
  description:
    "Sites, lojas virtuais, sistemas web, APIs, ciência de dados e consultoria com preços de referência. Escolha o serviço, peça o orçamento ou agende um diagnóstico gratuito.",
  alternates: { canonical: "/catalogo" },
};

// Colunas da grade por quantidade de cartões (classes inteiras, pro Tailwind enxergar).
// Com 4 cartões fica 2×2: em 4 colunas o cartão estreita demais e o preço quebra linha.
const GRID_COLS: Record<number, string> = { 3: "lg:grid-cols-3", 4: "lg:grid-cols-2" };

function Hero() {
  return (
    <section className="relative isolate overflow-hidden pb-16 pt-32 sm:pt-40">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="da-grid absolute inset-0" />
        <div className="da-animate-aurora absolute -top-40 left-1/2 h-[36rem] w-[50rem] -translate-x-1/2 rounded-full bg-violet-600/25 blur-[130px]" />
        <div className="da-animate-aurora absolute -right-32 top-40 h-[24rem] w-[24rem] rounded-full bg-fuchsia-600/20 blur-[120px]" style={{ animationDelay: "-7s" }} />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-da-bg to-transparent" />
      </div>

      <div className="da-container flex flex-col items-center gap-7 text-center">
        <nav aria-label="Você está em" className="text-xs text-slate-500">
          <Link href="/" className="hover:text-white">
            Início
          </Link>{" "}
          / <span className="text-slate-300">Catálogo</span>
        </nav>
        <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-400" /> Catálogo de serviços 2026
        </span>
        <h1 className="max-w-4xl text-balance font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl">
          Escolha o seu projeto. <span className="da-gradient-text">O preço já está aqui.</span>
        </h1>
        <p className="max-w-2xl text-balance text-base leading-relaxed text-slate-400 sm:text-lg">
          Preços transparentes para sites, lojas, sistemas, dados e consultoria. Escolha um serviço, monte a estimativa com os
          extras e receba a proposta por escrito — ou comece por um diagnóstico gratuito de 30 minutos.
        </p>
        <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <PickButton itemId="diagnostico-gratuito" mode="agendamento" className="da-btn-accent group">
            <CalendarIcon className="h-4 w-4" /> Agendar diagnóstico grátis
          </PickButton>
          <a href="#sites" className="da-btn-secondary group">
            Ver serviços e preços <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
        <ul className="mt-2 flex flex-wrap justify-center gap-x-6 gap-y-2">
          {GUARANTEES.map((g) => (
            <li key={g} className="flex items-center gap-2 text-sm text-slate-400">
              <CheckIcon className="h-4 w-4 text-emerald-400" /> {g}
            </li>
          ))}
        </ul>
        <dl className="mt-6 grid w-full max-w-3xl grid-cols-3 gap-3">
          {[
            { value: String(CATEGORIES.filter((c) => !c.unavailable).length), label: "áreas de atuação" },
            { value: String(AVAILABLE_ITEMS.length), label: "serviços com preço" },
            { value: "30 min", label: "de diagnóstico grátis" },
          ].map((s) => (
            <div key={s.label} className="da-card flex flex-col gap-1 px-3 py-4">
              <dd className="font-display text-2xl font-bold text-white sm:text-3xl">{s.value}</dd>
              <dt className="text-xs text-slate-500">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default function CatalogPage() {
  return (
    <main>
      <Hero />
      <CategoryNav />

      {/* uma seção por categoria */}
      {CATEGORIES.map((category, ci) => {
        const items = itemsOf(category.id);
        return (
          <section key={category.id} id={category.id} className={`scroll-mt-32 py-20 sm:py-24 ${ci % 2 ? "bg-da-surface/40" : ""}`}>
            <div className="da-container">
              <Reveal className="mb-12 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 text-violet-300 ring-1 ring-violet-500/30">
                    <ServiceIcon id={category.id} className="h-7 w-7" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-300">
                      0{ci + 1} · {category.label}
                    </p>
                    <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">{category.title}</h2>
                    <p className="mt-2 max-w-2xl text-slate-400">{category.description}</p>
                  </div>
                </div>
              </Reveal>
              {category.unavailable && (
                <Reveal className="mb-8">
                  <div className="flex flex-col gap-4 rounded-3xl border border-amber-500/40 bg-amber-500/10 p-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-300">
                        <ClockIcon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="font-display text-lg font-bold text-amber-300">Indisponível no momento</p>
                        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-300">{category.unavailable}</p>
                      </div>
                    </div>
                    <Link href="/#ensino" className="da-btn-secondary shrink-0">
                      Meu trabalho como professor
                    </Link>
                  </div>
                </Reveal>
              )}
              <div className={`grid gap-6 pt-3 sm:grid-cols-2 ${GRID_COLS[items.length] ?? "lg:grid-cols-3"}`}>
                {items.map((item, i) => (
                  <Reveal key={item.id} delay={i * 80}>
                    <CatalogCard item={item} unavailable={Boolean(category.unavailable)} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* planos de manutenção */}
      <section id="planos" className="da-section scroll-mt-32">
        <div className="da-container">
          <SectionHeading
            eyebrow="Planos de manutenção"
            title="Seu site no ar e"
            highlight="sempre evoluindo"
            description="Depois da entrega, eu continuo cuidando: hospedagem, segurança, backups e horas de melhorias todo mês. Você foca no negócio."
          />
          <Plans />
        </div>
      </section>

      {/* extras e condições */}
      <section className="da-section bg-da-surface/40">
        <div className="da-container grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="da-card h-full p-7 sm:p-9">
              <h2 className="flex items-center gap-3 font-display text-2xl font-bold text-white">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
                  <PlusIcon className="h-5 w-5" />
                </span>
                Extras para turbinar o projeto
              </h2>
              <p className="mt-2 text-sm text-slate-400">Adicione no pedido de orçamento — a estimativa já soma tudo.</p>
              <ul className="mt-6 divide-y divide-slate-800/80">
                {ADDONS.map((a) => (
                  <li key={a.id} className="flex items-center justify-between gap-4 py-3.5 text-sm">
                    <span className="text-slate-300">{a.name}</span>
                    <span className="shrink-0 font-semibold text-white">
                      + {a.percent ? `${a.percent}%` : formatBRL(a.price ?? 0)}
                      {a.note && <span className="font-normal text-slate-500"> {a.note}</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <div className="flex flex-col gap-6">
            <Reveal delay={100}>
              <div className="da-card p-7 sm:p-9">
                <h2 className="font-display text-2xl font-bold text-white">Formas de pagamento</h2>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {PAYMENT_TERMS.map((p) => (
                    <li key={p.title} className="flex gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-da-raised text-lg ring-1 ring-slate-800">{p.icon}</span>
                      <span>
                        <span className="block text-sm font-semibold text-white">{p.title}</span>
                        <span className="block text-xs leading-relaxed text-slate-400">{p.text}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={180}>
              <div className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-da-card to-da-card p-7 sm:p-9">
                <h2 className="flex items-center gap-3 font-display text-2xl font-bold text-white">
                  <ShieldIcon className="h-7 w-7 text-emerald-300" /> Garantias
                </h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {GUARANTEES.map((g) => (
                    <li key={g} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /> {g}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* o pedido */}
      <section id="pedido" className="da-section scroll-mt-32">
        <div className="da-container">
          <SectionHeading
            eyebrow="Fazer pedido"
            title="Vamos começar o"
            highlight="seu projeto?"
            description="Peça um orçamento com o serviço, os detalhes e o prazo — ou agende uma conversa. O pedido chega direto para mim."
          />
          <Reveal>
            <OrderPanel />
          </Reveal>
        </div>
      </section>

      {/* dúvidas sobre preço */}
      <Faq
        items={CATALOG_FAQ}
        id="duvidas"
        eyebrow="Dúvidas"
        title="Sobre preços e"
        highlight="contratação"
        description="Ficou alguma dúvida? Pergunte no diagnóstico gratuito ou pelo WhatsApp."
      />
    </main>
  );
}
