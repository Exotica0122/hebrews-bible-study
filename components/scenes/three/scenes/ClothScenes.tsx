"use client";

import type { SceneProps } from "../registry";
import type { Frame } from "../primitives/Beaten";
import { Embroidery, type Route } from "../primitives/Cloth";
import {
  altar,
  ark,
  basket,
  bird,
  cave,
  chain,
  chest,
  city,
  FLOOR,
  footprints,
  furnace,
  gold,
  ground,
  hill,
  jericho,
  lion,
  moon,
  mountain,
  needle,
  person,
  rainCloud,
  reeds,
  ridge,
  sheep,
  smoke,
  stars,
  sun,
  tent,
  thread,
  tree,
  waves,
  withinBox,
  withinCircle,
  wood,
} from "../primitives/clothArt";
import { smoothstep } from "../primitives/Timeline";

const PERIOD = 16;
const TONES = [0.78, 0.62, 0.94, 0.46, 0.78, 0.62];

const HERO_FRAME: Frame = [0, 60, 1600, FLOOR - 60];
const HERO_SAFE = [0.09, 0.6] as const;
const TITLE_BLOCK = 556;
const HERO_HOLD = 9.5;
const HERO_PAN = 1660;
const LAST_STITCH = 2990;

/** Stitches a group in from the ground up. */
const stitchUp = (x: number, w: number, a: number, draw: () => void) =>
  withinBox(x, FLOOR + 14 - 320 * a, w, 320 * a, draw);

const ROUTES: Record<string, Route> = {
  stillSpeaks: [
    [0, 0],
    [3.4, 0],
    [5.2, 0.4],
    [8.2, 0.4],
    [10, 1],
  ],
  afar: [
    [0, 0],
    [3, 0],
    [9, 1],
  ],
  receivedBack: [
    [0, 0],
    [8, 0],
    [11, 1],
  ],
  invisible: [
    [0, 0],
    [5.6, 0],
    [9, 1],
  ],
  notWorthy: [
    [0, 0],
    [3, 0],
    [7, 1],
  ],
  apartFromUs: [
    [0, 0],
    [3, 0],
    [8, 1],
  ],
};

const heroPan = (t: number) => smoothstep(0.4, HERO_HOLD, t) * HERO_PAN;

function paintHero(t: number) {
  ridge(1.2, 330, 150, 0.3, -1000, LAST_STITCH - 60);
  ground(-1000, LAST_STITCH);
  ark(330, FLOOR, 1.05);
  sheep(610, FLOOR, 1);
  sheep(690, FLOOR, 0.9, -1);
  tent(900, FLOOR, 1);
  tent(1110, FLOOR, 0.8);
  person(760, FLOOR, 176, { staff: true, tone: 0.62, walk: t * 3 });
  waves(1240, FLOOR, 220, 300, t);
  waves(1600, FLOOR, 220, 300, t);
  for (let i = 0; i < 4; i++)
    person(1470 + i * 40, FLOOR, 128, {
      tone: TONES[i],
      walk: t * 3 + i,
    });
  jericho(1870, FLOOR, 0.9, 0);
  for (let i = 0; i < 6; i++)
    person(2460 + i * 76, FLOOR, 164 + (i % 3) * 8, {
      tone: TONES[i],
      staff: i % 3 === 1,
    });
  thread(2860, LAST_STITCH, FLOOR + 8);
  needle(3080, FLOOR, LAST_STITCH, FLOOR + 8, 14 * Math.sin(t * 2.6));
  gold(3420, 330, 420, smoothstep(5, HERO_HOLD, t));
}

/** Hebrews 11 opening: the long cloth passes the ark, the tents, the sea and Jericho and stops unfinished, with Christ shown only as the light at its far edge. */
export function HeroClothScene({ mobile, effects, pointer }: SceneProps) {
  return (
    <Embroidery
      paint={paintHero}
      period={12}
      hold={HERO_HOLD}
      mobile={mobile}
      effects={effects}
      frame={HERO_FRAME}
      safe={HERO_SAFE}
      reserve={TITLE_BLOCK}
      pan={heroPan}
      pointer={pointer}
    />
  );
}

function paintNotSeen(t: number) {
  gold(800, 340, 300, smoothstep(0.6, 3, t) * (1 - smoothstep(2.4, 5, t)));
  withinCircle(800, 400, smoothstep(2, 11, t) * 1200, () => {
    stars(40, 1, 250);
    sun(290, 200, 54);
    moon(1280, 190, 46);
    ridge(2.1, 400, 150, 0.3);
    ridge(4.6, 490, 120, 0.46);
    ground();
    tree(360, FLOOR, 1.15);
    tree(490, FLOOR, 0.82);
    tree(1210, FLOOR, 1.28);
    tree(1090, FLOOR, 0.78);
    for (let i = 0; i < 6; i++) bird(640 + i * 66, 250 + ((i * 37) % 60), 1);
    for (let i = 0; i < 4; i++) sheep(680 + i * 76, FLOOR, 1);
  });
}

/** Verses 1–3: bare linen, a light, and then the whole visible world stitched out of nothing that was there. */
export function NotSeenScene({ mobile, effects, pointer }: SceneProps) {
  return (
    <Embroidery
      paint={paintNotSeen}
      period={PERIOD}
      mobile={mobile}
      effects={effects}
      pointer={pointer}
    />
  );
}

function paintStillSpeaks(t: number) {
  ridge(0.7, 370, 80, 0.3);
  ground();
  smoke(205, 480, 340, t, 0, 0.3);
  altar(205, FLOOR, 0.9, 0.8, t);
  person(84, FLOOR, 168, { lift: 0.72, tone: 0.94 });
  smoke(425, 520, 120, t, 130, 0.3);
  altar(425, FLOOR, 0.58, 0.32, t);
  person(535, FLOOR, 160, { tone: 0.46, face: -1 });

  const stride = smoothstep(0.5, 5, t);
  footprints(640, 5, stride);
  withinBox(0, 0, 1600, FLOOR + 14 - smoothstep(5.2, 7.6, t) * 200, () =>
    person(640 + stride * 170, FLOOR, 170, {
      tone: 0.62,
      walk: t * 3,
    }),
  );

  ark(1290, FLOOR, 0.9, smoothstep(1.6, 9.5, t));
  person(1000, FLOOR, 170, {
    lift: 0.46 + 0.22 * Math.abs(Math.sin(t * 2.2)),
    tone: 0.78,
  });
  withinBox(960, 0, smoothstep(9, 12.4, t) * 700, FLOOR, () => rainCloud(t));
}

/** Verses 4–7: Abel’s smoke rises and Cain’s bends, Enoch walks and is gone, and Noah builds before any rain has come. */
export function StillSpeaksScene({ mobile, effects, pointer }: SceneProps) {
  return (
    <Embroidery
      paint={paintStillSpeaks}
      route={ROUTES.stillSpeaks}
      period={PERIOD}
      mobile={mobile}
      effects={effects}
      pointer={pointer}
    />
  );
}

function paintAfar(t: number) {
  stars(170, smoothstep(1, 11, t), 340);
  ridge(3.3, 450, 70, 0.3);
  ground();
  const near = smoothstep(5.5, 10, t);
  gold(1340, 360, 210, near);
  withinBox(1100, 452 - 220 * near, 480, 220 * near, () =>
    city(1340, 440, 1.05),
  );
  tent(280, FLOOR, 1.14);
  tent(540, FLOOR, 0.88);
  tent(96, FLOOR, 0.72);
  const walk = smoothstep(1.4, 10, t);
  for (let i = 0; i < 5; i++)
    sheep(420 + i * 66 + walk * 170, FLOOR, 0.86 + (i % 2) * 0.1);
  person(660 + walk * 210, FLOOR, 168, {
    tone: 0.94,
    hood: 0.46,
    walk: walk < 1 ? t * 3 : undefined,
  });
  person(730 + walk * 210, FLOOR, 190, {
    tone: 0.78,
    hood: 0.62,
    staff: true,
    lift: 0.42 + smoothstep(9, 11.5, t) * 0.34,
    walk: walk < 1 ? t * 3 + 1 : undefined,
  });
}

/** Verses 8–16: tents on the plain, stars past counting, and the city on its foundations seen only from far away. */
export function AfarScene({ mobile, effects, pointer }: SceneProps) {
  return (
    <Embroidery
      paint={paintAfar}
      route={ROUTES.afar}
      period={PERIOD}
      mobile={mobile}
      effects={effects}
      pointer={pointer}
    />
  );
}

function paintReceivedBack(t: number) {
  ridge(5.2, 420, 60, 0.3);
  hill([
    [-60, FLOOR + 10],
    [90, 520],
    [240, 440],
    [400, 416],
    [560, 470],
    [720, 570],
    [800, FLOOR + 10],
  ]);
  ground();
  const raised = smoothstep(1.2, 3.6, t);
  const stayed = smoothstep(5.8, 7.6, t);
  const up = smoothstep(7.4, 10, t);
  gold(400, 210, 120, stayed);
  altar(400, 424, 0.72);
  wood(400, 336, 150);
  person(244, 436, 176, {
    tone: 0.62,
    hood: 0.94,
    lift: 0.5 + raised * (1 - stayed) * 0.4,
  });
  person(400 + up * 112, 312 + up * 112, 92 + up * 34, {
    tone: 0.94,
    hood: 0.46,
    face: -1,
    bow: 0.5 * (1 - up),
  });

  stitchUp(700, 250, smoothstep(8.2, 10, t), () => {
    person(770, FLOOR, 168, { tone: 0.94, hood: 0.3, lift: 0.5 });
    person(842, FLOOR, 132, { tone: 0.78 });
    person(900, FLOOR, 136, { tone: 0.46 });
  });
  stitchUp(970, 250, smoothstep(9.4, 11.2, t), () => {
    person(1040, FLOOR, 172, { tone: 0.78, hood: 0.94, staff: true, bow: 0.8 });
    person(1120, FLOOR, 96, { tone: 0.62 });
    person(1176, FLOOR, 90, { tone: 0.46 });
  });
  stitchUp(1220, 380, smoothstep(10.6, 12.4, t), () => {
    chest(1330, FLOOR - 40, 190);
    person(1262, FLOOR, 152, { tone: 0.62, lift: 0.46 });
    person(1570, FLOOR, 152, { tone: 0.78, face: -1, lift: 0.46 });
  });
}

/** Verses 17–22: Isaac received back on Moriah, the blessing passed on, and Joseph’s bones made ready. */
export function ReceivedBackScene({ mobile, effects, pointer }: SceneProps) {
  return (
    <Embroidery
      paint={paintReceivedBack}
      route={ROUTES.receivedBack}
      period={PERIOD}
      mobile={mobile}
      effects={effects}
      pointer={pointer}
    />
  );
}

function paintInvisible(t: number) {
  ridge(1.6, 380, 60, 0.3);
  ground();
  reeds(16, FLOOR);
  basket(84, FLOOR);
  const open = smoothstep(1, 4.6, t);
  const gap = 40 + open * 140;
  waves(160, FLOOR, 310 - gap / 2, 330, t);
  waves(470 + gap / 2, FLOOR, 310 - gap / 2, 330, t);
  for (let i = 0; i < 5; i++) {
    const go = smoothstep(3.4 + i * 0.5, 10 + i * 0.3, t);
    if (go > 0)
      person(170 + go * (780 - i * 44), FLOOR, 124, {
        tone: TONES[i],
        walk: go < 1 ? t * 3 + i : undefined,
      });
  }
  jericho(1000, FLOOR, 0.98, smoothstep(9, 12.6, t));
}

/** Verses 23–31: the basket in the reeds, the sea standing open, and Jericho down with the scarlet cord still hanging. */
export function InvisibleScene({ mobile, effects, pointer }: SceneProps) {
  return (
    <Embroidery
      paint={paintInvisible}
      route={ROUTES.invisible}
      period={PERIOD}
      mobile={mobile}
      effects={effects}
      pointer={pointer}
    />
  );
}

function paintNotWorthy(t: number) {
  ridge(2.8, 330, 110, 0.3);
  mountain(1190, FLOOR, 860, 390);
  ground();
  cave(1040, FLOOR, 1);
  cave(1320, FLOOR, 0.9);
  cave(1170, 400, 0.62);
  lion(150, FLOOR, 1);
  person(322, FLOOR, 170, { tone: 0.94, hood: 0.46, face: -1, lift: 0.8 });
  furnace(510, FLOOR, t);
  person(690, FLOOR, 162, { tone: 0.78, lift: 0.42 });
  chain(706, FLOOR - 76, 8);
  const walk = smoothstep(1, 13, t);
  withinBox(700, 0, 310, FLOOR + 14, () => {
    for (let i = 0; i < 5; i++)
      person(760 + i * 66 + walk * 330, FLOOR, 136, {
        tone: 0.62,
        hood: 0.94,
        staff: i % 2 === 0,
        walk: t * 2.6 + i,
      });
  });
}

/** Verses 32–38: victories and chains on one cloth, and people in skins walking on toward the caves. */
export function NotWorthyScene({ mobile, effects, pointer }: SceneProps) {
  return (
    <Embroidery
      paint={paintNotWorthy}
      route={ROUTES.notWorthy}
      period={PERIOD}
      mobile={mobile}
      effects={effects}
      pointer={pointer}
    />
  );
}

function paintApartFromUs(t: number) {
  const end = 1180;
  ridge(4.2, 390, 50, 0.3, -1000, end + 30);
  ground(-1000, end + 60);
  const gather = smoothstep(0.8, 7, t);
  for (let i = 0; i < 11; i++)
    person(40 + i * 96 + gather * 14, FLOOR, 152 + ((i * 7) % 5) * 9, {
      tone: TONES[i % TONES.length],
      hood: i % 4 === 2 ? 0.46 : undefined,
      staff: i % 3 === 1,
      walk: gather < 1 ? t * 3 + i : undefined,
    });
  const rise = smoothstep(6.4, 13.4, t);
  withinBox(end - 60, FLOOR - 200 * rise - 2, 200, 200 * rise + 40, () =>
    person(end + 40, FLOOR, 182, { tone: 0.94, hood: 0.3 }),
  );
  needle(
    end + 220,
    FLOOR - 70 - 90 * (1 - rise),
    end + 66,
    FLOOR - 200 * rise,
    14 * Math.sin(t * 2.6),
  );
  gold(1700, 340, 420, smoothstep(3, 11, t));
}

/** Verses 39–40: the line of witnesses waits where the stitching ends, one more figure is still being sewn, and Christ is shown only as the light ahead. */
export function ApartFromUsScene({ mobile, effects, pointer }: SceneProps) {
  return (
    <Embroidery
      paint={paintApartFromUs}
      route={ROUTES.apartFromUs}
      period={PERIOD}
      mobile={mobile}
      effects={effects}
      pointer={pointer}
    />
  );
}
