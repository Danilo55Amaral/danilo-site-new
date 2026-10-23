"use client";

import { LINKS } from "@/engine/profile";
import { useScroll } from "@/engine/store";
import { SocialIcon } from "./Icons";

/** O botão do WhatsApp no canto da tela. Aparece depois que o visitante sai do topo. */
export default function FloatingWhatsApp() {
  const { scrolled } = useScroll();
  return (
    <a
      href={LINKS.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp"
      title="Conversar no WhatsApp"
      className={`group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-xl shadow-emerald-500/30 transition-all duration-300 hover:scale-110 ${
        scrolled ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <span className="da-animate-ping absolute inset-0 rounded-full bg-[#25d366]/60" aria-hidden="true" />
      <SocialIcon id="whatsapp" className="relative h-7 w-7" />
    </a>
  );
}
