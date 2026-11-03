import type { Glyph } from "./letterText";
import { LETTERS, penLetter } from "./reedPen";

/** A line's ink rectangle in UV space: [vTop, vBottom, uStart, uEnd]. */
export type Band = [number, number, number, number];

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function canvas(w: number, h: number) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;
  return { c, ctx };
}

const hsl = (h: number, s: number, l: number, a = 1) =>
  `hsla(${h},${s}%,${l}%,${a})`;

export function papyrusMaps(w: number, h: number, seed: number) {
  const r = rng(seed);
  const color = canvas(w, h);
  const bump = canvas(w, h);
  const g = color.ctx;
  const b = bump.ctx;
  const k = w / 2048;

  const base = g.createLinearGradient(0, 0, w, 0);
  base.addColorStop(0, hsl(38, 46, 62));
  base.addColorStop(0.5, hsl(40, 50, 68));
  base.addColorStop(1, hsl(37, 44, 61));
  g.fillStyle = base;
  g.fillRect(0, 0, w, h);
  b.fillStyle = "#808080";
  b.fillRect(0, 0, w, h);

  // The back layer runs vertically and shows faintly through the front.
  for (let x = 0; x < w; x += 2.5 * k) {
    const l = 52 + r() * 22;
    g.fillStyle = hsl(36, 40, l, 0.07);
    g.fillRect(x, 0, (1 + r() * 2) * k, h);
    b.fillStyle = r() > 0.5 ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
    b.fillRect(x, 0, 1.5 * k, h);
  }
  // Joins between glued sheets (kolleseis).
  for (let i = 1; i < 4; i++) {
    const x = (i / 4 + (r() - 0.5) * 0.05) * w;
    g.fillStyle = hsl(34, 42, 50, 0.16);
    g.fillRect(x, 0, 22 * k, h);
    b.fillStyle = "rgba(255,255,255,0.18)";
    b.fillRect(x, 0, 22 * k, h);
  }
  // Front fibres: long, thin, horizontal.
  const fibres = Math.round(16000 * k * (h / (w * 0.375)));
  for (let i = 0; i < fibres; i++) {
    const y = r() * h;
    const x = r() * w * 1.1 - w * 0.05;
    const len = (50 + r() * r() * 700) * k;
    const lw = (0.4 + r() * 1.4) * k;
    const light = r() > 0.5;
    g.strokeStyle = hsl(
      36 + r() * 6,
      38 + r() * 18,
      light ? 70 + r() * 12 : 44 + r() * 14,
      0.04 + r() * 0.08,
    );
    g.lineWidth = lw;
    g.beginPath();
    g.moveTo(x, y);
    g.lineTo(x + len, y + (r() - 0.5) * 3 * k);
    g.stroke();
    b.strokeStyle = light ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)";
    b.lineWidth = lw;
    b.beginPath();
    b.moveTo(x, y);
    b.lineTo(x + len, y);
    b.stroke();
  }
  // Age: soft stains and darker edges.
  for (let i = 0; i < 26; i++) {
    const x = r() * w;
    const y = r() * h;
    const rad = (40 + r() * 220) * k;
    const s = g.createRadialGradient(x, y, 0, x, y, rad);
    s.addColorStop(0, hsl(30, 45, 38, 0.05 + r() * 0.08));
    s.addColorStop(1, hsl(30, 45, 38, 0));
    g.fillStyle = s;
    g.fillRect(x - rad, y - rad, rad * 2, rad * 2);
  }
  const edge = (x0: number, y0: number, x1: number, y1: number) => {
    const e = g.createLinearGradient(x0, y0, x1, y1);
    e.addColorStop(0, hsl(28, 45, 30, 0.42));
    e.addColorStop(1, hsl(28, 45, 30, 0));
    g.fillStyle = e;
    g.fillRect(0, 0, w, h);
  };
  edge(0, 0, 0, 70 * k);
  edge(0, h, 0, h - 70 * k);

  // Frayed top and bottom edges, as alpha.
  g.globalCompositeOperation = "destination-out";
  g.fillStyle = "#000";
  for (const top of [true, false]) {
    const ph = r() * 100;
    g.beginPath();
    g.moveTo(0, top ? 0 : h);
    for (let x = 0; x <= w; x += 3 * k) {
      const d =
        (5 +
          Math.sin((x * 0.004) / k + ph) * 4 +
          Math.sin((x * 0.019) / k + ph * 2) * 2.5 +
          r() * 2.5) *
        k;
      g.lineTo(x, top ? d : h - d);
    }
    g.lineTo(w, top ? 0 : h);
    g.closePath();
    g.fill();
    for (let i = 0; i < 70; i++) {
      const x = r() * w;
      const len = (6 + r() * 26) * k;
      g.fillRect(x, top ? 0 : h - len, (1 + r() * 3) * k, len);
    }
  }
  g.globalCompositeOperation = "source-over";
  return { color: color.c, bump: bump.c };
}

/** Writes the scroll's lines with a reed pen; ink colour varies letter to letter. */
export function inkMap(
  w: number,
  h: number,
  lines: Glyph[][],
): { canvas: HTMLCanvasElement; bands: Band[] } {
  const r = rng(7);
  const { c, ctx } = canvas(w, h);
  const widest = Math.max(
    ...lines.map((l) =>
      l.reduce((sum, g) => sum + (LETTERS[g.ch]?.width ?? 0.6) + 0.16, 0),
    ),
  );
  const size = (w * 0.62) / widest;
  const lead = size * 1.55;
  const left = w * 0.15;
  const top = (h - lead * lines.length) / 2 + size * 1.05;
  const bands: Band[] = [];

  lines.forEach((line, row) => {
    const y = top + row * lead + (r() - 0.5) * size * 0.06;
    let x = left + (r() - 0.5) * size * 0.2;
    const start = x;
    let over: number | null = null;
    line.forEach((g, i) => {
      const s = size * (1 + (r() - 0.5) * 0.05);
      const faded = r() < 0.08;
      const l = faded ? 34 + r() * 8 : 9 + r() * 9;
      ctx.fillStyle = hsl(26, 45, l);
      if (g.over && over === null) over = x;
      x += penLetter(ctx, g.ch, x, y + (r() - 0.5) * size * 0.05, s, r);
      x += size * (0.13 + r() * 0.06);
      if (g.over && !line[i + 1]?.over && over !== null) {
        ctx.strokeStyle = hsl(26, 45, 12);
        ctx.lineWidth = size * 0.05;
        ctx.lineCap = "round";
        const oy = y - size * 1.2;
        ctx.beginPath();
        ctx.moveTo(over - size * 0.08, oy + size * 0.02);
        ctx.quadraticCurveTo((over + x) / 2, oy - size * 0.03, x, oy);
        ctx.stroke();
        over = null;
      }
    });
    bands.push([
      1 - (y - size * 1.35) / h,
      1 - (y + size * 0.35) / h,
      start / w,
      x / w,
    ]);
  });

  // Ink sits on fibre and wears: break it up a little.
  ctx.globalCompositeOperation = "destination-out";
  for (let i = 0; i < w * h * 0.006; i++) {
    ctx.fillStyle = `rgba(0,0,0,${0.2 + r() * 0.5})`;
    ctx.fillRect(r() * w, r() * h, 1 + r() * 5, 1);
  }
  ctx.globalCompositeOperation = "source-over";
  return { canvas: c, bands };
}

export function woodMaps(w: number, h: number) {
  const r = rng(3);
  const color = canvas(w, h);
  const rough = canvas(w, h);
  const g = color.ctx;
  const q = rough.ctx;
  g.fillStyle = hsl(26, 38, 14);
  g.fillRect(0, 0, w, h);
  q.fillStyle = "rgb(225,225,225)";
  q.fillRect(0, 0, w, h);
  const k = w / 2048;
  for (let i = 0; i < 900; i++) {
    const y0 = r() * h;
    const amp = (6 + r() * 30) * k;
    const freq = (0.002 + r() * 0.004) / k;
    const phase = r() * 10;
    const light = r() > 0.55;
    const lw = (0.6 + r() * 3) * k;
    g.strokeStyle = light
      ? hsl(28, 40, 22 + r() * 10, 0.12 + r() * 0.2)
      : hsl(24, 40, 6 + r() * 6, 0.18 + r() * 0.25);
    g.lineWidth = lw;
    q.strokeStyle = light ? "rgba(190,190,190,0.5)" : "rgba(245,245,245,0.5)";
    q.lineWidth = lw;
    for (const ctx of [g, q]) {
      ctx.beginPath();
      for (let x = 0; x <= w; x += 8 * k) {
        const y =
          y0 +
          Math.sin(x * freq + phase) * amp +
          Math.sin(x * freq * 3.1 + phase * 2) * amp * 0.25;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  }
  return { color: color.c, rough: rough.c };
}

export function clayMap(w: number, h: number) {
  const r = rng(11);
  const { c, ctx } = canvas(w, h);
  ctx.fillStyle = hsl(24, 34, 42);
  ctx.fillRect(0, 0, w, h);
  for (let i = 0; i < 260; i++) {
    const x = r() * w;
    const y = r() * h;
    const rad = 6 + r() * 40;
    const s = ctx.createRadialGradient(x, y, 0, x, y, rad);
    const l = r() > 0.5 ? 50 : 30;
    s.addColorStop(0, hsl(22, 45, l, 0.18));
    s.addColorStop(1, hsl(22, 45, l, 0));
    ctx.fillStyle = s;
    ctx.fillRect(x - rad, y - rad, rad * 2, rad * 2);
  }
  for (let i = 0; i < 2400; i++) {
    ctx.fillStyle = hsl(24, 30, r() > 0.5 ? 60 : 18, 0.25);
    ctx.fillRect(r() * w, r() * h, 1.2, 1.2);
  }
  return c;
}

/** The end of a rolled papyrus: a loose spiral of sheet edges. */
export function rollEndMap(size: number) {
  const r = rng(5);
  const { c, ctx } = canvas(size, size);
  const m = size / 2;
  ctx.fillStyle = hsl(34, 36, 42);
  ctx.fillRect(0, 0, size, size);
  ctx.strokeStyle = hsl(38, 48, 66);
  ctx.lineCap = "round";
  ctx.beginPath();
  const turns = 9;
  for (let a = 0; a < turns * Math.PI * 2; a += 0.05) {
    const rad = m * (0.08 + (0.9 * a) / (turns * Math.PI * 2));
    const x = m + Math.cos(a) * rad;
    const y = m + Math.sin(a) * rad;
    if (a === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.lineWidth = size * 0.028;
  ctx.stroke();
  for (let i = 0; i < 300; i++) {
    ctx.fillStyle = hsl(30, 30, r() > 0.5 ? 70 : 25, 0.2);
    ctx.fillRect(r() * size, r() * size, 2, 2);
  }
  return c;
}

export function contactShadow(size: number) {
  const { c, ctx } = canvas(size, size);
  const m = size / 2;
  const g = ctx.createRadialGradient(m, m, 0, m, m, m);
  g.addColorStop(0, "rgba(0,0,0,0.75)");
  g.addColorStop(0.45, "rgba(0,0,0,0.4)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return c;
}
