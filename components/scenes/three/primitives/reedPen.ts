/** Majuscule letterforms after P46's rounded hand, as pen paths in em units: x from 0, y from 0 at cap height to 1 at the baseline. */

export type Stroke =
  | { k: "L"; p: [number, number, number, number] }
  | { k: "A"; p: [number, number, number, number, number, number] }
  | {
      k: "C";
      p: [number, number, number, number, number, number, number, number];
    };

export interface Letter {
  width: number;
  strokes: Stroke[];
}

const L = (x0: number, y0: number, x1: number, y1: number): Stroke => ({
  k: "L",
  p: [x0, y0, x1, y1],
});
const A = (
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  a0: number,
  a1: number,
): Stroke => ({ k: "A", p: [cx, cy, rx, ry, a0, a1] });
const C = (
  x0: number,
  y0: number,
  ax: number,
  ay: number,
  bx: number,
  by: number,
  x1: number,
  y1: number,
): Stroke => ({ k: "C", p: [x0, y0, ax, ay, bx, by, x1, y1] });

const O = A(0.42, 0.5, 0.39, 0.5, -90, 270);
const LUNATE = A(0.42, 0.5, 0.39, 0.5, 38, 322);

export const LETTERS: Record<string, Letter> = {
  Α: {
    width: 0.84,
    strokes: [
      L(0.04, 1, 0.42, 0.02),
      L(0.42, 0.02, 0.8, 1),
      L(0.2, 0.62, 0.64, 0.6),
    ],
  },
  Δ: {
    width: 0.88,
    strokes: [
      L(0.06, 1, 0.43, 0.02),
      L(0.43, 0.02, 0.84, 1),
      L(0.02, 0.99, 0.88, 1),
    ],
  },
  Ε: { width: 0.78, strokes: [LUNATE, L(0.06, 0.5, 0.52, 0.49)] },
  Η: {
    width: 0.82,
    strokes: [
      L(0.1, 0.02, 0.1, 1),
      L(0.72, 0.02, 0.72, 1),
      L(0.1, 0.5, 0.72, 0.48),
    ],
  },
  Θ: { width: 0.84, strokes: [O, L(0.12, 0.5, 0.72, 0.5)] },
  Ι: { width: 0.24, strokes: [L(0.12, 0.02, 0.12, 1)] },
  Κ: {
    width: 0.76,
    strokes: [
      L(0.1, 0.02, 0.1, 1),
      L(0.68, 0.02, 0.12, 0.56),
      L(0.3, 0.42, 0.74, 1),
    ],
  },
  Λ: { width: 0.84, strokes: [L(0.04, 1, 0.42, 0.02), L(0.42, 0.02, 0.8, 1)] },
  Μ: {
    width: 0.98,
    strokes: [
      L(0.08, 1, 0.12, 0.02),
      L(0.12, 0.02, 0.48, 0.78),
      L(0.48, 0.78, 0.84, 0.02),
      L(0.84, 0.02, 0.9, 1),
    ],
  },
  Ν: {
    width: 0.86,
    strokes: [
      L(0.1, 1, 0.1, 0.02),
      L(0.1, 0.02, 0.76, 1),
      L(0.76, 1, 0.76, 0.02),
    ],
  },
  Ο: { width: 0.84, strokes: [O] },
  Π: {
    width: 0.9,
    strokes: [
      L(0.02, 0.04, 0.88, 0.03),
      L(0.16, 0.04, 0.16, 1),
      L(0.74, 0.03, 0.74, 1),
    ],
  },
  Ρ: {
    width: 0.7,
    strokes: [
      L(0.12, 0.02, 0.12, 1.24),
      C(0.12, 0.04, 0.82, -0.04, 0.82, 0.62, 0.12, 0.56),
    ],
  },
  Τ: { width: 0.76, strokes: [L(0, 0.04, 0.76, 0.03), L(0.38, 0.04, 0.38, 1)] },
  Υ: {
    width: 0.78,
    strokes: [
      L(0.04, 0.02, 0.39, 0.5),
      L(0.74, 0.02, 0.39, 0.5),
      L(0.39, 0.5, 0.39, 1),
    ],
  },
  Φ: {
    width: 0.92,
    strokes: [A(0.46, 0.5, 0.42, 0.32, -90, 270), L(0.46, -0.18, 0.46, 1.2)],
  },
  Χ: { width: 0.84, strokes: [L(0.04, 0.02, 0.8, 1), L(0.8, 0.02, 0.04, 1)] },
  Ω: {
    width: 1.04,
    strokes: [
      C(0.06, 0.16, -0.06, 0.8, 0.24, 1.1, 0.5, 0.62),
      C(0.5, 0.62, 0.78, 1.1, 1.08, 0.8, 0.96, 0.16),
    ],
  },
  Ϲ: { width: 0.78, strokes: [LUNATE] },
};

function at(s: Stroke, t: number): [number, number] {
  if (s.k === "L") {
    const [x0, y0, x1, y1] = s.p;
    return [x0 + (x1 - x0) * t, y0 + (y1 - y0) * t];
  }
  if (s.k === "A") {
    const [cx, cy, rx, ry, a0, a1] = s.p;
    const a = ((a0 + (a1 - a0) * t) * Math.PI) / 180;
    return [cx + Math.cos(a) * rx, cy + Math.sin(a) * ry];
  }
  const [x0, y0, ax, ay, bx, by, x1, y1] = s.p;
  const u = 1 - t;
  return [
    u * u * u * x0 + 3 * u * u * t * ax + 3 * u * t * t * bx + t * t * t * x1,
    u * u * u * y0 + 3 * u * u * t * ay + 3 * u * t * t * by + t * t * t * y1,
  ];
}

function length(s: Stroke): number {
  let len = 0;
  let prev = at(s, 0);
  for (let i = 1; i <= 32; i++) {
    const p = at(s, i / 32);
    len += Math.hypot(p[0] - prev[0], p[1] - prev[1]);
    prev = p;
  }
  return len;
}

/** Points along a stroke about `step` em apart, both ends included. */
export function strokePoints(s: Stroke, step: number): [number, number][] {
  const n = Math.max(1, Math.ceil(length(s) / step));
  return Array.from({ length: n + 1 }, (_, i) => at(s, i / n));
}

const NIB_W = 0.15;
const NIB_T = 0.055;
const NIB_ANGLE = (14 * Math.PI) / 180;

/** Writes one letter with a broad reed nib; returns its advance in pixels. */
export function penLetter(
  ctx: CanvasRenderingContext2D,
  ch: string,
  x: number,
  baseline: number,
  size: number,
  rand: () => number,
): number {
  const letter = LETTERS[ch];
  if (!letter) return size * 0.6;
  const slant = (rand() - 0.5) * 0.05;
  const step = 0.45 / size;
  for (const s of letter.strokes) {
    const wob = rand() * 6;
    const amp = 0.008 + rand() * 0.008;
    const pts = strokePoints(s, step);
    ctx.beginPath();
    pts.forEach(([px, py], i) => {
      const t = i / pts.length;
      const wx = Math.sin(t * 5 + wob) * amp;
      const wy = Math.cos(t * 4 + wob * 1.3) * amp;
      const cx = x + (px + wx + slant * (1 - py)) * size;
      const cy = baseline - size + (py + wy) * size;
      const press = 0.88 + 0.12 * Math.sin(t * Math.PI);
      const rx = (NIB_W / 2) * size * press;
      const ry = (NIB_T / 2) * size;
      ctx.moveTo(cx + rx * Math.cos(NIB_ANGLE), cy + rx * Math.sin(NIB_ANGLE));
      ctx.ellipse(cx, cy, rx, ry, NIB_ANGLE, 0, Math.PI * 2);
    });
    ctx.fill();
  }
  return letter.width * size;
}
