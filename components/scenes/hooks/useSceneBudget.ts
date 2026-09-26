"use client";

import { useEffect, useSyncExternalStore, type RefObject } from "react";

interface Slot {
  id: string;
  el: HTMLElement | null;
}

const alive = new Map<string, Slot>();
const listeners = new Set<() => void>();
let version = 0;

function notify() {
  version++;
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

function distanceFromViewport(el: HTMLElement | null): number {
  if (!el) return Number.POSITIVE_INFINITY;
  const r = el.getBoundingClientRect();
  return Math.abs(r.top + r.height / 2 - window.innerHeight / 2);
}

function request(id: string, el: HTMLElement | null, max: number): boolean {
  if (alive.has(id)) return true;
  if (alive.size < max) {
    alive.set(id, { id, el });
    notify();
    return true;
  }
  let farthest: Slot | null = null;
  let farthestDistance = -1;
  for (const slot of alive.values()) {
    const d = distanceFromViewport(slot.el);
    if (d > farthestDistance) {
      farthestDistance = d;
      farthest = slot;
    }
  }
  if (farthest && farthestDistance > distanceFromViewport(el)) {
    alive.delete(farthest.id);
    alive.set(id, { id, el });
    notify();
    return true;
  }
  return false;
}

function release(id: string) {
  if (alive.delete(id)) notify();
}

export function useSceneSlot(id: string, wants: boolean, ref: RefObject<HTMLElement | null>, max: number, retryKey = 0): boolean {
  const held = useSyncExternalStore(subscribe, () => alive.has(id), () => false);
  const tick = useSyncExternalStore(subscribe, () => version, () => 0);

  useEffect(() => {
    if (wants) request(id, ref.current, max);
    else release(id);
  }, [id, wants, ref, max, retryKey, tick]);

  useEffect(() => () => release(id), [id]);

  return held;
}
