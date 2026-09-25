"use client";

import { useEffect, useState, type RefObject } from "react";

export interface SceneVisibility {
  near: boolean;
  visible: boolean;
}

export function useSceneVisibility(ref: RefObject<HTMLElement | null>): SceneVisibility {
  const [state, setState] = useState<SceneVisibility>({ near: false, visible: false });

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const nearObs = new IntersectionObserver(
      ([e]) => setState((s) => (s.near === e.isIntersecting ? s : { ...s, near: e.isIntersecting })),
      { rootMargin: "100% 0px" },
    );
    const visObs = new IntersectionObserver(
      ([e]) => setState((s) => (s.visible === e.isIntersecting ? s : { ...s, visible: e.isIntersecting })),
      { rootMargin: "0px" },
    );
    nearObs.observe(el);
    visObs.observe(el);
    return () => {
      nearObs.disconnect();
      visObs.disconnect();
    };
  }, [ref]);

  return state;
}
