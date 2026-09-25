"use client";

import { useEffect, useEffectEvent, useState, useSyncExternalStore } from "react";

export const MOBILE_QUERY = "(max-width: 859px)";
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeMedia(query: string) {
  return (onChange: () => void) => {
    const mq = window.matchMedia(query);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  };
}

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    subscribeMedia(query),
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export function useIsMobile(): boolean {
  return useMediaQuery(MOBILE_QUERY);
}

export function useReducedMotion(override = false): boolean {
  return useMediaQuery(REDUCED_QUERY) || override;
}

export function useEscape(onEscape: () => void, active = true) {
  const handle = useEffectEvent(onEscape);
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handle();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);
}

export const SPY_OFFSET = 120;
export const SCROLL_OFFSET = 63;

export function useScrollSpy(ids: string[]) {
  const [state, setState] = useState({ active: ids[0] ?? "", progress: 0 });
  const key = ids.join("|");

  useEffect(() => {
    let raf: number | null = null;
    const measure = () => {
      raf = null;
      let active = ids[0] ?? "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= SPY_OFFSET) active = id;
      }
      const se = document.scrollingElement ?? document.documentElement;
      const max = Math.max(1, se.scrollHeight - se.clientHeight);
      const progress = Math.round((1000 * se.scrollTop) / max) / 10;
      setState((s) => (s.active === active && Math.abs(s.progress - progress) < 0.5 ? s : { active, progress }));
    };
    const onScroll = () => {
      if (raf == null) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf != null) cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return state;
}

export function scrollToSection(id: string, reduced: boolean) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET,
    behavior: reduced ? "auto" : "smooth",
  });
}

export function scrollToTop(reduced: boolean) {
  window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
}
