// The embroidery drawing. Red picks the wool, green is scarlet thread, blue is couched gold.

type Point = readonly [number, number];

export const FLOOR = 600;

const WOOL = {
  indigo: 0.3,
  sage: 0.46,
  ochre: 0.62,
  madder: 0.78,
  cream: 0.94,
};

let g: CanvasRenderingContext2D;

export function bindArt(ctx: CanvasRenderingContext2D) {
  g = ctx;
}

export function clearCloth(width: number, height: number) {
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
const line = (a: Point, b: Point) => {
  g.beginPath();
  g.moveTo(a[0], a[1]);
  g.lineTo(b[0], b[1]);
  g.stroke();
};
const curve = (a: Point, b: Point, c: Point) => {
  g.beginPath();
  g.moveTo(a[0], a[1]);
  g.quadraticCurveTo(b[0], b[1], c[0], c[1]);
  g.stroke();
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
const ease = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
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

/** Stitches only the part of the cloth inside this box. */
export function withinBox(
  x: number,
  y: number,
  w: number,
  h: number,
  draw: () => void,
) {
  g.save();
  g.beginPath();
  g.rect(x, y, w, h);
  g.clip();
  draw();
  g.restore();
}

/** Stitches spread outward from a point. */
export function withinCircle(
  x: number,
  y: number,
  r: number,
  draw: () => void,
) {
  if (r <= 0) return;
  g.save();
  g.beginPath();
  g.arc(x, y, r, 0, Math.PI * 2);
  g.clip();
  draw();
  g.restore();
}

interface PersonOptions {
  tone?: number;
  hood?: number;
  /** 1 faces right, -1 faces left. */
  face?: number;
  /** Arm from 0, at the side, to 1, raised high. */
  lift?: number;
  staff?: boolean;
  /** Phase of the walk; leave out to stand still. */
  walk?: number;
  /** Lean forward from 0 to 1. */
  bow?: number;
}

export function person(x: number, y: number, h: number, o: PersonOptions = {}) {
  const {
    tone = WOOL.madder,
    hood = tone,
    face = 1,
    lift,
    staff = false,
    walk,
    bow = 0,
  } = o;
  const k = h / 100;
  const P = (a: number, b: number): Point => [
    x + face * (a + bow * b * 0.2) * k,
    y - b * k,
  ];
  const s = walk === undefined ? 4 : Math.sin(walk) * 11;
  stroke(col(WOOL.indigo), 5 * k);
  line(P(-4, 20), P(-4 - s, 3));
  line(P(4, 20), P(4 + s, 3));
  line(P(-4 - s, 2), P(3 - s, 2));
  line(P(4 + s, 2), P(11 + s, 2));
  if (staff) {
    stroke(col(WOOL.sage), 3.6 * k);
    line([P(24, 0)[0], y], [P(24, 0)[0], y - 118 * k]);
  }
  fill(col(tone));
  blob([
    P(-18, 16),
    P(-16, 36),
    P(-13, 58),
    P(-11, 72),
    P(-6, 78),
    P(6, 78),
    P(11, 72),
    P(13, 56),
    P(16, 36),
    P(19, 16),
  ]);
  fill(col(hood));
  const [hx, hy] = P(-1, 87);
  dot(hx, hy, 12 * k);
  fill(col(WOOL.cream));
  const [fx, fy] = P(4, 87);
  dot(fx, fy, 7.6 * k);
  if (lift === undefined && !staff) return;
  const a = -1.15 + (lift ?? 0.42) * 2.5;
  const reach = staff && lift === undefined ? 26 : 35;
  const hand = P(3 + reach * Math.cos(a), 70 + reach * Math.sin(a));
  stroke(col(tone), 8.5 * k);
  line(P(3, 70), hand);
  fill(col(WOOL.cream));
  dot(hand[0], hand[1], 4.8 * k);
}

/** Couched gold thread radiating from a point; `grow` runs from 0 to 1 as the rays are laid. */
export function gold(x: number, y: number, r: number, grow: number) {
  if (grow <= 0) return;
  const rays = 44;
  stroke(col(0, 0, 1), 5);
  for (let i = 0; i < rays; i++) {
    const a = (i / rays) * Math.PI * 2 + 0.07;
    const inner = r * (i % 2 ? 0.2 : 0.12);
    const outer = r * (i % 2 ? 0.62 : 1) * (0.84 + 0.16 * rnd(i));
    const reach = inner + (outer - inner) * Math.min(grow, 1);
    line(
      [x + Math.cos(a) * inner, y + Math.sin(a) * inner],
      [x + Math.cos(a) * reach, y + Math.sin(a) * reach],
    );
  }
}

/** A closed band of hills: stitched like a Bayeux landscape, with bare linen below it. */
export function ridge(
  seed: number,
  y: number,
  amp: number,
  tone: number,
  from = -1000,
  to = 3400,
  thick = 58,
) {
  const upper = (x: number) => {
    const v =
      Math.sin(x * 0.0041 + seed) * 0.55 +
      Math.sin(x * 0.0127 + seed * 2.3) * 0.3 +
      Math.sin(x * 0.031 + seed * 4.1) * 0.15;
    return y - amp * (0.5 + 0.5 * v);
  };
  const lower = (x: number) =>
    upper(x) + thick * (0.74 + 0.26 * Math.sin(x * 0.0073 + seed * 3.1));
  fill(col(tone));
  g.beginPath();
  for (let x = from; x <= to; x += 20) {
    const taper = 1 - ease(to - 200, to, x);
    const mid = (upper(x) + lower(x)) / 2;
    const top = mid + (upper(x) - mid) * taper;
    if (x === from) g.moveTo(x, top);
    else g.lineTo(x, top);
  }
  for (let x = to; x >= from; x -= 20) {
    const taper = 1 - ease(to - 200, to, x);
    const mid = (upper(x) + lower(x)) / 2;
    g.lineTo(x, mid + (lower(x) - mid) * taper);
  }
  g.closePath();
  g.fill();
}

export function ground(from = -1000, to = 3400) {
  fill(col(WOOL.sage));
  rect(from, FLOOR - 2, to - from, 16);
}

export function stars(n: number, reveal: number, top = 330) {
  stroke(col(WOOL.indigo), 3.2);
  const shown = Math.floor(n * reveal);
  for (let i = 0; i < shown; i++) {
    const x = 30 + rnd(i) * 1540;
    const y = 130 + rnd(i + 200) * (top - 130);
    const r = 3.4 + rnd(i + 40) * 3.4;
    line([x - r, y], [x + r, y]);
    line([x, y - r], [x, y + r]);
  }
}

export function sun(x: number, y: number, r: number) {
  fill(col(WOOL.cream));
  dot(x, y, r);
  stroke(col(WOOL.ochre), 7);
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    line(
      [x + Math.cos(a) * r * 1.2, y + Math.sin(a) * r * 1.2],
      [x + Math.cos(a) * r * 1.5, y + Math.sin(a) * r * 1.5],
    );
  }
}

export function moon(x: number, y: number, r: number) {
  fill(col(WOOL.cream));
  dot(x, y, r);
  fill(col(0));
  dot(x + r * 0.46, y - r * 0.24, r * 0.88);
}

export function tree(x: number, y: number, s: number, tone = WOOL.sage) {
  fill(col(WOOL.ochre));
  rect(x - 5 * s, y - 62 * s, 10 * s, 62 * s);
  fill(col(tone));
  dot(x, y - 86 * s, 36 * s);
  dot(x - 28 * s, y - 62 * s, 25 * s);
  dot(x + 28 * s, y - 64 * s, 27 * s);
}

export function bird(x: number, y: number, s: number) {
  stroke(col(WOOL.madder), 5 * s);
  curve([x - 22 * s, y - 8 * s], [x - 8 * s, y - 16 * s], [x, y]);
  curve([x + 22 * s, y - 8 * s], [x + 8 * s, y - 16 * s], [x, y]);
}

export function sheep(x: number, y: number, s: number, d = 1) {
  stroke(col(WOOL.indigo), 4.5 * s);
  line([x - 13 * s, y - 14 * s], [x - 13 * s, y]);
  line([x + 11 * s, y - 14 * s], [x + 11 * s, y]);
  fill(col(WOOL.cream));
  g.beginPath();
  g.ellipse(x, y - 24 * s, 28 * s, 17 * s, 0, 0, 7);
  g.fill();
  fill(col(WOOL.indigo));
  dot(x + d * 29 * s, y - 33 * s, 8.5 * s);
}

export function tent(x: number, y: number, s: number, tone = WOOL.ochre) {
  stroke(col(WOOL.indigo), 2.6 * s);
  line([x - 16 * s, y - 104 * s], [x - 130 * s, y]);
  line([x + 18 * s, y - 118 * s], [x + 136 * s, y]);
  fill(col(tone));
  poly([
    [x - 92 * s, y],
    [x - 16 * s, y - 104 * s],
    [x + 18 * s, y - 118 * s],
    [x + 100 * s, y],
  ]);
  fill(col(WOOL.madder));
  for (let i = 1; i < 4; i++) {
    const f = i / 4;
    poly([
      [x - 92 * s + 192 * s * f - 7 * s, y],
      [x - 16 * s + 34 * s * f - 2 * s, y - (104 + 14 * f) * s],
      [x - 16 * s + 34 * s * f + 2 * s, y - (104 + 14 * f) * s],
      [x - 92 * s + 192 * s * f + 7 * s, y],
    ]);
  }
  fill(col(WOOL.indigo));
  poly([
    [x - 12 * s, y],
    [x + 8 * s, y - 72 * s],
    [x + 28 * s, y],
  ]);
}

/** `built` runs from 0, bare ribs, to 1, finished. */
export function ark(x: number, y: number, s: number, built = 1) {
  const P = (a: number, b: number): Point => [x + a * s, y - b * s];
  stroke(col(WOOL.ochre), 7 * s);
  for (let i = 0; i < 11; i++) {
    const a = -230 + i * 46;
    line(P(a * 0.86, 4), P(a, 118));
  }
  withinBox(x - 290 * s, y - 280 * s, 580 * s * built, 300 * s, () => {
    fill(col(WOOL.madder));
    blob([
      P(-268, 118),
      P(-214, 28),
      P(-120, 0),
      P(130, 0),
      P(220, 28),
      P(272, 118),
    ]);
    fill(col(WOOL.cream));
    rect(x - 176 * s, y - 158 * s, 344 * s, 56 * s);
    fill(col(WOOL.ochre));
    poly([P(-196, 158), P(0, 214), P(190, 158)]);
    fill(col(WOOL.indigo));
    for (let i = 0; i < 6; i++)
      rect(x - 150 * s + i * 56 * s, y - 142 * s, 26 * s, 24 * s);
    stroke(col(WOOL.indigo), 3 * s);
    for (let i = 0; i < 3; i++) line(P(-230, 84 - i * 26), P(234, 84 - i * 26));
  });
}

export function flame(x: number, y: number, h: number, t: number, w = 1) {
  if (h <= 1) return;
  for (let i = 0; i < 5; i++) {
    const ox = (i - 2) * 0.22 * h * w;
    const fh =
      h *
      (1 - Math.abs(i - 2) * 0.22) *
      (0.9 + 0.16 * Math.sin(t * 8 + i * 2.1));
    fill(i % 2 ? col(WOOL.ochre) : col(0, 0.95));
    g.beginPath();
    g.moveTo(x + ox - 0.2 * h * w, y);
    g.quadraticCurveTo(
      x + ox - 0.15 * h * w,
      y - fh * 0.55,
      x + ox + Math.sin(t * 5 + i) * 0.05 * h,
      y - fh,
    );
    g.quadraticCurveTo(
      x + ox + 0.17 * h * w,
      y - fh * 0.5,
      x + ox + 0.2 * h * w,
      y,
    );
    g.fill();
  }
}

export function altar(x: number, y: number, s: number, burn = 0, t = 0) {
  for (let r = 0; r < 4; r++)
    for (let i = 0; i < 4 - (r % 2); i++) {
      const w = 52 * s;
      fill(col(rnd(r * 7 + i) > 0.5 ? WOOL.ochre : WOOL.madder));
      rect(
        x - 114 * s + i * w * 1.08 + (r % 2) * w * 0.54,
        y - (r + 1) * 30 * s,
        w,
        27 * s,
      );
    }
  if (burn > 0) flame(x, y - 120 * s, 76 * s * burn, t);
}

export function wood(x: number, y: number, w: number) {
  stroke(col(WOOL.cream), 6);
  for (let i = 0; i < 4; i++)
    line([x - w / 2 + i * 7, y - i * 7], [x + w / 2 - i * 5, y - i * 7 + 3]);
}

export function smoke(
  x: number,
  y: number,
  h: number,
  t: number,
  lean = 0,
  tone = WOOL.indigo,
) {
  stroke(col(tone), 11);
  for (let j = 0; j < 3; j++) {
    g.beginPath();
    for (let i = 0; i <= 18; i++) {
      const f = i / 18;
      const px =
        x +
        (j - 1) * 12 +
        Math.sin(f * 7 + t * 0.9 + j) * 16 * f +
        lean * f * f;
      const py = y - f * h * (1 - (Math.abs(lean) / 400) * f);
      if (i) g.lineTo(px, py);
      else g.moveTo(px, py);
    }
    g.stroke();
  }
}

export function rainCloud(t: number, x = 1040) {
  fill(col(WOOL.indigo));
  blob([
    [x - 70, 232],
    [x - 96, 180],
    [x - 30, 150],
    [x + 40, 118],
    [x + 150, 130],
    [x + 240, 112],
    [x + 340, 140],
    [x + 450, 150],
    [x + 520, 196],
    [x + 480, 232],
  ]);
  stroke(col(WOOL.indigo), 3);
  for (let i = 0; i < 44; i++) {
    const px = x - 60 + rnd(i) * 560;
    const py = 240 + ((rnd(i + 90) * 300 + t * 140) % 300);
    line([px, py], [px - 8, py + 30]);
  }
}

/** A standing wall of water with a curling crest. */
export function waves(
  x: number,
  y: number,
  w: number,
  h: number,
  t: number,
  curl = 1,
) {
  fill(col(WOOL.indigo));
  rect(x, y - h, w, h);
  const n = Math.round(w / 44);
  for (let i = 0; i <= n; i++)
    dot(x + (i / n) * w, y - h, 22 + 4 * Math.sin(t + i));
  stroke(col(WOOL.cream), 4);
  for (let r = 0; r < h / 40; r++) {
    g.beginPath();
    for (let i = 0; i <= w / 12; i++) {
      const px = x + i * 12;
      const py =
        y - h + 24 + r * 40 + Math.sin(i * 0.9 * curl + r * 1.7 + t * 1.2) * 7;
      if (i) g.lineTo(px, py);
      else g.moveTo(px, py);
    }
    g.stroke();
  }
}

export function reeds(x: number, y: number) {
  stroke(col(WOOL.sage), 4);
  for (let i = 0; i < 10; i++)
    line([x + i * 14, y], [x - 4 + i * 16, y - 76 - rnd(i) * 40]);
}

export function basket(x: number, y: number) {
  fill(col(WOOL.ochre));
  g.beginPath();
  g.ellipse(x, y - 15, 50, 18, 0, 0, Math.PI);
  g.fill();
  rect(x - 50, y - 25, 100, 11);
  fill(col(WOOL.cream));
  dot(x - 20, y - 32, 11);
}

/** Courses of stone; `fall` runs 0 to 1, and the stretch with the window stands. */
export function jericho(x: number, y: number, s: number, fall: number) {
  for (let i = 0; i < 8; i++) {
    const f = ease(i * 0.04, 0.55 + i * 0.05, fall);
    const courses = 5 - (i % 2);
    const keep = i === 5;
    for (let j = 0; j < courses; j++) {
      const bx = x + i * 80 * s;
      const by = y - (j + 1) * 54 * s;
      const drop = keep ? 0 : f * (y - by - 12 * s);
      const side = keep ? 0 : f * (rnd(i * 9 + j) - 0.3) * 60;
      fill(col(rnd(i * 3 + j * 5) > 0.5 ? WOOL.ochre : WOOL.madder));
      g.save();
      g.translate(bx + side, by + drop);
      g.rotate(keep ? 0 : f * (rnd(i + j) - 0.5) * 1.2);
      rect(0, 0, 76 * s, 50 * s);
      g.restore();
    }
  }
  const wx = x + 422 * s;
  const wy = y - 162 * s;
  fill(col(WOOL.indigo));
  rect(wx, wy, 32 * s, 36 * s);
  stroke(col(0, 1), 6 * s);
  curve(
    [wx + 16 * s, wy + 30 * s],
    [wx + 26 * s, wy + 80 * s],
    [wx + 14 * s, y - 8 * s],
  );
}

export function city(x: number, y: number, s: number) {
  fill(col(WOOL.madder));
  rect(x - 210 * s, y - 16 * s, 420 * s, 16 * s);
  fill(col(WOOL.ochre));
  rect(x - 176 * s, y - 36 * s, 352 * s, 20 * s);
  for (const [a, h] of [
    [-150, 60],
    [-100, 88],
    [-52, 70],
    [0, 116],
    [48, 78],
    [96, 92],
    [142, 62],
  ]) {
    fill(col(WOOL.ochre));
    rect(x + a * s - 20 * s, y - 36 * s - h * s, 40 * s, h * s);
    fill(col(WOOL.indigo));
    rect(x + a * s - 6 * s, y - 36 * s - h * s + 12 * s, 12 * s, 18 * s);
  }
}

export function chest(x: number, y: number, w: number) {
  fill(col(WOOL.madder));
  rect(x, y - 62, w, 62);
  fill(col(WOOL.ochre));
  rect(x - 6, y - 74, w + 12, 12);
  stroke(col(WOOL.indigo), 7);
  line([x - 90, y - 36], [x + w + 90, y - 36]);
}

export function hill(pts: readonly Point[], tone = WOOL.sage) {
  fill(col(tone));
  blob(pts);
}

export function lion(x: number, y: number, s: number, d = 1) {
  const P = (a: number, b: number): Point => [x + d * a * s, y - b * s];
  stroke(col(WOOL.ochre), 5 * s);
  curve(P(-82, 86), P(-126, 110), P(-132, 70));
  fill(col(WOOL.ochre));
  blob([
    P(-60, 0),
    P(-66, 40),
    P(-90, 58),
    P(-82, 92),
    P(-30, 96),
    P(30, 100),
    P(70, 94),
    P(88, 62),
    P(64, 52),
    P(52, 30),
    P(50, 0),
    P(36, 0),
    P(30, 34),
    P(-30, 38),
    P(-46, 0),
  ]);
  fill(col(WOOL.madder));
  const [mx, my] = P(66, 96);
  dot(mx, my, 46 * s);
  fill(col(WOOL.cream));
  const [hx, hy] = P(80, 88);
  dot(hx, hy, 24 * s);
  stroke(col(WOOL.indigo), 3 * s);
  line(P(82, 76), P(100, 78));
}

export function furnace(x: number, y: number, t: number) {
  fill(col(WOOL.ochre));
  rect(x - 90, y - 210, 180, 210);
  fill(col(WOOL.indigo));
  g.beginPath();
  g.arc(x, y - 60, 56, Math.PI, 0);
  g.lineTo(x + 56, y);
  g.lineTo(x - 56, y);
  g.closePath();
  g.fill();
  flame(x, y, 92, t, 0.9);
}

export function chain(x: number, y: number, n: number) {
  stroke(col(WOOL.indigo), 5);
  for (let i = 0; i < n; i++) {
    g.beginPath();
    g.ellipse(x + i * 11, y + Math.sin(i * 1.2) * 3, 8, 5, 0, 0, 7);
    g.stroke();
  }
}

export function mountain(
  x: number,
  y: number,
  w: number,
  h: number,
  tone = WOOL.sage,
) {
  fill(col(tone));
  blob([
    [x - w / 2, y + 12],
    [x - w * 0.34, y - h * 0.46],
    [x - w * 0.18, y - h * 0.62],
    [x - w * 0.04, y - h],
    [x + w * 0.08, y - h * 0.72],
    [x + w * 0.24, y - h * 0.56],
    [x + w * 0.36, y - h * 0.3],
    [x + w / 2, y + 12],
  ]);
}

export function cave(x: number, y: number, s: number) {
  fill(col(WOOL.indigo));
  g.beginPath();
  g.moveTo(x - 62 * s, y);
  g.quadraticCurveTo(x - 66 * s, y - 118 * s, x, y - 126 * s);
  g.quadraticCurveTo(x + 66 * s, y - 118 * s, x + 62 * s, y);
  g.closePath();
  g.fill();
}

/** The needle, with the scarlet thread running back to (tx, ty). */
export function needle(
  x: number,
  y: number,
  tx: number,
  ty: number,
  dip: number,
) {
  stroke(col(0, 1), 4);
  curve([x + 31, y - 86 + dip], [(x + tx) / 2, y - 40], [tx, ty]);
  stroke(col(WOOL.cream), 5);
  line([x, y + dip * 0.3], [x + 34, y - 92 + dip]);
}

export function footprints(x: number, n: number, reveal: number) {
  fill(col(WOOL.indigo));
  const shown = Math.floor(n * reveal + 0.2);
  for (let i = 0; i < shown; i++) {
    g.beginPath();
    g.ellipse(x + i * 34, FLOOR - 7 - (i % 2) * 4, 10, 3.6, 0, 0, 7);
    g.fill();
  }
}

export function thread(x0: number, x1: number, y: number) {
  stroke(col(0, 1), 4);
  line([x0, y], [x1, y]);
}
