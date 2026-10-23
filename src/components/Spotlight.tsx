"use client";

import { useCallback } from "react";

/**
 * Cartão com o brilho que segue o mouse: guarda a posição do ponteiro nas
 * variáveis --mx/--my, que o `.da-spotlight::before` (globals.css) usa no
 * degradê. `glow` é a cor do brilho em "r g b".
 */
export default function Spotlight({
  children,
  className = "",
  glow = "139 92 246",
}: {
  children: React.ReactNode;
  className?: string;
  glow?: string;
}) {
  const onMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <div onPointerMove={onMove} className={`da-spotlight ${className}`} style={{ "--da-glow": glow } as React.CSSProperties}>
      {children}
    </div>
  );
}
