// The paper drawing. Red is the layer from far to near, green tints it (0.5 water, 1 wine), blue is gold paper.

type Point = readonly [number, number];

export const FLOOR = 610;

export const LAYER = {
  far: 0.2,
  hill: 0.3,
  grass: 0.42,
  stone: 0.54,
  leaf: 0.66,
  deep: 0.78,
  robe: 0.9,
  cream: 0.97,
};

const LEFT = -1000;
const RIGHT = 2600;

let g: CanvasRenderingContext2D;

export function bindArt(ctx: CanvasRenderingContext2D) {
  g = ctx;
}

export function clearSheet(width: number, height: number) {
  g.setTransform(1, 0, 0, 1, 0, 0);
  g.globalAlpha = 1;
  g.globalCompositeOperation = "source-over";
  g.fillStyle = "#000";
  g.fillRect(0, 0, width, height);
}

const col = (v: number, w = 0, l = 0) =>
  `rgb(${Math.round(v * 255)},${Math.round(w * 255)},${Math.round(l * 255)})`;
const fill = (c: string) => {
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
const line = (a: Point, b: Point) => {
  g.beginPath();
  g.moveTo(a[0], a[1]);
  g.lineTo(b[0], b[1]);
  g.stroke();
};
const poly = (pts: readonly Point[]) => {
  g.beginPath();
  pts.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y)));
  g.closePath();
  g.fill();
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

/** Lays a layer in from the ground up. */
export function rising(
  a: number,
  draw: () => void,
  x = LEFT,
  w = RIGHT - LEFT,
) {
  if (a <= 0) return;
  g.save();
  g.beginPath();
  g.rect(x, FLOOR + 100 - 900 * a, w, 900 * a);
  g.clip();
  draw();
  g.restore();
}

export function hills(seed: number, y: number, amp: number, v: number) {
  fill(col(v));
  g.beginPath();
  g.moveTo(LEFT, 1000);
  for (let x = LEFT; x <= RIGHT; x += 16) {
    const s =
      Math.sin(x * 0.0037 + seed) * 0.6 +
      Math.sin(x * 0.0093 + seed * 2.3) * 0.3 +
      Math.sin(x * 0.021 + seed * 4.1) * 0.1;
    g.lineTo(x, y - amp * (0.5 + 0.5 * s));
  }
  g.lineTo(RIGHT, 1000);
  g.closePath();
  g.fill();
}

export function sun(x: number, y: number, r: number) {
  fill(col(0, 0, 1));
  dot(x, y, r);
}

export function moon(x: number, y: number, r: number) {
  fill(col(LAYER.cream));
  dot(x, y, r);
  fill(col(0));
  dot(x + r * 0.4, y - r * 0.3, r * 0.88);
}

export function olive(x: number, y: number, s: number, v = LAYER.leaf) {
  fill(col(LAYER.stone));
  poly([
    [x - 12 * s, y],
    [x - 7 * s, y - 70 * s],
    [x + 9 * s, y - 70 * s],
    [x + 15 * s, y],
  ]);
  fill(col(v));
  blob([
    [x - 92 * s, y - 62 * s],
    [x - 104 * s, y - 112 * s],
    [x - 62 * s, y - 158 * s],
    [x - 8 * s, y - 182 * s],
    [x + 60 * s, y - 160 * s],
    [x + 108 * s, y - 116 * s],
    [x + 92 * s, y - 62 * s],
    [x, y - 48 * s],
  ]);
}

interface PersonOptions {
  tint?: number;
  face?: number;
  /** Arm from 0, at the side, to 1, raised. */
  arm?: number;
}

export function person(x: number, y: number, h: number, o: PersonOptions = {}) {
  const { tint = 0, face = 1, arm } = o;
  const k = h / 100;
  const P = (a: number, b: number): Point => [x + face * a * k, y - b * k];
  const cloth = col(LAYER.robe, tint);
  fill(cloth);
  blob([
    P(-20, 0),
    P(-19, 24),
    P(-14, 52),
    P(-11, 74),
    P(-3, 80),
    P(8, 78),
    P(13, 66),
    P(15, 44),
    P(19, 22),
    P(22, 0),
  ]);
  fill(col(LAYER.cream));
  const [hx, hy] = P(3, 90);
  dot(hx, hy, 10 * k);
  if (arm !== undefined) {
    const a = -1.1 + arm * 2.3;
    stroke(cloth, 8 * k);
    line(P(4, 68), P(4 + 34 * Math.cos(a), 68 + 34 * Math.sin(a)));
  }
}

export function wall(x0: number, x1: number, y: number, h: number) {
  const unit = h / 3;
  for (let r = 0; r < 3; r++)
    for (let x = x0 + (r % 2) * 30; x < x1; x += 60) {
      fill(col(LAYER.stone + (Math.round((x - x0) / 60 + r) % 2) * 0.04));
      rect(x, y - (r + 1) * unit, 57, unit - 3);
    }
}

export function gate(x: number, y: number, open: number, s = 1) {
  const w = 96 * s;
  const h = 196 * s;
  fill(col(0, 0, 0.95));
  g.beginPath();
  g.moveTo(x - w / 2, y);
  g.lineTo(x - w / 2, y - h + w / 2);
  g.arc(x, y - h + w / 2, w / 2, Math.PI, 0);
  g.lineTo(x + w / 2, y);
  g.closePath();
  g.fill();
  fill(col(LAYER.stone));
  rect(x - w / 2 - 24 * s, y - h - 8 * s, 24 * s, h + 8 * s);
  rect(x + w / 2, y - h - 8 * s, 24 * s, h + 8 * s);
  rect(x - w / 2 - 34 * s, y - h - 26 * s, w + 68 * s, 20 * s);
  const leaf = (w / 2) * (1 - open) + 4 * s;
  fill(col(LAYER.deep));
  rect(x - w / 2, y - h + 34 * s, leaf, h - 34 * s);
  rect(x + w / 2 - leaf, y - h + 34 * s, leaf, h - 34 * s);
}

export function road(x0: number, x1: number, y1: number, w: number) {
  fill(col(LAYER.stone + 0.02));
  poly([
    [x0 - w, FLOOR + 60],
    [x0 + w, FLOOR + 60],
    [x1 + 22, y1],
    [x1 - 22, y1],
  ]);
}

export function today(
  x0: number,
  x1: number,
  y1: number,
  w: number,
  on: number,
) {
  if (on <= 0) return;
  const tip = x0 + (x1 - x0) * on;
  const tipY = FLOOR + 60 - (FLOOR + 60 - y1) * on;
  fill(col(0, 0, 1));
  poly([
    [x0 - w, FLOOR + 60],
    [x0 + w, FLOOR + 60],
    [tip + 7, tipY],
    [tip - 7, tipY],
  ]);
}

export function river(y: number) {
  fill(col(LAYER.hill, 0.5));
  blob([
    [LEFT, y + 10],
    [340, y],
    [760, y + 30],
    [1180, y + 10],
    [RIGHT, y + 30],
    [RIGHT, y + 100],
    [1180, y + 84],
    [760, y + 106],
    [340, y + 76],
    [LEFT, y + 90],
  ]);
}

export function cairn(x: number, y: number, s: number) {
  const rows = [5, 4, 2, 1];
  let n = 0;
  rows.forEach((count, r) => {
    for (let i = 0; i < count; i++) {
      n++;
      const cx = x + (i - (count - 1) / 2) * 74 * s;
      const cy = y - r * 54 * s;
      const skew = ((n * 37) % 11) - 5;
      fill(col(LAYER.stone + (n % 3 === 1 ? 0.05 : 0)));
      poly([
        [cx - 38 * s, cy],
        [cx - 34 * s, cy - (34 + skew) * s],
        [cx - 10 * s, cy - (52 - skew) * s],
        [cx + 22 * s, cy - (50 + skew) * s],
        [cx + 37 * s, cy - (26 - skew) * s],
        [cx + 36 * s, cy],
      ]);
    }
  });
}

export function bird(x: number, y: number) {
  stroke(col(LAYER.deep), 5);
  g.beginPath();
  g.moveTo(x - 22, y - 8);
  g.quadraticCurveTo(x - 8, y - 16, x, y);
  g.quadraticCurveTo(x + 8, y - 16, x + 22, y - 8);
  g.stroke();
}

export function dayMark(x: number, y: number, r: number, gold: boolean) {
  fill(gold ? col(0, 0, 1) : col(LAYER.deep));
  dot(x, y, r);
}

/** Half a thicket, cut down the middle, which leans away and drops as `fall` runs from 0 to 1. */
export function thicket(cx: number, d: number, fall: number) {
  g.save();
  g.translate(cx + d * fall * 600, fall * 170);
  g.rotate(d * fall * 0.24);
  g.beginPath();
  if (d < 0) g.rect(-1500, -400, 1498, 1500);
  else g.rect(2, -400, 1500, 1500);
  g.clip();
  fill(col(LAYER.deep));
  blob([
    [-920, 760],
    [-760, 170],
    [-500, 110],
    [-250, 90],
    [0, 76],
    [250, 90],
    [500, 110],
    [760, 170],
    [920, 760],
  ]);
  fill(col(LAYER.leaf));
  for (let i = 0; i < 18; i++)
    dot(-800 + i * 94, 190 + ((i * 53) % 270), 66 + (i % 3) * 18);
  stroke(col(LAYER.deep), 16);
  for (let i = 0; i < 8; i++)
    line([-740 + i * 212, 720], [-714 + i * 212, 330]);
  g.restore();
}

/** A tapering two-edged blade coming down from above; `reach` is the y of its point. */
export function blade(x: number, reach: number) {
  fill(col(0, 0, 1));
  poly([
    [x - 11, -120],
    [x + 11, -120],
    [x + 11, reach - 46],
    [x, reach],
    [x - 11, reach - 46],
  ]);
}

export function cloud(y: number, v: number, gap: number, cx: number) {
  fill(col(v));
  const row = (x0: number, x1: number) => {
    if (x1 <= x0) return;
    g.beginPath();
    g.moveTo(x0, y + 60);
    for (let x = x0; x <= x1; x += 58) g.arc(x + 29, y + 30, 40, Math.PI, 0);
    g.lineTo(x1, y + 60);
    g.closePath();
    g.fill();
    rect(x0, y + 28, x1 - x0, 34);
  };
  row(LEFT, cx - gap);
  row(cx + gap, RIGHT);
}

export function ascent(x: number, from: number, to: number, w: number) {
  fill(col(0, 0, 0.95));
  poly([
    [x - 26, from],
    [x + 26, from],
    [x + w, to],
    [x - w, to],
  ]);
}

export function steps(x: number, y: number, n: number) {
  for (let i = 0; i < n; i++) {
    fill(col(LAYER.stone + (i % 2 ? 0 : 0.05)));
    const half = 420 - i * 60;
    rect(x - half, y - (i + 1) * 40, half * 2, 37);
  }
}

/** The seat holds only light. */
export function throne(x: number, y: number, s: number) {
  fill(col(LAYER.stone + 0.05));
  rect(x - 120 * s, y - 240 * s, 240 * s, 240 * s);
  fill(col(0, 0, 0.95));
  rect(x - 84 * s, y - 210 * s, 168 * s, 150 * s);
  fill(col(LAYER.deep, 1));
  rect(x - 100 * s, y - 60 * s, 200 * s, 26 * s);
  fill(col(LAYER.stone + 0.05));
  rect(x - 128 * s, y - 36 * s, 256 * s, 36 * s);
}
