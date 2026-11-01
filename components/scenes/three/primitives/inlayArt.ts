// The inlay drawing. Red picks the stone, green is carnelian, blue is gold.

type Point = readonly [number, number];

export const FLOOR = 610;

export const STONE = {
  bitumen: 0.3,
  grey: 0.46,
  limestone: 0.62,
  carnelian: 0.78,
  shell: 0.94,
};

let g: CanvasRenderingContext2D;

export function bindArt(ctx: CanvasRenderingContext2D) {
  g = ctx;
}

export function clearGround(width: number, height: number) {
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

/** Sets a piece in from the ground up, one shape at a time. */
export function setUp(
  x: number,
  w: number,
  y: number,
  h: number,
  a: number,
  draw: () => void,
) {
  if (a <= 0) return;
  g.save();
  g.beginPath();
  g.rect(x, y - h * a, w, h * a);
  g.clip();
  draw();
  g.restore();
}

export function ground(from = -900, to = 2500) {
  fill(col(STONE.limestone));
  rect(from, FLOOR, to - from, 14);
}

interface PersonOptions {
  tone?: number;
  face?: number;
  /** Arm from 0, at the side, to 1, raised. */
  arm?: number;
  /** Bends the figure down onto its knees, from 0 to 1. */
  kneel?: number;
  wine?: boolean;
  staff?: boolean;
}

export function person(x: number, y: number, h: number, o: PersonOptions = {}) {
  const { tone = STONE.shell, face = 1, arm, kneel = 0, wine, staff } = o;
  const k = h / 100;
  const P = (a: number, b: number): Point => [
    x + face * a * k,
    y - b * k * (1 - kneel * 0.36),
  ];
  const robe = wine ? col(STONE.carnelian, 1) : col(tone);
  fill(robe);
  blob([
    P(-22, 0),
    P(-20, 30),
    P(-15, 58),
    P(-12, 76),
    P(-5, 80),
    P(7, 80),
    P(13, 72),
    P(15, 52),
    P(18, 28),
    P(24, 0),
  ]);
  stroke(col(STONE.shell), 2.4 * k);
  line(P(-17, 12), P(19, 12));
  line(P(-16, 22), P(18, 22));
  line(P(-15, 32), P(17, 32));
  fill(col(STONE.shell));
  const [hx, hy] = P(3, 90);
  dot(hx, hy, 9.4 * k);
  fill(col(STONE.bitumen));
  blob([P(4, 86), P(12, 84), P(13, 75), P(7, 70), P(2, 78)]);
  const [cx, cy] = P(-2, 96);
  dot(cx, cy, 6.4 * k);
  if (arm !== undefined) {
    const a = -1.1 + arm * 2.3;
    const hand = P(4 + 34 * Math.cos(a), 68 + 34 * Math.sin(a));
    stroke(robe, 7.5 * k);
    line(P(4, 68), hand);
    fill(col(STONE.shell));
    dot(hand[0], hand[1], 4.4 * k);
  }
  if (staff) {
    stroke(col(STONE.grey), 3 * k);
    line(P(28, 0), P(30, 124));
  }
}

export function loaf(x: number, y: number, s: number) {
  fill(col(STONE.limestone));
  blob([
    [x - 26 * s, y],
    [x - 22 * s, y - 16 * s],
    [x, y - 24 * s],
    [x + 22 * s, y - 16 * s],
    [x + 26 * s, y],
  ]);
  fill(col(STONE.shell));
  rect(x - 34 * s, y, 68 * s, 8 * s);
}

export function cup(x: number, y: number, s: number) {
  fill(col(STONE.carnelian, 1));
  poly([
    [x - 15 * s, y - 34 * s],
    [x + 15 * s, y - 34 * s],
    [x + 6 * s, y - 12 * s],
    [x + 4 * s, y],
    [x - 4 * s, y],
    [x - 6 * s, y - 12 * s],
  ]);
}

export function salem(x: number, y: number, s: number) {
  for (let i = 0; i < 4; i++) {
    const w = (560 - i * 110) * s;
    const h = 44 * s;
    fill(col(i % 2 ? STONE.limestone : STONE.grey));
    rect(x - w / 2, y - (i + 1) * h, w, h - 3 * s);
  }
  const top = y - 176 * s;
  const w = 250 * s;
  fill(col(STONE.limestone));
  rect(x - w / 2, top - 74 * s, w, 74 * s);
  for (let i = 0; i < 7; i++)
    rect(x - w / 2 + i * (w / 6) - 12 * s, top - 96 * s, 24 * s, 24 * s);
  fill(col(STONE.bitumen));
  g.beginPath();
  g.arc(x, top - 34 * s, 24 * s, Math.PI, 0);
  g.lineTo(x + 24 * s, top);
  g.lineTo(x - 24 * s, top);
  g.closePath();
  g.fill();
}

export function sun(x: number, y: number, r: number) {
  fill(col(0, 0, 1));
  dot(x, y, r);
}

/** Inlaid gold rays round a point; `grow` runs from 0 to 1 as they are laid. */
export function rays(x: number, y: number, r: number, grow: number) {
  if (grow <= 0) return;
  stroke(col(0, 0, 1), 7);
  for (let i = 0; i < 28; i++) {
    const a = (i / 28) * Math.PI * 2;
    const out = r * (i % 2 ? 0.66 : 1) * grow;
    line(
      [x + Math.cos(a) * r * 0.18, y + Math.sin(a) * r * 0.18],
      [x + Math.cos(a) * out, y + Math.sin(a) * out],
    );
  }
  fill(col(0, 0, 1));
  dot(x, y, r * 0.15 * grow);
}

export function bundle(
  x: number,
  y: number,
  s: number,
  tone = STONE.limestone,
) {
  fill(col(tone));
  blob([
    [x - 34 * s, y],
    [x - 30 * s, y - 40 * s],
    [x - 8 * s, y - 56 * s],
    [x + 18 * s, y - 54 * s],
    [x + 34 * s, y - 30 * s],
    [x + 34 * s, y],
  ]);
  stroke(col(STONE.bitumen), 4 * s);
  line([x - 30 * s, y - 28 * s], [x + 32 * s, y - 28 * s]);
}

export function altar(x: number, y: number, s: number, t: number) {
  for (let r = 0; r < 4; r++)
    for (let i = 0; i < 4 - (r % 2); i++) {
      fill(col((i + r) % 2 ? STONE.limestone : STONE.grey));
      rect(
        x - 112 * s + i * 56 * s + (r % 2) * 28 * s,
        y - (r + 1) * 31 * s,
        53 * s,
        28 * s,
      );
    }
  for (let i = 0; i < 4; i++) {
    const h = 60 * s * (0.8 + 0.3 * Math.sin(t * 7 + i * 2));
    const fx = x + (i - 1.5) * 26 * s;
    const fy = y - 124 * s;
    fill(col(STONE.carnelian, 1));
    blob([
      [fx - 14 * s, fy],
      [fx - 9 * s, fy - h * 0.5],
      [fx, fy - h],
      [fx + 9 * s, fy - h * 0.5],
      [fx + 14 * s, fy],
    ]);
  }
}

export function sceptre(x: number, y: number, s: number) {
  fill(col(STONE.limestone));
  rect(x - 70 * s, y - 44 * s, 140 * s, 44 * s);
  stroke(col(STONE.shell), 9 * s);
  line([x, y - 44 * s], [x, y - 262 * s]);
  fill(col(STONE.carnelian, 1));
  dot(x, y - 276 * s, 19 * s);
}

export function mound(x: number, y: number, s: number) {
  fill(col(STONE.limestone));
  blob([
    [x - 56 * s, y],
    [x - 40 * s, y - 34 * s],
    [x, y - 50 * s],
    [x + 40 * s, y - 34 * s],
    [x + 56 * s, y],
  ]);
  stroke(col(STONE.bitumen), 4 * s);
  line([x - 34 * s, y - 16 * s], [x + 34 * s, y - 16 * s]);
}

export function panel(x: number, y: number, w: number, h: number) {
  fill(col(STONE.grey));
  rect(x, y, w, h);
}

export function tablet(x: number, y: number, w: number, h: number) {
  fill(col(STONE.grey));
  poly([
    [x - w * 0.62, y],
    [x + w * 0.62, y],
    [x + w * 0.54, y - 44],
    [x - w * 0.54, y - 44],
  ]);
  fill(col(STONE.limestone));
  blob([
    [x - w / 2, y - 44],
    [x - w * 0.52, y - h],
    [x + w * 0.52, y - h],
    [x + w / 2, y - 44],
  ]);
}

export function impression(
  x0: number,
  x1: number,
  y: number,
  h: number,
  upto: number,
) {
  g.save();
  g.beginPath();
  g.rect(x0, y - h, Math.max(0, upto - x0), h);
  g.clip();
  stroke(col(STONE.shell), 3);
  line([x0, y - h + 8], [x1, y - h + 8]);
  line([x0, y - 8], [x1, y - 8]);
  const n = Math.ceil((x1 - x0) / 92);
  for (let i = 0; i < n; i++) {
    const x = x0 + 46 + i * 92;
    person(x - 16, y - 16, 112, { tone: STONE.shell, arm: 0.6 });
    fill(col(STONE.bitumen));
    for (let j = 0; j < 5; j++) {
      const row = y - h + 24 + j * 22;
      poly([
        [x + 22, row],
        [x + 36, row],
        [x + 22, row + 11],
      ]);
    }
  }
  g.restore();
}

export function seal(x: number, y: number, h: number, turn: number) {
  fill(col(STONE.shell));
  rect(x - 42, y - h - 16, 84, h + 32);
  stroke(col(STONE.bitumen), 3);
  for (let i = 0; i < 8; i++) {
    const k = (i / 8 + turn) % 1;
    const lx = x - 42 * Math.cos(k * Math.PI);
    line([lx, y - h - 12], [lx, y + 12]);
  }
  fill(col(STONE.limestone));
  g.beginPath();
  g.ellipse(x, y - h - 16, 42, 12, 0, 0, Math.PI * 2);
  g.fill();
}
