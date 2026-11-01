// The wash drawing. Red is how dark the ink lies, green warms it toward earth, blue keeps the paper bare.

type Point = readonly [number, number];

export const FLOOR = 660;

const WIDE = 4200;
const LEFT = -1300;

let g: CanvasRenderingContext2D;

export function bindArt(ctx: CanvasRenderingContext2D) {
  g = ctx;
}

export function clearPaper(width: number, height: number) {
  g.setTransform(1, 0, 0, 1, 0, 0);
  g.globalAlpha = 1;
  g.globalCompositeOperation = "source-over";
  g.fillStyle = "#000";
  g.fillRect(0, 0, width, height);
}

const col = (v: number, w = 0, l = 0, a = 1) =>
  `rgba(${Math.round(v * 255)},${Math.round(w * 255)},${Math.round(l * 255)},${a})`;
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
const curve = (a: Point, b: Point, c: Point) => {
  g.beginPath();
  g.moveTo(a[0], a[1]);
  g.quadraticCurveTo(b[0], b[1], c[0], c[1]);
  g.stroke();
};
const line = (a: number, b: number, c: number, d: number) => {
  g.beginPath();
  g.moveTo(a, b);
  g.lineTo(c, d);
  g.stroke();
};
const poly = (pts: readonly Point[]) => {
  g.beginPath();
  pts.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y)));
  g.closePath();
  g.fill();
};
const ellipse = (x: number, y: number, rx: number, ry: number, a = 0) => {
  g.beginPath();
  g.ellipse(x, y, rx, ry, a, 0, Math.PI * 2);
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

export function soaked(alpha: number, draw: () => void) {
  if (alpha <= 0) return;
  g.save();
  g.globalAlpha *= Math.min(alpha, 1);
  draw();
  g.restore();
}

export function band(y0: number, y1: number, v0: number, v1: number, w = 0) {
  const q = g.createLinearGradient(0, y0, 0, y1);
  q.addColorStop(0, col(v0, w));
  q.addColorStop(1, col(v1, w));
  fill(q);
  rect(LEFT, y0, WIDE, y1 - y0);
}

function puff(
  x: number,
  y: number,
  rx: number,
  ry: number,
  v: number,
  a: number,
) {
  g.save();
  g.translate(x, y);
  g.scale(rx, ry);
  const q = g.createRadialGradient(0, 0, 0, 0, 0, 1);
  q.addColorStop(0, col(v, 0, 0, a));
  q.addColorStop(1, col(v, 0, 0, 0));
  fill(q);
  dot(0, 0, 1);
  g.restore();
}

export function sky(v: number, t: number, n = 16) {
  band(0, 470, v * 0.5, v * 0.25);
  for (let i = 0; i < n; i++) {
    const drift = (rnd(i) * 3600 + t * (6 + rnd(i + 9) * 8)) % 3600;
    puff(
      LEFT + drift,
      60 + rnd(i + 3) * 280,
      190 + rnd(i + 5) * 240,
      44 + rnd(i + 7) * 70,
      v,
      0.75,
    );
  }
}

export function ridge(
  seed: number,
  y: number,
  amp: number,
  v: number,
  drop = 180,
  w = 0,
) {
  const q = g.createLinearGradient(0, y - amp, 0, y + drop);
  q.addColorStop(0, col(v, w, 0, 1));
  q.addColorStop(0.5, col(v, w, 0, 0.7));
  q.addColorStop(1, col(v, w, 0, 0));
  fill(q);
  g.beginPath();
  g.moveTo(LEFT, y + drop);
  for (let x = LEFT; x <= LEFT + WIDE; x += 18) {
    const s =
      Math.sin(x * 0.0041 + seed) * 0.55 +
      Math.sin(x * 0.0127 + seed * 2.3) * 0.3 +
      Math.sin(x * 0.031 + seed * 4.1) * 0.15;
    g.lineTo(x, y - amp * (0.5 + 0.5 * s));
  }
  g.lineTo(LEFT + WIDE, y + drop);
  g.closePath();
  g.fill();
}

export function sea(y0: number, y1: number, v0: number, v1: number, t: number) {
  band(y0, y1, v0, v1);
  stroke(col(v0 * 0.55, 0, 0, 0.7), 3);
  for (let i = 0; i < 70; i++) {
    const y = y0 + 6 + rnd(i) * (y1 - y0 - 6);
    const x = LEFT + ((rnd(i + 4) * WIDE + t * 10 * (1 + rnd(i))) % WIDE);
    line(x, y, x + 50 + rnd(i + 8) * 170, y);
  }
}

export function light(x: number, y: number, r: number, a: number) {
  if (a <= 0) return;
  g.save();
  g.globalCompositeOperation = "lighter";
  const q = g.createRadialGradient(x, y, 0, x, y, r);
  q.addColorStop(0, col(0, 0, a));
  q.addColorStop(1, col(0));
  fill(q);
  dot(x, y, r);
  g.restore();
}

export function person(
  x: number,
  y: number,
  h: number,
  { v = 0.96, face = 1, staff = false } = {},
) {
  const k = h / 100;
  const P = (a: number, b: number): Point => [x + face * a * k, y - b * k];
  fill(col(v));
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
  if (staff) {
    stroke(col(v), 3 * k);
    const [a, b] = P(24, 0);
    const [c, d] = P(28, 112);
    line(a, b, c, d);
  }
}

export function boat(x: number, y: number, s: number, tilt: number) {
  g.save();
  g.translate(x, y);
  g.rotate(tilt);
  g.scale(s, s);
  fill(col(0.96));
  blob([
    [-118, -22],
    [-92, 12],
    [-40, 24],
    [52, 24],
    [98, 8],
    [126, -28],
  ]);
  stroke(col(0.96), 5);
  line(-6, -18, -6, -150);
  line(-6, -142, 58, -40);
  line(-6, -142, -74, -38);
  g.restore();
}

export function rain(
  x0: number,
  x1: number,
  y0: number,
  y1: number,
  n: number,
  t: number,
  a = 0.6,
) {
  stroke(col(0.64, 0, 0, a), 2.4);
  const h = y1 - y0;
  for (let i = 0; i < n; i++) {
    const x = x0 + rnd(i) * (x1 - x0);
    const y = y0 + ((rnd(i + 70) * h + t * 240) % h);
    const l = 34 + rnd(i + 9) * 46;
    line(x, y, x - l * 0.22, y + l);
  }
}

export function headland(pts: readonly Point[], v: number, w = 0.25) {
  fill(col(v, w));
  blob(pts);
}

export function stone(x: number, y: number, w: number, h: number, v: number) {
  fill(col(v, 0.24));
  rect(x, y, w, h);
  stroke(col(0.96, 0.2), 3);
  g.strokeRect(x, y, w, h);
  stroke(col(0.96, 0.2, 0, 0.5), 2);
  line(x + w * 0.3, y + 6, x + w * 0.36, y + h * 0.6);
}

/** One tall stalk of ripe grain with a bowed ear; `up` runs from 0 to 1 as it grows. */
export function grain(
  x: number,
  base: number,
  h: number,
  sway: number,
  up: number,
) {
  if (up <= 0) return;
  const height = h * up;
  const tipX = x + sway + height * 0.08;
  const tipY = base - height;
  stroke(col(0.86, 0.5), 5);
  curve([x, base], [x - 4, base - height * 0.6], [tipX, tipY]);
  stroke(col(0.8, 0.5), 4);
  curve(
    [x, base - height * 0.3],
    [x + 26, base - height * 0.46],
    [x + 46, base - height * 0.32],
  );
  curve(
    [x, base - height * 0.5],
    [x - 26, base - height * 0.66],
    [x - 44, base - height * 0.5],
  );
  fill(col(0.98, 1));
  g.save();
  g.translate(tipX, tipY);
  g.rotate(0.5);
  ellipse(0, -16 * up, 10 * up, 26 * up);
  stroke(col(0.9, 1), 2);
  for (let i = -1; i <= 1; i++) line(i * 5, -38 * up, i * 12, -62 * up);
  g.restore();
}

/** One arching thorn cane with hooked spines; `up` runs from 0 to 1 as it grows. */
export function bramble(
  x: number,
  base: number,
  h: number,
  lean: number,
  seed: number,
  up: number,
) {
  if (up <= 0) return;
  const tipX = x + lean * up;
  const tipY = base - h * 0.5 * up;
  const midX = x + lean * 0.3 * up;
  const midY = base - h * up;
  stroke(col(1, 0.2), 7);
  curve([x, base], [midX, midY], [tipX, tipY]);
  stroke(col(1, 0.2), 3.6);
  for (let i = 1; i < 8; i++) {
    const k = i / 8;
    const m = 1 - k;
    const px = m * m * x + 2 * m * k * midX + k * k * tipX;
    const py = m * m * base + 2 * m * k * midY + k * k * tipY;
    const side = i % 2 ? 1 : -1;
    line(px, py, px + side * (14 + rnd(seed + i) * 10), py - 14);
  }
}

/** A bed of licking flames: each tongue curls its own way and flickers on its own beat. */
export function fire(x: number, y: number, h: number, t: number, seed: number) {
  if (h < 2) return;
  fill(col(0, 1, 0.95));
  for (let i = 0; i < 5; i++) {
    const ox = (i - 2) * h * 0.2 + (rnd(seed + i) - 0.5) * h * 0.14;
    const flick = 0.84 + 0.2 * Math.sin(t * 7 + i * 2.2 + seed);
    const tall =
      h *
      (1 - Math.abs(i - 2) * 0.22) *
      (0.7 + rnd(seed + i + 9) * 0.4) *
      flick;
    const curl = Math.sin(t * 3.4 + i * 1.7 + seed) * h * 0.14;
    g.beginPath();
    g.moveTo(x + ox - h * 0.16, y);
    g.bezierCurveTo(
      x + ox - h * 0.2,
      y - tall * 0.42,
      x + ox + curl - h * 0.12,
      y - tall * 0.56,
      x + ox + curl,
      y - tall,
    );
    g.bezierCurveTo(
      x + ox + h * 0.02,
      y - tall * 0.62,
      x + ox + h * 0.22,
      y - tall * 0.4,
      x + ox + h * 0.16,
      y,
    );
    g.closePath();
    g.fill();
  }
}

export function stubble(x: number, y: number) {
  stroke(col(1, 0.2), 6);
  line(x, y, x + 5, y - 22);
}

export function anchor(x: number, y: number, s: number) {
  stroke(col(1), 11 * s);
  line(x, y - 120 * s, x, y + 90 * s);
  line(x - 46 * s, y - 92 * s, x + 46 * s, y - 92 * s);
  g.beginPath();
  g.arc(x, y + 10 * s, 86 * s, 0.24, Math.PI - 0.24);
  g.stroke();
  fill(col(1));
  dot(x, y - 132 * s, 13 * s);
  poly([
    [x + 84 * s, y + 18 * s],
    [x + 108 * s, y - 16 * s],
    [x + 62 * s, y - 6 * s],
  ]);
  poly([
    [x - 84 * s, y + 18 * s],
    [x - 108 * s, y - 16 * s],
    [x - 62 * s, y - 6 * s],
  ]);
}

export function cable(x0: number, y0: number, x1: number, y1: number) {
  stroke(col(1), 4);
  line(x0, y0, x1, y1);
}

export function footprint(x: number, y: number, s: number, v: number, a = 1) {
  fill(col(v, 0.4, 0, a));
  ellipse(x, y, s, s * 0.42, 0.1);
}

export function sand(pts: readonly Point[]) {
  fill(col(0.3, 0.62));
  poly(pts);
}

/** A night wash: black overhead, thinning to bare paper at the horizon. */
export function nightSky(horizon: number) {
  const q = g.createLinearGradient(0, 0, 0, horizon);
  q.addColorStop(0, col(0.98));
  q.addColorStop(0.42, col(0.94));
  q.addColorStop(0.68, col(0.56));
  q.addColorStop(0.88, col(0.2));
  q.addColorStop(1, col(0.08));
  fill(q);
  rect(LEFT, 0, WIDE, horizon);
}

/** An old man in profile, bearded, one arm lifted to the sky and the other on his staff. */
export function elder(x: number, y: number, h: number) {
  const k = h / 100;
  const P = (a: number, b: number): Point => [x + a * k, y - b * k];
  fill(col(1));
  blob([
    P(-22, 0),
    P(-24, 26),
    P(-20, 52),
    P(-17, 70),
    P(-11, 80),
    P(4, 81),
    P(12, 74),
    P(12, 56),
    P(15, 28),
    P(20, 0),
  ]);
  const [hx, hy] = P(1, 90);
  dot(hx, hy, 8.6 * k);
  blob([P(2, 86), P(10, 84), P(11, 74), P(5, 68), P(0, 76)]);
  const [ax, ay] = P(6, 74);
  const [bx, by] = P(28, 112);
  stroke(col(1), 6.4 * k);
  line(ax, ay, bx, by);
  const [cx, cy] = P(-16, 66);
  const [dx, dy] = P(-34, 44);
  line(cx, cy, dx, dy);
  stroke(col(1), 2.6 * k);
  const [ex, ey] = P(-36, 0);
  const [fx, fy] = P(-35, 96);
  line(ex, ey, fx, fy);
}

export function paperStars(n: number, top: number) {
  fill(col(0, 0, 1));
  for (let i = 0; i < n; i++)
    dot(
      -900 + rnd(i) * 3400,
      rnd(i + 300) * top,
      1.4 + rnd(i + 90) * rnd(i + 91) * 4.4,
    );
}

export function sandGrains(n: number, y: number, h: number) {
  fill(col(0.92, 0.4));
  for (let i = 0; i < n; i++)
    dot(-900 + rnd(i + 5) * 3400, y + rnd(i + 311) * h, 1 + rnd(i + 95) * 1.8);
}

export function surface(y: number, t: number) {
  stroke(col(0.52), 6);
  g.beginPath();
  for (let x = LEFT; x <= LEFT + WIDE; x += 20) {
    const h =
      y + Math.sin(x * 0.012 + t * 0.9) * 14 + Math.sin(x * 0.03 - t) * 6;
    if (x === LEFT) g.moveTo(x, h);
    else g.lineTo(x, h);
  }
  g.stroke();
}

export function shaft(
  x: number,
  top: number,
  bottom: number,
  w: number,
  t: number,
  i: number,
) {
  const q = g.createLinearGradient(0, top, 0, bottom);
  q.addColorStop(0, col(0, 0, 0, 0.34 + 0.06 * Math.sin(t * 0.7 + i)));
  q.addColorStop(1, col(0, 0, 0, 0));
  fill(q);
  poly([
    [x, top],
    [x + w, top],
    [x - 110, bottom],
    [x - 110 - w * 1.3, bottom],
  ]);
}

export function curtain(
  x: number,
  top: number,
  bottom: number,
  n: number,
  reveal: number,
) {
  for (let i = 0; i < n; i++) {
    fill(col(i % 2 ? 0.76 : 0.92, 0.34));
    rect(x + i * 50, top, 51, bottom - top);
  }
  fill(col(0, 0, 0.95 * reveal));
  rect(x - 4, top + 110, 12, bottom - top - 110);
}
