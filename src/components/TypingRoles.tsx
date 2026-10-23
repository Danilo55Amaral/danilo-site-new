"use client";

import { useEffect, useState } from "react";

const TYPE_MS = 70;
const ERASE_MS = 35;
const HOLD_MS = 1800;

/**
 * Os cargos do topo sendo digitados e apagados, um de cada vez, com o cursor
 * piscando. O primeiro já vem escrito no HTML (pro Google e pra quem pede
 * menos movimento, que fica só com ele).
 */
export default function TypingRoles({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(roles[0] ?? "");
  const [erasing, setErasing] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const full = roles[index];
    let timer: number;
    if (!erasing && text === full) {
      timer = window.setTimeout(() => setErasing(true), HOLD_MS);
    } else if (erasing && text === "") {
      setErasing(false);
      setIndex((i) => (i + 1) % roles.length);
    } else {
      timer = window.setTimeout(
        () => setText(erasing ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1)),
        erasing ? ERASE_MS : TYPE_MS,
      );
    }
    return () => window.clearTimeout(timer);
  }, [text, erasing, index, roles]);

  return (
    <span className="inline-flex items-center">
      <span className="da-gradient-text">{text}</span>
      <span className="da-animate-blink ml-1 inline-block h-[1.1em] w-[3px] rounded-full bg-fuchsia-400" aria-hidden="true" />
      <span className="sr-only">{roles.join(", ")}</span>
    </span>
  );
}
