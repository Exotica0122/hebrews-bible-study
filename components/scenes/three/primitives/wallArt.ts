// The shadow drawing. Red casts a shadow, green is fire, blue is true light.

type Point = readonly [number, number];

export const FLOOR = 610;

let g: CanvasRenderingContext2D;

export function bindArt(ctx: CanvasRenderingContext2D) {
  g = ctx;
}

export function clearWall(width: number, height: number) {
  g.setTransform(1, 0, 0, 1, 0, 0);
  g.globalAlpha = 1;
  g.globalCompositeOperation = "source-over";
  g.fillStyle = "#000";
  g.fillRect(0, 0, width, height);
}

const col = (h: number, s = 0, l = 0) =>
  `rgb(${Math.round(h * 255)},${Math.round(s * 255)},${Math.round(l * 255)})`;
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
const rnd = (i: number) => {
  const n = Math.sin(i * 127.1) * 43758.5453;
  return n - Math.floor(n);
};

/** A closed outline, smoothed through the midpoints of its control points, with a straight edge back to the start. */
function blob(pts: readonly Point[]) {
  g.beginPath();
  g.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length - 1; i++) {
    const [a, b] = pts[i];
    const [c, d] = pts[i + 1];
    g.quadraticCurveTo(a, b, (a + c) / 2, (b + d) / 2);
  }
  const [lx, ly] = pts[pts.length - 1];
  g.lineTo(lx, ly);
  g.closePath();
  g.fill();
}
function curve(a: Point, b: Point, c: Point) {
  g.beginPath();
  g.moveTo(a[0], a[1]);
  g.quadraticCurveTo(b[0], b[1], c[0], c[1]);
  g.stroke();
}

export function withAlpha(alpha: number, draw: () => void) {
  if (alpha <= 0) return;
  g.save();
  g.globalAlpha *= Math.min(alpha, 1);
  draw();
  g.restore();
}

interface PersonOptions {
  tone?: number;
  /** 1 faces right, -1 faces left. */
  face?: number;
  /** Arm from 0, resting, to 1, raised. */
  lift?: number;
  priest?: boolean;
  carry?: boolean;
  /** Draws the arm; set it for the whole loop on anyone whose arm moves. */
  arm?: boolean;
}

export function person(x: number, y: number, h: number, o: PersonOptions = {}) {
  const {
    tone = 0.72,
    face = 1,
    lift = 0,
    priest = false,
    carry = false,
    arm = false,
  } = o;
  const k = h / 100;
  const P = (a: number, b: number): Point => [x + face * a * k, y - b * k];
  fill(col(tone));
  blob([
    P(-20, 0),
    P(-19, 20),
    P(-14, 46),
    P(-13, 66),
    P(-10, 76),
    P(-8, 87),
    P(-5, 97),
    P(2, 100),
    P(7, 95),
    P(9, 88),
    P(7, 82),
    P(5, 78),
    P(10, 71),
    P(13, 46),
    P(16, 20),
    P(21, 0),
  ]);
  if (priest) {
    const [, top] = P(0, 101);
    g.beginPath();
    g.ellipse(x, top, 9.5 * k, 6.5 * k, 0, 0, 7);
    g.fill();
    rect(x - 8 * k, top - 9 * k, 16 * k, 6 * k);
  }
  if (!arm && !carry) return;
  const a = lift * 1.15 - 0.28;
  const ex = 18 * Math.cos(a);
  const ey = 18 * Math.sin(a);
  const hx = 37 * Math.cos(a);
  const hy = 37 * Math.sin(a);
  blob([
    P(-3, 73),
    P(6, 74),
    P(6 + ex, 72 + ey),
    P(5 + hx, 70 + hy),
    P(7 + hx, 67 + hy),
    P(5 + hx * 0.72, 60 + hy * 0.72),
    P(3 + ex, 57 + ey),
    P(1, 58),
  ]);
  if (carry) {
    fill(col(1));
    const [bx, by] = P(10 + hx, 71 + hy);
    dot(bx, by, 7 * k);
  }
}

/** Christ is shown only as light: a soft shaft, never a human outline. */
export function lightShaft(x: number, y: number, h: number, alpha: number) {
  const k = h / 100;
  const w = 34 * k;
  const top = y - 112 * k;
  withAlpha(alpha, () => {
    g.globalCompositeOperation = "lighter";
    const halo = g.createRadialGradient(
      x,
      y - 56 * k,
      4,
      x,
      y - 56 * k,
      135 * k,
    );
    halo.addColorStop(0, col(0, 0, 0.75));
    halo.addColorStop(1, col(0, 0, 0));
    fill(halo);
    dot(x, y - 56 * k, 135 * k);
    const shaft = g.createLinearGradient(x - w, 0, x + w, 0);
    shaft.addColorStop(0, col(0, 0, 0));
    shaft.addColorStop(0.5, col(0, 0, 1));
    shaft.addColorStop(1, col(0, 0, 0));
    fill(shaft);
    rect(x - w, top, w * 2, y - top);
  });
}

export function glow(x: number, y: number, r: number, alpha: number) {
  withAlpha(alpha, () => {
    g.globalCompositeOperation = "lighter";
    const q = g.createRadialGradient(x, y, 0, x, y, r);
    q.addColorStop(0, col(0, 0, 1));
    q.addColorStop(0.35, col(0, 0, 0.55));
    q.addColorStop(1, col(0, 0, 0));
    fill(q);
    dot(x, y, r);
  });
}

function flame(x: number, y: number, h: number, t: number, value: number) {
  fill(col(0, value));
  const sway = Math.sin(t * 5) * 0.08 * h;
  blob([
    [x - 0.26 * h, y],
    [x - 0.24 * h, y - 0.34 * h],
    [x - 0.08 * h, y - 0.56 * h],
    [x + sway, y - 1.04 * h],
    [x + 0.12 * h, y - 0.5 * h],
    [x + 0.25 * h, y - 0.3 * h],
    [x + 0.26 * h, y],
  ]);
}

export function fireLine(
  x0: number,
  x1: number,
  y: number,
  height: (u: number, i: number) => number,
  t: number,
) {
  const n = Math.round((x1 - x0) / 34);
  for (const [layer, value] of [
    [0, 0.42],
    [1, 0.95],
  ]) {
    for (let i = 0; i <= n; i++) {
      const u = i / n;
      const h =
        height(u, i) *
        (layer ? 0.62 : 1) *
        (0.86 + 0.2 * Math.sin(t * 7 + i * 2.3 + layer));
      if (h < 3) continue;
      flame(x0 + u * (x1 - x0) + rnd(i + layer * 9) * 16, y, h, t + i, value);
    }
  }
}

export function altar(
  x: number,
  y: number,
  s: number,
  burn: number,
  t: number,
) {
  const w = 240 * s;
  const h = 158 * s;
  const ty = y - h;
  fill(col(0.62));
  poly([
    [x - w * 0.5, ty],
    [x + w * 0.5, ty],
    [x + w * 0.54, y],
    [x - w * 0.54, y],
  ]);
  fill(col(0.82));
  rect(x - w * 0.57, ty - 12 * s, w * 1.14, 15 * s);
  rect(x - w * 0.6, ty + 58 * s, w * 1.2, 11 * s);
  fill(col(0));
  for (let r = 0; r < 2; r++)
    for (let i = 0; i < 9; i++)
      rect(
        x - w * 0.43 + (i * w * 0.86) / 9 + 3 * s,
        ty + 12 * s + r * 20 * s,
        13 * s,
        12 * s,
      );
  fill(col(0.82));
  for (const d of [-1, 1]) {
    const b = x + d * w * 0.57;
    blob([
      [b - d * 30 * s, ty - 10 * s],
      [b - d * 26 * s, ty - 30 * s],
      [b - d * 8 * s, ty - 40 * s],
      [b + d * 10 * s, ty - 62 * s],
      [b + d * 2 * s, ty - 34 * s],
      [b + d * 2 * s, ty - 10 * s],
    ]);
  }
  if (burn > 0.02)
    fireLine(
      x - w * 0.34,
      x + w * 0.34,
      ty - 10 * s,
      (u) => 92 * s * burn * Math.sin(u * Math.PI),
      t,
    );
}

export function smoke(
  x: number,
  y: number,
  s: number,
  t: number,
  alpha: number,
) {
  if (alpha <= 0) return;
  g.save();
  g.globalCompositeOperation = "lighter";
  for (let i = 0; i < 46; i++) {
    const f = (i / 46 + t * 0.035) % 1;
    const px =
      x + Math.sin(f * 6 + t * 0.4) * 34 * s * f + (rnd(i) - 0.5) * 36 * s * f;
    const py = y - f * 290 * s;
    const r = (16 + 60 * f) * s;
    const q = g.createRadialGradient(px, py, 0, px, py, r);
    q.addColorStop(0, col(0.13 * alpha * (1 - f) * Math.min(1, f * 7)));
    q.addColorStop(1, col(0));
    fill(q);
    dot(px, py, r);
  }
  g.restore();
}

export function bull(x: number, y: number, s: number, d = 1) {
  const P = (a: number, b: number): Point => [x + d * a * s, y - b * s];
  const tone = col(0.66);
  fill(tone);
  blob([
    P(-58, 0),
    P(-68, 34),
    P(-112, 66),
    P(-118, 104),
    P(-92, 118),
    P(-34, 116),
    P(30, 124),
    P(48, 138),
    P(78, 126),
    P(100, 130),
    P(124, 114),
    P(142, 90),
    P(132, 78),
    P(114, 82),
    P(92, 66),
    P(66, 46),
    P(54, 0),
    P(40, 0),
    P(38, 42),
    P(0, 46),
    P(-44, 48),
    P(-48, 0),
  ]);
  poly([P(-90, 44), P(-80, 0), P(-72, 0), P(-74, 44)]);
  poly([P(30, 44), P(26, 0), P(18, 0), P(20, 44)]);
  stroke(tone, 6 * s);
  curve(P(-114, 104), P(-138, 62), P(-128, 26));
  curve(P(102, 128), P(92, 158), P(66, 158));
  curve(P(112, 124), P(128, 150), P(118, 166));
}

export function goat(x: number, y: number, s: number, d = 1) {
  const P = (a: number, b: number): Point => [x + d * a * s, y - b * s];
  const tone = col(0.6);
  fill(tone);
  blob([
    P(-44, 0),
    P(-50, 34),
    P(-70, 54),
    P(-68, 74),
    P(-40, 80),
    P(-6, 76),
    P(22, 82),
    P(44, 102),
    P(58, 120),
    P(74, 112),
    P(90, 96),
    P(80, 90),
    P(68, 90),
    P(62, 72),
    P(52, 76),
    P(38, 50),
    P(34, 0),
    P(26, 0),
    P(22, 38),
    P(-20, 40),
    P(-36, 38),
    P(-38, 0),
  ]);
  stroke(tone, 5 * s);
  curve(P(52, 118), P(34, 160), P(-6, 138));
  curve(P(-66, 74), P(-78, 92), P(-72, 98));
}

export function scroll(x: number, y: number, w: number, open: number) {
  const half = (w / 2) * open + 22;
  const h = 170;
  fill(col(0.92));
  rect(x - half, y - h, half * 2, h);
  if (open > 0.1) {
    stroke(col(0.1), 4);
    for (let i = 0; i < 8; i++) {
      const line = y - h + 24 + i * 19;
      for (const [a, b] of [
        [x - half + 26, x - 14],
        [x + 14, x + half - 26],
      ]) {
        g.beginPath();
        g.moveTo(a, line);
        g.lineTo(b, line);
        g.stroke();
      }
    }
  }
  fill(col(0.72));
  for (const d of [-1, 1]) rect(x + d * half - 16, y - h - 12, 32, h + 24);
}

export function niche(x: number, y: number, w: number, top: number, a: number) {
  withAlpha(a, () => {
    fill(col(0.74));
    g.beginPath();
    g.moveTo(x - w / 2, y);
    g.lineTo(x - w / 2, top + w / 2);
    g.arc(x, top + w / 2, w / 2, Math.PI, 0);
    g.lineTo(x + w / 2, y);
    g.closePath();
    g.fill();
  });
}

export function throne(x: number, y: number, s: number) {
  fill(col(0.76));
  rect(x - 96 * s, y - 318 * s, 192 * s, 318 * s);
  fill(col(0.46));
  rect(x - 70 * s, y - 296 * s, 140 * s, 190 * s);
  fill(col(0.94));
  rect(x - 118 * s, y - 112 * s, 236 * s, 22 * s);
  fill(col(0.6));
  rect(x - 104 * s, y - 92 * s, 208 * s, 92 * s);
  fill(col(0.92));
  rect(x - 150 * s, y - 16 * s, 300 * s, 16 * s);
}

/** Christ is shown only as light: the seat fills, with no figure on it. */
export function lightSeat(x: number, y: number, s: number, a: number) {
  withAlpha(a, () => {
    g.globalCompositeOperation = "lighter";
    const halo = g.createRadialGradient(
      x,
      y - 165 * s,
      4,
      x,
      y - 165 * s,
      240 * s,
    );
    halo.addColorStop(0, col(0, 0, 0.85));
    halo.addColorStop(1, col(0, 0, 0));
    fill(halo);
    dot(x, y - 165 * s, 240 * s);
    fill(col(0, 0, 1));
    rect(x - 70 * s, y - 282 * s, 140 * s, 176 * s);
  });
}

export function footstool(x: number, y: number, w: number, a: number) {
  withAlpha(a, () => {
    fill(col(0.9));
    rect(x - w / 2, y - 40, w, 12);
    rect(x - w / 2 + 8, y - 30, 10, 30);
    rect(x + w / 2 - 18, y - 30, 10, 30);
  });
}

export function curtain(
  x: number,
  y: number,
  w: number,
  h: number,
  open: number,
) {
  const half = w / 2;
  const mw = half * (1 - 0.84 * open);
  const n = 4;
  const pw = mw / n;
  fill(col(0.95));
  rect(x - 22, y - 14, w + 44, 14);
  for (const ox of [x, x + w - mw]) {
    for (let i = 0; i < n; i++) {
      fill(col(i % 2 ? 0.34 : 0.5));
      rect(ox + i * pw, y, pw + 1, h);
      fill(col(0.72));
      rect(ox + i * pw, y, Math.max(2, pw * 0.1), h);
    }
  }
}

/** The way of light through the curtain, along the ledge toward the viewer. */
export function way(x: number, y: number, a: number, length = 250) {
  const light = g.createLinearGradient(0, y, 0, y + length);
  light.addColorStop(0, col(0, 0, 0.8 * a));
  light.addColorStop(1, col(0, 0, 0));
  fill(light);
  const spread = length * 1.2;
  poly([
    [x - 44, y],
    [x + 44, y],
    [x + spread, y + length],
    [x - spread, y + length],
  ]);
}

export function tiers() {
  for (let r = 0; r < 4; r++) {
    const y = 166 + r * 62;
    const rx = 740 - r * 70;
    const ry = 70;
    stroke(col(0.5 - r * 0.05), 22);
    g.beginPath();
    g.ellipse(800, y, rx, ry, 0, 0.06, Math.PI - 0.06);
    g.stroke();
    const n = 26 - r * 4;
    for (let i = 0; i <= n; i++) {
      const u = 0.1 + (i / n) * (Math.PI - 0.2);
      const px = 800 + Math.cos(u) * rx;
      const py = y + Math.sin(u) * ry - 12;
      fill(col(0.72 - r * 0.05));
      dot(px, py - 16, 8.5);
      poly([
        [px - 11, py - 7],
        [px + 11, py - 7],
        [px + 13, py + 12],
        [px - 13, py + 12],
      ]);
    }
  }
}

export function bars(x: number, y: number, w: number, h: number) {
  fill(col(0.42));
  rect(x - 16, y - 16, w + 32, h + 32);
  fill(col(0));
  rect(x, y, w, h);
  fill(col(0.8));
  for (let i = 1; i < 6; i++) rect(x + (w * i) / 6 - 4, y, 8, h);
  rect(x, y + h * 0.46, w, 8);
}
