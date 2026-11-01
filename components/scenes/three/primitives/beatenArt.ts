// The relief drawing. Red raises the metal, green is scarlet enamel, blue is light.

import { smoothstep } from "./Timeline";

type Point = readonly [number, number];

let g: CanvasRenderingContext2D;

export function bindArt(ctx: CanvasRenderingContext2D) {
  g = ctx;
}

export function clearPlate(width: number, height: number) {
  g.setTransform(1, 0, 0, 1, 0, 0);
  g.globalAlpha = 1;
  g.globalCompositeOperation = "source-over";
  g.fillStyle = "#000";
  g.fillRect(0, 0, width, height);
}

const col = (h: number, s = 0, l = 0) =>
  `rgb(${Math.round(h * 255)},${Math.round(s * 255)},${Math.round(l * 255)})`;
const RAISED = (h: number) => col(h);
const SCARLET = col(0.72, 1);
const LIGHT = col(0, 0, 1);

const fill = (c: string | CanvasGradient) => {
  g.fillStyle = c;
};
const stroke = (c: string, w: number) => {
  g.strokeStyle = c;
  g.lineWidth = w;
  g.lineCap = "round";
  g.lineJoin = "round";
};
const rect = (x: number, y: number, w: number, h: number) =>
  g.fillRect(x, y, w, h);
const dot = (x: number, y: number, r: number) => {
  g.beginPath();
  g.arc(x, y, r, 0, Math.PI * 2);
  g.fill();
};
const poly = (pts: readonly Point[]) => {
  g.beginPath();
  pts.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y)));
  g.closePath();
  g.fill();
};
const line = (a: number, b: number, c: number, d: number) => {
  g.beginPath();
  g.moveTo(a, b);
  g.lineTo(c, d);
  g.stroke();
};
const oval = (x: number, y: number, rx: number, ry: number) => {
  g.beginPath();
  g.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
  g.fill();
};

export const rnd = (i: number) => {
  const s = Math.sin(i * 127.1) * 43758.5453;
  return s - Math.floor(s);
};

export function floor(y = 610) {
  fill(RAISED(0.16));
  rect(-4000, y, 9600, 12);
}

/** Draws after `at`, raised out of the plate over 1.4 s. */
export function rise(t: number, at: number, draw: () => void) {
  const v = smoothstep(at, at + 1.4, t);
  if (v <= 0) return;
  g.globalAlpha = v;
  draw();
  g.globalAlpha = 1;
}

export function withAlpha(alpha: number, draw: () => void) {
  g.globalAlpha = alpha;
  draw();
  g.globalAlpha = 1;
}

/** Keeps a drawing above the floor, so light stays out of the caption. */
export function aboveFloor(draw: () => void, y = 610) {
  g.save();
  g.beginPath();
  g.rect(-4000, -4000, 9600, 4000 + y);
  g.clip();
  draw();
  g.restore();
}

function zigzag(x: number, y: number, w: number, tooth: number, n: number) {
  fill(RAISED(0.95));
  for (let i = 0; i < n; i++) {
    const px = x + (w * i) / n;
    const pw = w / n;
    poly([
      [px, y],
      [px + pw / 2, y - tooth],
      [px + pw, y],
    ]);
  }
}

function rosette(x: number, y: number, r: number) {
  fill(RAISED(0.98));
  dot(x, y, r);
  fill(RAISED(0.55));
  dot(x, y, r * 0.62);
  fill(RAISED(0.98));
  dot(x, y, r * 0.28);
}

function cup(x: number, y: number, s: number) {
  fill(RAISED(0.92));
  poly([
    [x - 17 * s, y - 15 * s],
    [x - 8 * s, y - 6 * s],
    [x, y - 17 * s],
    [x + 8 * s, y - 6 * s],
    [x + 17 * s, y - 15 * s],
    [x + 11 * s, y + 10 * s],
    [x - 11 * s, y + 10 * s],
  ]);
}

/** Seven lamps on three pairs of arms, after Exodus 25:31–37. */
export function lampstand(x: number, y: number, s: number, t = 0) {
  const top = y - 345 * s;
  const arms = [
    [66, 88],
    [128, 148],
    [190, 208],
  ] as const;
  stroke(RAISED(0.78), 11 * s);
  for (const [rx, ry] of arms) {
    g.beginPath();
    g.ellipse(x, top, rx * s, ry * s, 0, 0, Math.PI);
    g.stroke();
  }
  fill(RAISED(0.78));
  rect(x - 7 * s, top, 14 * s, 345 * s);
  fill(RAISED(0.9));
  poly([
    [x - 66 * s, y],
    [x - 46 * s, y - 24 * s],
    [x + 46 * s, y - 24 * s],
    [x + 66 * s, y],
  ]);
  fill(RAISED(0.6));
  rect(x - 82 * s, y - 2 * s, 164 * s, 11 * s);
  for (const [rx, ry] of arms) {
    fill(RAISED(1));
    dot(x, top + ry * s, 12 * s);
    for (const side of [-1, 1]) {
      cup(x + side * rx * s, top, s);
      const ex = Math.cos(0.9) * rx * s;
      const ey = Math.sin(0.9) * ry * s;
      cup(x + side * ex, top + ey, s * 0.72);
    }
  }
  cup(x, top, s);
  cup(x, top + 165 * s, s * 0.75);
  [-190, -128, -66, 0, 66, 128, 190].forEach((dx, i) => {
    const fx = x + dx * s;
    const fy = top - 21 * s;
    const fh = (30 + 4 * Math.sin(t * 7 + i * 2)) * s;
    fill(RAISED(0.4));
    rect(fx - 15 * s, top - 22 * s, 30 * s, 6 * s);
    fill(LIGHT);
    poly([
      [fx, fy - fh],
      [fx + 9 * s, fy - 8 * s],
      [fx, fy],
      [fx - 9 * s, fy - 8 * s],
    ]);
  });
}

/** The table with its rim, its poles and two stacks of the bread of the Presence. */
export function table(x: number, y: number, s: number) {
  const w = 300 * s;
  const ty = y - 205 * s;
  fill(RAISED(0.42));
  for (const d of [-0.28, 0.28]) {
    poly([
      [x + d * w - 18 * s, ty],
      [x + d * w + 18 * s, ty],
      [x + d * w + 10 * s, y - 16 * s],
      [x + d * w - 10 * s, y - 16 * s],
    ]);
  }
  fill(RAISED(0.72));
  for (const d of [-0.43, 0.43]) {
    poly([
      [x + d * w - 22 * s, ty],
      [x + d * w + 22 * s, ty],
      [x + d * w + 12 * s, y],
      [x + d * w - 12 * s, y],
    ]);
  }
  fill(RAISED(0.86));
  rect(x - 245 * s, y - 138 * s, 490 * s, 13 * s);
  for (const d of [-0.43, 0.43]) {
    stroke(RAISED(1), 5 * s);
    g.beginPath();
    g.arc(x + d * w, y - 132 * s, 17 * s, 0, Math.PI * 2);
    g.stroke();
  }
  for (const d of [-0.27, 0.27]) {
    for (let i = 0; i < 6; i++) {
      fill(RAISED(i % 2 ? 0.62 : 0.92));
      g.beginPath();
      g.roundRect(
        x + d * w - 62 * s,
        ty - 15 * s - (i + 1) * 12 * s,
        124 * s,
        12 * s,
        5 * s,
      );
      g.fill();
    }
  }
  fill(RAISED(0.98));
  poly([
    [x - 15 * s, ty - 16 * s],
    [x + 15 * s, ty - 16 * s],
    [x + 22 * s, ty - 42 * s],
    [x + 10 * s, ty - 62 * s],
    [x + 10 * s, ty - 82 * s],
    [x - 10 * s, ty - 82 * s],
    [x - 10 * s, ty - 62 * s],
    [x - 22 * s, ty - 42 * s],
  ]);
  fill(RAISED(0.8));
  rect(x - w / 2 - 8 * s, ty, w + 16 * s, 28 * s);
  zigzag(x - w / 2 - 8 * s, ty, w + 16 * s, 19 * s, 22);
  fill(RAISED(1));
  for (let i = 0; i < 12; i++)
    dot(x - w / 2 + (w * (i + 0.5)) / 12, ty + 14 * s, 5 * s);
}

export function smoke(x: number, y: number, s: number, t: number, n = 3) {
  stroke(col(0, 0, 0.9), 6 * s);
  for (let k = 0; k < n; k++) {
    g.beginPath();
    for (let i = 0; i <= 26; i++) {
      const f = i / 26;
      const py = y - f * 230 * s;
      const px =
        x +
        (k - 1) * 9 * s * (1 + f) +
        Math.sin(f * 7 - t * 1.2 + k * 2) * 26 * s * f;
      if (i) g.lineTo(px, py);
      else g.moveTo(px, py);
    }
    g.stroke();
  }
}

/** The altar of incense, with its horns, rim and poles. */
export function altar(x: number, y: number, s: number) {
  const w = 110 * s;
  const h = 235 * s;
  const ty = y - h;
  fill(RAISED(0.6));
  rect(x - w * 0.68, y - 16 * s, w * 1.36, 16 * s);
  fill(RAISED(0.72));
  rect(x - w / 2, ty, w, h - 16 * s);
  fill(RAISED(0.9));
  rect(x - w * 0.36, ty + 30 * s, w * 0.72, h - 80 * s);
  fill(RAISED(0.5));
  rect(x - w * 0.3, ty + 36 * s, w * 0.6, h - 92 * s);
  rosette(x, ty + 82 * s, 25 * s);
  rosette(x, ty + 150 * s, 25 * s);
  fill(RAISED(0.86));
  rect(x - w * 0.7, ty - 22 * s, w * 1.4, 34 * s);
  zigzag(x - w * 0.7, ty - 22 * s, w * 1.4, 16 * s, 11);
  fill(RAISED(1));
  for (const d of [-0.72, -0.28, 0.28, 0.72]) {
    const b = x + d * w;
    poly([
      [b - 13 * s, ty - 22 * s],
      [b + 13 * s, ty - 22 * s],
      [b + d * 40 * s, ty - 66 * s],
    ]);
  }
  fill(RAISED(0.95));
  rect(x - 150 * s, ty + 20 * s, 300 * s, 10 * s);
}

function wing(x: number, top: number, s: number, side: number) {
  const root = x + side * 158 * s;
  const tip = x + side * 6 * s;
  fill(RAISED(0.84));
  g.beginPath();
  g.moveTo(root, top);
  g.quadraticCurveTo(x + side * 215 * s, top - 170 * s, tip, top - 150 * s);
  g.quadraticCurveTo(x + side * 110 * s, top - 96 * s, x + side * 112 * s, top);
  g.closePath();
  g.fill();
  stroke(RAISED(1), 3.5 * s);
  for (let i = 1; i < 9; i++) {
    const f = i / 9;
    line(
      x + side * (142 - f * 24) * s,
      top - 8 * s - f * 20 * s,
      x + side * (158 - f * 150) * s + side * 18 * s * Math.sin(f * 3.14),
      top - 34 * s - f * 116 * s,
    );
  }
}

/** The ark, its poles, and the cherubim with their wings over the mercy seat. */
export function ark(x: number, y: number, s: number) {
  const w = 340 * s;
  const h = 192 * s;
  const ty = y - h;
  fill(RAISED(0.62));
  rect(x - w * 0.5, y - 14 * s, w, 14 * s);
  fill(RAISED(0.76));
  rect(x - w * 0.47, ty, w * 0.94, h - 14 * s);
  stroke(RAISED(0.96), 3 * s);
  g.strokeRect(x - w * 0.43, ty + 34 * s, w * 0.86, h - 62 * s);
  fill(RAISED(0.96));
  rect(x - 278 * s, ty + 74 * s, 556 * s, 12 * s);
  for (const d of [-0.3, 0.3]) {
    stroke(RAISED(1), 6 * s);
    g.beginPath();
    g.arc(x + d * w, ty + 80 * s, 13 * s, 0, Math.PI * 2);
    g.stroke();
  }
  fill(RAISED(0.9));
  rect(x - w * 0.56, ty - 26 * s, w * 1.12, 28 * s);
  for (let i = 0; i < 24; i++) {
    fill(RAISED(i % 2 ? 0.55 : 1));
    const x0 = x - w * 0.56;
    const span = w * 1.12;
    poly([
      [x0 + (span * i) / 24, ty + 2 * s],
      [x0 + (span * (i + 1)) / 24, ty + 2 * s],
      [x0 + (span * (i + 0.5)) / 24, ty + 18 * s],
    ]);
  }
  wing(x, ty - 26 * s, s, -1);
  wing(x, ty - 26 * s, s, 1);
}

/** What was kept in the ark: the urn of manna, Aaron's budded staff and the two tablets. */
export function arkContents(x: number, y: number, s: number, alpha: number) {
  fill(RAISED(0.42));
  rect(x - 128 * s, y - 92 * s, 256 * s, 100 * s);
  withAlpha(alpha, () => {
    fill(RAISED(0.98));
    const ux = x - 86 * s;
    poly([
      [ux - 16 * s, y],
      [ux + 16 * s, y],
      [ux + 26 * s, y - 34 * s],
      [ux + 12 * s, y - 62 * s],
      [ux + 16 * s, y - 72 * s],
      [ux - 16 * s, y - 72 * s],
      [ux - 12 * s, y - 62 * s],
      [ux - 26 * s, y - 34 * s],
    ]);
    stroke(RAISED(0.98), 6 * s);
    line(x, y, x + 5 * s, y - 86 * s);
    stroke(RAISED(0.98), 4 * s);
    for (const [side, k] of [
      [-1, 22],
      [1, 38],
      [-1, 56],
      [1, 72],
    ]) {
      line(x + k * 0.05 * s, y - k * s, x + side * 20 * s, y - (k + 13) * s);
    }
    for (const d of [-0.5, 0.5]) {
      const tx = x + 88 * s + d * 44 * s;
      g.beginPath();
      g.roundRect(tx - 19 * s, y - 74 * s, 38 * s, 74 * s, [
        17 * s,
        17 * s,
        2 * s,
        2 * s,
      ]);
      g.fill();
    }
  });
}

/** The curtain on its bar, cherubim worked into every panel; `open` draws it to the sides. */
export function curtain(
  x: number,
  y: number,
  w: number,
  h: number,
  open = 0,
  panels = 6,
) {
  fill(RAISED(0.9));
  rect(x - 16, y - 12, w + 32, 12);
  const half = w / 2;
  const mw = half * (1 - 0.88 * open);
  const n = Math.ceil(panels / 2);
  const pw = mw / n;
  for (const ox of [x, x + w - mw]) {
    for (let i = 0; i < n; i++) {
      fill(RAISED(i % 2 ? 0.24 : 0.36));
      rect(ox + i * pw, y, pw + 1, h);
      fill(RAISED(0.62));
      rect(ox + i * pw, y, Math.max(2, pw * 0.08), h);
      if (pw <= 22) continue;
      const cx = ox + i * pw + pw / 2;
      const k = Math.min(pw / 70, 1);
      for (let j = 0; j < Math.floor(h / 120); j++) {
        const cy = y + 70 + j * 120;
        fill(RAISED(0.95));
        dot(cx, cy - 12 * k, 9 * k);
        poly([
          [cx - 8 * k, cy - 2 * k],
          [cx + 8 * k, cy - 2 * k],
          [cx + 12 * k, cy + 38 * k],
          [cx - 12 * k, cy + 38 * k],
        ]);
        for (const d of [-1, 1]) {
          poly([
            [cx + d * 6 * k, cy + 2 * k],
            [cx + d * 40 * k, cy - 34 * k],
            [cx + d * 34 * k, cy + 2 * k],
            [cx + d * 12 * k, cy + 20 * k],
          ]);
        }
      }
    }
  }
}

interface PersonOptions {
  high?: boolean;
  tone?: number;
  /** Which way an arm reaches out: -1 left, 1 right. */
  reach?: number;
}

export function person(
  x: number,
  y: number,
  h: number,
  { high = false, tone = 0.66, reach = 0 }: PersonOptions = {},
) {
  const k = h / 100;
  fill(RAISED(tone));
  poly([
    [x - 11 * k, y - 76 * k],
    [x + 11 * k, y - 76 * k],
    [x + 21 * k, y],
    [x - 21 * k, y],
  ]);
  fill(RAISED(Math.min(1, tone + 0.24)));
  dot(x, y - 88 * k, 10 * k);
  if (high) {
    fill(RAISED(1));
    rect(x - 11 * k, y - 104 * k, 22 * k, 9 * k);
    fill(RAISED(0.98));
    rect(x - 9 * k, y - 66 * k, 18 * k, 20 * k);
    stroke(RAISED(1), 3 * k);
    line(x, y - 40 * k, x, y - 4 * k);
  }
  if (reach) {
    fill(RAISED(0.8));
    poly([
      [x, y - 70 * k],
      [x + reach * 30 * k, y - 56 * k],
      [x + reach * 28 * k, y - 48 * k],
      [x, y - 58 * k],
    ]);
  }
}

/** Christ is only ever light on this plate: a soft shaft, never a human outline. */
export function lightShaft(x: number, y: number, h: number, alpha: number) {
  const k = h / 100;
  const w = 26 * k;
  const top = y - 104 * k;
  g.save();
  g.globalAlpha = alpha;
  g.globalCompositeOperation = "lighter";
  const halo = g.createRadialGradient(x, y - 48 * k, 4, x, y - 48 * k, 120 * k);
  halo.addColorStop(0, col(0, 0, 0.75));
  halo.addColorStop(1, col(0, 0, 0));
  fill(halo);
  dot(x, y - 48 * k, 120 * k);
  const shaft = g.createLinearGradient(x - w, 0, x + w, 0);
  shaft.addColorStop(0, col(0, 0, 0));
  shaft.addColorStop(0.5, col(0, 0, 1));
  shaft.addColorStop(1, col(0, 0, 0));
  fill(shaft);
  rect(x - w, top, w * 2, y - top);
  g.restore();
}

export function glow(x: number, y: number, r: number, alpha: number) {
  g.save();
  g.globalCompositeOperation = "lighter";
  g.globalAlpha = alpha;
  const q = g.createRadialGradient(x, y, 0, x, y, r);
  q.addColorStop(0, col(0, 0, 1));
  q.addColorStop(0.35, col(0, 0, 0.6));
  q.addColorStop(1, col(0, 0, 0));
  fill(q);
  dot(x, y, r);
  g.restore();
}

export function lightRing(x: number, y: number, r: number, alpha: number) {
  g.save();
  g.globalCompositeOperation = "lighter";
  g.globalAlpha = alpha;
  stroke(LIGHT, 8);
  g.beginPath();
  g.arc(x, y, r, 0, Math.PI * 2);
  g.stroke();
  g.restore();
}

export function scarletDrop(x: number, y: number, r: number) {
  fill(SCARLET);
  g.beginPath();
  g.arc(x, y, r, 0, Math.PI);
  g.quadraticCurveTo(x - r * 0.4, y - r * 1.2, x, y - r * 2.2);
  g.quadraticCurveTo(x + r * 0.4, y - r * 1.2, x + r, y);
  g.fill();
}

export function scarletRect(x: number, y: number, w: number, h: number) {
  fill(SCARLET);
  rect(x, y, w, h);
}

export function scarletOval(x: number, y: number, rx: number, ry: number) {
  fill(SCARLET);
  oval(x, y, rx, ry);
}

export function scarletDot(x: number, y: number, r: number) {
  fill(SCARLET);
  dot(x, y, r);
}

/** A row of beaten tally marks, one for every sacrifice. */
export function tally(
  x: number,
  y: number,
  count: number,
  perRow: number,
  gapX: number,
  gapY: number,
  height: number,
) {
  fill(RAISED(0.84));
  for (let i = 0; i < count; i++)
    rect(
      x + (i % perRow) * gapX,
      y + Math.floor(i / perRow) * gapY,
      Math.max(3, gapX * 0.42),
      height,
    );
}

/** A stone pillar for one of the twelve tribes. */
export function pillar(x: number, y: number, h: number) {
  fill(RAISED(0.5));
  poly([
    [x - 16, y],
    [x - 11, y - h],
    [x + 11, y - h],
    [x + 16, y],
  ]);
  fill(RAISED(0.68));
  rect(x - 16, y - h - 8, 32, 10);
}

/** The book of the covenant lying open on its stand. */
export function book(x: number, y: number) {
  fill(RAISED(0.86));
  poly([
    [x - 100, y],
    [x - 80, y - 110],
    [x + 80, y - 110],
    [x + 100, y],
  ]);
  fill(RAISED(1));
  poly([
    [x - 86, y - 110],
    [x, y - 94],
    [x + 86, y - 110],
    [x + 86, y - 140],
    [x, y - 124],
    [x - 86, y - 140],
  ]);
  stroke(RAISED(0.4), 3);
  for (let i = 0; i < 4; i++) {
    line(x - 72, y - 127 + i * 6, x - 10, y - 115 + i * 6);
    line(x + 10, y - 115 + i * 6, x + 72, y - 127 + i * 6);
  }
}

export function bowl(x: number, y: number) {
  fill(RAISED(1));
  g.beginPath();
  g.ellipse(x, y, 36, 12, 0, 0, Math.PI);
  g.fill();
  fill(SCARLET);
  g.beginPath();
  g.ellipse(x, y + 1, 30, 8, 0, 0, Math.PI);
  g.fill();
}

export function hyssop(x: number, y: number, angle: number) {
  stroke(RAISED(0.95), 6);
  line(x, y, x - 72 * Math.cos(angle), y - 72 * Math.sin(angle));
}
