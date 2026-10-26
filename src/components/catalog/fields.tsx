// Peças dos formulários do catálogo: título numerado de cada passo, chips de
// escolha e os campos de contato (nome, e-mail, WhatsApp, empresa).

export interface ContactValues {
  name: string;
  email: string;
  phone: string;
  company: string;
}

export const EMPTY_CONTACT: ContactValues = { name: "", email: "", phone: "", company: "" };

/** "81999998888" -> "(81) 99999-8888" enquanto o visitante digita. */
export function formatPhone(value: string): string {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function Step({ n, title, hint, children }: { n: number; title: string; hint?: string; children: React.ReactNode }) {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="mb-3 flex items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 font-display text-xs font-bold text-da-onaccent">
          {n}
        </span>
        <span className="font-display text-base font-bold text-white">{title}</span>
        {hint && <span className="text-xs text-slate-500">{hint}</span>}
      </legend>
      {children}
    </fieldset>
  );
}

export function Chip({
  active,
  disabled = false,
  onClick,
  children,
}: {
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
        disabled
          ? "cursor-not-allowed border-dashed border-slate-700 text-slate-500"
          : active
            ? "border-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600 text-da-onaccent shadow-md shadow-fuchsia-500/20"
            : "border-slate-800 bg-da-raised text-slate-400 hover:border-slate-600 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

/** `idPrefix` separa os campos das duas abas (as duas ficam montadas na página). */
export function ContactFields({ idPrefix, value, onChange }: { idPrefix: string; value: ContactValues; onChange: (v: ContactValues) => void }) {
  const set = (patch: Partial<ContactValues>) => onChange({ ...value, ...patch });
  const id = (field: string) => `${idPrefix}-${field}`;
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <label htmlFor={id("nome")} className="da-label">
          Nome *
        </label>
        <input id={id("nome")} className="da-input" autoComplete="name" placeholder="Seu nome" value={value.name} onChange={(e) => set({ name: e.target.value })} />
      </div>
      <div>
        <label htmlFor={id("empresa")} className="da-label">
          Empresa
        </label>
        <input
          id={id("empresa")}
          className="da-input"
          autoComplete="organization"
          placeholder="Opcional"
          value={value.company}
          onChange={(e) => set({ company: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor={id("email")} className="da-label">
          E-mail *
        </label>
        <input
          id={id("email")}
          type="email"
          className="da-input"
          autoComplete="email"
          placeholder="voce@email.com"
          value={value.email}
          onChange={(e) => set({ email: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor={id("whatsapp")} className="da-label">
          WhatsApp *
        </label>
        <input
          id={id("whatsapp")}
          type="tel"
          inputMode="tel"
          className="da-input"
          autoComplete="tel"
          placeholder="(81) 99999-9999"
          value={value.phone}
          onChange={(e) => set({ phone: formatPhone(e.target.value) })}
        />
      </div>
    </div>
  );
}

/** Campo escondido que só robô preenche (a API descarta o pedido se vier preenchido). */
export function Honeypot({ idPrefix, value, onChange }: { idPrefix: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
      <label htmlFor={`${idPrefix}-site`}>Site</label>
      <input id={`${idPrefix}-site`} tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
