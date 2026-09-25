import type { Segment } from "./types";

const MARK = /\[(\w+)\|([^\]]+)\]/g;

export function parseMarked(str: string): Segment[] {
  const out: Segment[] = [];
  let last = 0;
  for (const m of str.matchAll(MARK)) {
    if (m.index > last) out.push({ text: str.slice(last, m.index) });
    out.push({ key: m[1], text: m[2] });
    last = m.index + m[0].length;
  }
  if (last < str.length) out.push({ text: str.slice(last) });
  return out;
}

export function keysOf(verses: [number, string][]): string[] {
  const keys: string[] = [];
  for (const [, text] of verses) {
    for (const seg of parseMarked(text)) {
      if (seg.key && !keys.includes(seg.key)) keys.push(seg.key);
    }
  }
  return keys;
}
