import { NAV, PROFILE, SOCIALS } from "@/engine/profile";
import { Logo } from "./Header";
import { SocialIcon } from "./Icons";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-800/60 bg-da-surface/40">
      <div className="da-container flex flex-col gap-10 py-14">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div className="flex max-w-sm flex-col gap-3">
            <Logo />
            <p className="text-sm leading-relaxed text-slate-500">
              {PROFILE.roles.join(" · ")}. Fundador e desenvolvedor do CodeGuilds.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Rodapé">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="text-sm text-slate-400 transition-colors hover:text-white">
                {n.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex flex-col-reverse items-center justify-between gap-4 border-t border-slate-800/60 pt-8 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {year} Copyright {PROFILE.name}. Feito com Next.js, TypeScript e muito café ☕
          </p>
          <div className="flex gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.id}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-800 text-slate-500 transition-colors hover:border-slate-600 hover:text-white"
              >
                <SocialIcon id={s.id} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
