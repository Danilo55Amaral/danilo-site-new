"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/engine/store";

const DURATION_MS = 1600;

/** Número que sobe do zero até `value` quando aparece na tela (desacelerando no fim). */
export default function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const { ref, visible } = useInView<HTMLSpanElement>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!visible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCurrent(value);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION_MS);
      const eased = 1 - Math.pow(1 - t, 3);
      setCurrent(Math.round(value * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [visible, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {current}
      {suffix}
    </span>
  );
}
