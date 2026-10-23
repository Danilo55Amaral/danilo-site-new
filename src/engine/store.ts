"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Theme, applyTheme, getTheme, setTheme } from "./theme";

// ============================================================================
// STORE — os hooks que as telas usam pra ler o estado do navegador (tema,
// rolagem, elemento visível). Quando algo muda aqui dentro, emitChange avisa
// todos os componentes inscritos, e o evento `storage` sincroniza as abas.
// ============================================================================

type Listener = () => void;
const listeners = new Set<Listener>();

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function emitChange() {
  listeners.forEach((l) => l());
}

/** Roda `sync` ao montar, a cada emitChange e quando outra aba mexe no localStorage do site. */
function useSyncOnChange(sync: () => void) {
  useEffect(() => {
    sync();
    const unsubscribe = subscribe(sync);
    const onStorage = (e: StorageEvent) => {
      if (e.key === null || e.key.startsWith("da-")) sync();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      unsubscribe();
      window.removeEventListener("storage", onStorage);
    };
  }, [sync]);
}

/** O tema atual e o botão de alternar (ver components/ThemeToggle.tsx). */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("dark");

  const sync = useCallback(() => {
    const t = getTheme();
    applyTheme(t);
    setThemeState(t);
  }, []);

  useSyncOnChange(sync);

  const toggle = useCallback(() => {
    const next = getTheme() === "dark" ? "light" : "dark";
    // A troca de cores acontece de uma vez, sem as transições dos cartões no meio do caminho
    document.documentElement.classList.add("da-theme-switching");
    setTheme(next);
    emitChange();
    window.setTimeout(() => document.documentElement.classList.remove("da-theme-switching"), 50);
  }, []);

  return { theme, toggle };
}

// O serviço escolhido num cartão do catálogo ("Escolher" / "Agendar"), que
// já chega marcado no painel de pedido. O `nonce` muda a cada clique, pra o
// painel reagir mesmo quando o visitante clica de novo no mesmo serviço.
export type PickMode = "orcamento" | "agendamento";
let picked: { itemId: string; mode: PickMode; note?: string; nonce: number } | null = null;

/** `note` vai pros detalhes do pedido (ex.: "Cobrança anual"). */
export function pickCatalogItem(itemId: string, mode: PickMode, note?: string) {
  picked = { itemId, mode, note, nonce: Date.now() };
  emitChange();
}

/** O último serviço escolhido nos cartões do catálogo (null até escolher). */
export function useCatalogPick() {
  const [pick, setPick] = useState(picked);
  const sync = useCallback(() => setPick(picked), []);
  useSyncOnChange(sync);
  return pick;
}

/** Quanto da página já foi rolado (0 a 1) e se saiu do topo — pro cabeçalho e a barra de progresso. */
export function useScroll() {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      setScrolled(window.scrollY > 12);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return { progress, scrolled };
}

/** A seção que está no meio da tela agora — pro link ativo do menu. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");
  const key = ids.join(",");

  useEffect(() => {
    const sections = key
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      // Só conta a faixa do meio da tela: a seção "ativa" é a que o visitante está lendo
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [key]);

  return active;
}

/** `visible` vira true na primeira vez que o elemento aparece na tela (e fica assim). */
export function useInView<T extends Element>(rootMargin = "0px 0px -12% 0px") {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, visible };
}
