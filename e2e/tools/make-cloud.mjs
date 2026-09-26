// Generates public/textures/cloud.png: a white puff whose shape lives in the alpha channel.
import { writeFileSync } from "node:fs";
import { deflateSync } from "node:zlib";

const SIZE = 256;
const out = process.argv[2] ?? "public/textures/cloud.png";

function mulberry32(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(3);
const LATTICE = 16;
const grid = Array.from({ length: LATTICE * LATTICE }, rand);
const at = (x, y) => grid[((y % LATTICE) + LATTICE) % LATTICE * LATTICE + ((x % LATTICE) + LATTICE) % LATTICE];
const smooth = (t) => t * t * (3 - 2 * t);

function valueNoise(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const u = smooth(x - xi), v = smooth(y - yi);
  const top = at(xi, yi) + (at(xi + 1, yi) - at(xi, yi)) * u;
  const bottom = at(xi, yi + 1) + (at(xi + 1, yi + 1) - at(xi, yi + 1)) * u;
  return top + (bottom - top) * v;
}

function fbm(x, y) {
  let sum = 0, amp = 0.5, freq = 1;
  for (let i = 0; i < 4; i++) {
    sum += valueNoise(x * freq, y * freq) * amp;
    amp *= 0.5;
    freq *= 2;
  }
  return sum;
}

const lobes = Array.from({ length: 4 }, (_, i) => ({ k: i + 2, phase: rand() * Math.PI * 2, amp: 0.05 / (i + 1) }));
const edge = (theta) => 0.86 + lobes.reduce((r, l) => r + l.amp * Math.sin(l.k * theta + l.phase), 0);
const smoothstep = (a, b, x) => smooth(Math.min(1, Math.max(0, (x - a) / (b - a))));

const raw = Buffer.alloc((SIZE * 4 + 1) * SIZE);
for (let y = 0; y < SIZE; y++) {
  const row = y * (SIZE * 4 + 1);
  for (let x = 0; x < SIZE; x++) {
    const nx = (x + 0.5) / (SIZE / 2) - 1, ny = (y + 0.5) / (SIZE / 2) - 1;
    const r = Math.hypot(nx, ny);
    const R = edge(Math.atan2(ny, nx)) + (fbm(nx * 3 + 7, ny * 3 + 7) - 0.5) * 0.12;
    const body = 1 - smoothstep(R - 0.4, R, r);
    const texture = 0.88 + 0.12 * fbm(nx * 5, ny * 5);
    const alpha = Math.round(255 * body * texture * (1 - smoothstep(0.92, 1, r)));
    raw.set([255, 255, 255, alpha], row + 1 + x * 4);
  }
}

const crcTable = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
const crc32 = (buf) => {
  let c = 0xffffffff;
  for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};
const chunk = (type, data) => {
  const body = Buffer.concat([Buffer.from(type), data]);
  const len = Buffer.alloc(4), crc = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
};

const header = Buffer.alloc(13);
header.writeUInt32BE(SIZE, 0);
header.writeUInt32BE(SIZE, 4);
header.set([8, 6, 0, 0, 0], 8);

writeFileSync(out, Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  chunk("IHDR", header),
  chunk("IDAT", deflateSync(raw, { level: 9 })),
  chunk("IEND", Buffer.alloc(0)),
]));
console.log(`wrote ${out}`);
