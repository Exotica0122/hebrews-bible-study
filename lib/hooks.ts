"use client";

import { useEffect, useEffectEvent, useState, useSyncExternalStore, type RefObject } from "react";

export const MOBILE_QUERY = "(max-width: 859px)";
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

const mediaSubscribers = new Map<string, (onChange: () => void) => () => void>();

function subscribeMedia(query: string) {
  let sub = mediaSubscribers.get(query);
  if (!sub) {
    sub = (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    };
    mediaSubscribers.set(query, sub);
  }
  return sub;
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

/** Tracks the active section in state and writes scroll progress straight to `barRef` to avoid re-rendering per tick. */
export function useScrollSpy(ids: string[], barRef: RefObject<HTMLElement | null>) {
  const [active, setActive] = useState(ids[0] ?? "");
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
      if (barRef.current) barRef.current.style.width = `${progress}%`;
      setActive((a) => (a === active ? a : active));
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

  return active;
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
