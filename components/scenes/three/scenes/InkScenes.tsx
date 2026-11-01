"use client";

import type { SceneProps } from "../registry";
import { InkWash } from "../primitives/Ink";
import {
  anchor,
  band,
  boat,
  cable,
  curtain,
  elder,
  bramble,
  fire,
  FLOOR,
  footprint,
  grain,
  headland,
  light,
  nightSky,
  paperStars,
  person,
  rain,
  ridge,
  sand,
  sandGrains,
  sea,
  shaft,
  sky,
  soaked,
  stone,
  stubble,
  surface,
} from "../primitives/inkArt";
import type { Route } from "../primitives/route";
import { smoothstep } from "../primitives/Timeline";

const PERIOD = 16;
const HERO_HOLD = 9.5;
const TITLE_BLOCK = 556;
const HOPE_ROUTE: Route = [
  [0, 0],
  [6, 0],
  [9.5, 1],
];

const hash = (i: number) => {
  const n = Math.sin(i * 127.1) * 43758.5453;
  return n - Math.floor(n);
};

function paintHero(t: number, clock: number) {
  sky(0.5, clock);
  ridge(1.4, 410, 70, 0.3, 60);
  sea(430, FLOOR + 160, 0.42, 0.74, clock);
  light(760, 426, 300, 0.85 * smoothstep(0, 6, t));
  headland(
    [
      [-700, 570],
      [-500, 400],
      [-100, 390],
      [90, 382],
      [250, 406],
      [380, 480],
      [470, 570],
    ],
    0.84,
  );
  headland(
    [
      [1210, 570],
      [1290, 458],
      [1420, 406],
      [1700, 390],
      [2100, 400],
      [2400, 570],
    ],
    0.9,
  );
  boat(
    620 + Math.sin(clock * 0.5) * 10,
    520,
    0.82,
    Math.sin(clock * 0.9) * 0.05,
  );
  rain(900, 2300, 0, 520, 190, clock, 0.5);
}

/** Hebrews 6 opening: a bay in ink as the rain moves off, a boat riding at anchor, and a break of light left as bare paper. */
export function HeroInkScene({ mobile, effects }: SceneProps) {
  return (
    <InkWash
      paint={paintHero}
      period={12}
      hold={HERO_HOLD}
      mobile={mobile}
      effects={effects}
      reserve={TITLE_BLOCK}
      reach={430}
      focus={700}
    />
  );
}

function paintFoundation(t: number) {
  sky(0.34, t, 12);
  ridge(3.2, 390, 60, 0.3, 50);
  sea(420, 520, 0.36, 0.46, t);
  ridge(0.9, 540, 56, 0.6, 160, 0.62);
  band(600, FLOOR + 160, 0.62, 0.84, 0.62);
  const base = 588;
  for (let i = 0; i < 6; i++) {
    soaked(smoothstep(0.4 + i * 0.3, 0.9 + i * 0.3, t), () =>
      stone(370 + i * 146, base, 140, 60, 0.7 + hash(i) * 0.16),
    );
  }
  let n = 0;
  for (let r = 1; r < 5; r++) {
    const stones = 6 - (r > 2 ? 1 : 0) - (r > 3 ? 1 : 0);
    for (let i = 0; i < stones; i++) {
      const a = smoothstep(3 + n * 0.4, 3.5 + n * 0.4, t);
      n++;
      soaked(a, () =>
        stone(
          370 + (r % 2) * 72 + i * 146,
          base - r * 62 - (1 - a) * 26,
          140,
          60,
          0.62 + hash(r * 7 + i) * 0.22,
        ),
      );
    }
  }
}

/** Verses 1–3: six cut stones are laid once on the headland, and course by course a wall rises on them. */
export function FoundationScene({ mobile, effects }: SceneProps) {
  return (
    <InkWash
      paint={paintFoundation}
      period={PERIOD}
      mobile={mobile}
      effects={effects}
    />
  );
}

function paintRain(t: number) {
  sky(0.42, t, 14);
  ridge(2.2, 430, 44, 0.22, 70);
  band(600, FLOOR + 160, 0.34, 0.8, 0.5);
  ridge(0.5, 624, 22, 0.5, 60, 0.5);
  const up = smoothstep(1, 8, t);
  for (let i = 0; i < 15; i++) {
    const x = 90 + i * 40 + hash(i) * 16;
    grain(x, 620, 210 + hash(i + 20) * 70, Math.sin(t * 0.8 + i) * 5, up);
  }
  const burn = smoothstep(9, 10.6, t);
  const gone = smoothstep(11.4, 13.4, t);
  for (let i = 0; i < 9; i++) {
    const x = 900 + i * 64;
    const left = 1 - gone;
    bramble(
      x,
      620,
      190 + hash(i + 3) * 80,
      i % 2 ? 90 : -70,
      i,
      up * (0.14 + 0.86 * left),
    );
    if (gone > 0.6) stubble(x, 620);
    fire(
      x + 16,
      622,
      burn * (0.2 + 0.8 * left) * (150 + hash(i + 9) * 110),
      t,
      i * 7,
    );
  }
  rain(-500, 2100, 0, 640, 240, t, 0.5);
}

/** Verses 4–8: the same rain on two plots; one brings up tall grain, the other thorns, and those burn in the only colour on the page. */
export function RainScene({ mobile, effects }: SceneProps) {
  return (
    <InkWash
      paint={paintRain}
      period={PERIOD}
      mobile={mobile}
      effects={effects}
      route={HOPE_ROUTE}
    />
  );
}

function step(i: number) {
  const k = i / 15;
  const e = k * k;
  return [
    820 + (1 - e) * 40 + (i % 2 ? 10 * e + 3 : -10 * e - 3),
    396 + e * 310,
    2 + e * 20,
  ] as const;
}

function paintFootsteps(t: number) {
  sky(0.34, t, 12);
  ridge(1.1, 370, 50, 0.28, 40);
  light(830, 360, 280, 0.85);
  sea(386, FLOOR + 160, 0.36, 0.66, t);
  sand([
    [790, 382],
    [900, 382],
    [1120, 440],
    [1440, 550],
    [1900, 640],
    [1900, 840],
    [240, 840],
    [640, 530],
  ]);
  headland(
    [
      [1090, 410],
      [1140, 350],
      [1250, 332],
      [1360, 370],
      [1420, 422],
    ],
    0.84,
    0.3,
  );
  person(842, 386, 72, { v: 0.98 });
  for (let i = 0; i < 16; i++) {
    const [x, y, s] = step(i);
    footprint(x, y, s, 0.56);
    const a = smoothstep(1.2 + (15 - i) * 0.6, 1.6 + (15 - i) * 0.6, t);
    footprint(x, y, s * 0.72, 0.96, a);
  }
}

/** Verses 9–12: new steps are pressed one by one into the old prints, following those who went ahead. */
export function FootstepsScene({ mobile, effects }: SceneProps) {
  return (
    <InkWash
      paint={paintFootsteps}
      period={PERIOD}
      mobile={mobile}
      effects={effects}
      focus={830}
    />
  );
}

function paintOath(t: number) {
  const on = smoothstep(0.8, 11, t);
  nightSky(490);
  paperStars(Math.floor(620 * on), 330);
  sea(490, 540, 0.3, 0.42, t * 0.4);
  band(540, FLOOR + 160, 0.1, 0.5, 0.5);
  sandGrains(Math.floor(1500 * on), 546, 116);
  elder(980, 616, 300);
}

/** Verses 13–15: Abraham at the water’s edge, large against a pale horizon, with stars of bare paper in the black wash above him and as many ink grains in the sand below. */
export function OathScene({ mobile, effects }: SceneProps) {
  return (
    <InkWash
      paint={paintOath}
      period={PERIOD}
      mobile={mobile}
      effects={effects}
      focus={920}
    />
  );
}

function paintAnchor(t: number) {
  band(0, 190, 0.16, 0.3);
  band(190, FLOOR + 160, 0.42, 1);
  const pitch = Math.sin(t * 0.9);
  const bx = 430 + Math.sin(t * 0.5) * 12;
  const by = 182 + pitch * 12;
  surface(190, t);
  boat(bx, by, 0.72, pitch * 0.16);
  for (let i = 0; i < 4; i++) shaft(160 + i * 230, 190, 660, 70, t, i);
  const reveal = smoothstep(1, 6, t);
  const cx = 1230;
  const ax = 1190;
  const ay = 430 + pitch * 3;
  light(cx, 420, 300, 0.7 * reveal);
  cable(bx + 30, by + 14, ax, ay - 134);
  anchor(ax, ay, 0.96);
  curtain(cx, 90, 840, 24, reveal);
}

/** Verses 16–20: the boat pitches on the swell, but its line runs down taut to an anchor gone in behind the curtain. Christ is shown only as the light there, with no human outline. */
export function AnchorScene({ mobile, effects }: SceneProps) {
  return (
    <InkWash
      paint={paintAnchor}
      period={PERIOD}
      mobile={mobile}
      effects={effects}
      reach={625}
      span={2000}
      focus={900}
    />
  );
}
