"use client";

import { useRef } from "react";
import type { ShaderMaterial } from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Glow } from "../primitives/Glow";
import {
  PATTERN,
  placeCamera,
  seated,
  setFade,
  setReveal,
  setStrength,
  Sheet,
  Sketch,
  Strokes,
  tent,
  throne,
  useDrawing,
  useStroke,
} from "../primitives/Pattern";
import { smoothstep, useSceneTime } from "../primitives/Timeline";
import { setUniform } from "../primitives/mutate";

const PERIOD = 16;
const K = 1.7;
const HALF_W = K / 2;
const HALF_L = (3 * K) / 2;
const BACK = -HALF_L + 0.25;
const THRONE_W = 0.74;
/** Seen from the door, the throne's right hand is the viewer's left. */
const RIGHT_HAND = -0.56;

const TENT = tent(new Sketch(), [0, 0, 0], K, { open: true });
const CORDS = (() => {
  const sk = new Sketch();
  for (const sx of [-1, 1]) {
    for (const z of [-HALF_L, HALF_L]) {
      const px = sx * (HALF_W + 0.85);
      sk.line([px, 0, z], [sx * HALF_W, K, z]);
      sk.poly(
        [
          [px - 0.07, 0, z],
          [px + 0.07, 0, z],
          [px, 0, z + 0.07],
        ],
        true,
      );
    }
  }
  return sk;
})();
const SEAT = throne(new Sketch(), 0.28, 0, BACK, THRONE_W);
const BENCH = new Sketch().poly(
  [
    [RIGHT_HAND - 0.3, 0.3, BACK],
    [RIGHT_HAND + 0.3, 0.3, BACK],
    [RIGHT_HAND + 0.3, 0, BACK],
    [RIGHT_HAND - 0.3, 0, BACK],
  ],
  true,
);
const SON = seated(BENCH, RIGHT_HAND, 0.3, BACK + 0.1, 0.56);

/** “In the true tent that the Lord set up, not man”: seen from the door, the gold tent raises itself with no hands on it, the cords pull taut, and one sits at the right hand of the throne. */
export function TrueTentScene({ mobile, effects }: SceneProps) {
  const ink = useDrawing();
  const walls = useStroke(ink, TENT, {
    color: PATTERN.gold,
    width: 2,
    opacity: 0.8,
    halo: !mobile,
  });
  const cords = useStroke(ink, CORDS, {
    color: PATTERN.gold,
    width: 1.3,
    opacity: 0.7,
  });
  const seat = useStroke(ink, SEAT, {
    color: PATTERN.bright,
    width: 2.4,
    halo: !mobile,
  });
  const son = useStroke(ink, SON, {
    color: PATTERN.bright,
    width: 2.8,
    halo: !mobile,
  });
  const majesty = useRef<ShaderMaterial | null>(null);

  useSceneTime((t, _dt, state) => {
    const p = t % PERIOD;
    const fade = smoothstep(0, 0.8, p) * (1 - smoothstep(14.6, 16, p));
    setFade(ink, fade);
    placeCamera(state.camera, state, t, {
      dist: 11,
      elevation: 0.1,
      azimuth: 0.04,
      look: [0, 0.2, 0],
      sway: 0.05,
    });
    setReveal(walls, smoothstep(0.8, 6.4, p));
    setReveal(cords, smoothstep(5.6, 7.4, p));
    setStrength(walls, 1 - 0.6 * smoothstep(7, 9, p));
    setReveal(seat, smoothstep(7.2, 9, p));
    setReveal(son, smoothstep(8.6, 10.8, p));
    if (majesty.current)
      setUniform(
        majesty.current,
        "uAlpha",
        0.5 * smoothstep(7.5, 10, p) * fade,
      );
  });

  return (
    <>
      <Sheet ink={ink} />
      <Glow
        position={[0.28, 0.9, BACK - 0.05]}
        size={3}
        color={PATTERN.gold}
        inner={PATTERN.bright}
        alpha={0}
        power={2.2}
        renderOrder={2}
        onMaterial={(m) => {
          majesty.current = m;
        }}
      />
      <group rotation={[0, -Math.PI / 2, 0]}>
        <Strokes stroke={walls} />
      </group>
      <Strokes stroke={cords} />
      <Strokes stroke={seat} />
      <Strokes stroke={son} />
      {effects && <SceneEffects bloom={0.3} threshold={0.85} vignette={0.25} />}
    </>
  );
}
