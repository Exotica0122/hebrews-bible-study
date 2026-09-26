"use client";

import { useEffect, useState } from "react";

export type GpuTier = 0 | 1 | 2 | 3;

let cached: GpuTier | null = null;
let pending: Promise<GpuTier> | null = null;

function override(): GpuTier | null {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("gpu");
  if (raw !== null && /^[0-3]$/.test(raw)) return Number(raw) as GpuTier;
  if (params.has("scenetest")) return 2;
  return null;
}

function detect(): Promise<GpuTier> {
  if (cached !== null) return Promise.resolve(cached);
  if (pending) return pending;
  const forced = override();
  if (forced !== null) {
    cached = forced;
    return Promise.resolve(forced);
  }
  pending = import("detect-gpu")
    .then(({ getGPUTier }) => getGPUTier({ benchmarksURL: "/benchmarks" }))
    .then((r) => (cached = Math.max(0, Math.min(3, r.tier)) as GpuTier))
    .catch(() => (cached = 1));
  return pending;
}

/** GPU tier 0–3 from detect-gpu (null until known). Tier 0 keeps the CSS scenes; tier 3 enables post-processing. */
export function useGpuTier(): GpuTier | null {
  const [tier, setTier] = useState<GpuTier | null>(cached);
  useEffect(() => {
    let live = true;
    detect().then((t) => {
      if (live) setTier(t);
    });
    return () => {
      live = false;
    };
  }, []);
  return tier;
}

export const effectsForTier = (tier: GpuTier | null) => tier === 3;
