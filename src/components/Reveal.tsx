"use client";

import { useInView } from "@/engine/store";

/**
 * Envolve um trecho que aparece subindo quando entra na tela (uma vez só).
 * `delay` (ms) escalona os itens de uma grade, um depois do outro.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const { ref, visible } = useInView<HTMLDivElement>();
  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={`da-reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ "--da-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
