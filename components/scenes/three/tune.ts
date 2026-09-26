"use client";

import { useControls } from "leva";

export const TUNE = typeof window !== "undefined" && new URLSearchParams(window.location.search).has("tune");

type Schema = Record<string, number | { value: number; min?: number; max?: number; step?: number }>;
type Values<S extends Schema> = { [K in keyof S]: number };

function defaults<S extends Schema>(schema: S): Values<S> {
  const out = {} as Values<S>;
  for (const k in schema) {
    const v = schema[k];
    out[k] = typeof v === "number" ? v : v.value;
  }
  return out;
}

/** Live-tunable numbers: a leva panel when the page is opened with `?tune`, plain defaults otherwise. */
export function useTune<S extends Schema>(folder: string, schema: S): Values<S> {
  // TUNE is a page-lifetime constant, so the hook order never changes between renders.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return TUNE ? (useControls(folder, schema, { collapsed: true }) as Values<S>) : defaults(schema);
}
