"use client";

import { useRef } from "react";
import type { Material } from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import {
  court,
  hatch,
  PATTERN,
  placeCamera,
  Print,
  setFade,
  setReveal,
  setStrength,
  setWear,
  Sheet,
  Sketch,
  Strokes,
  tent,
  usePrint,
  useDrawing,
  useStroke,
} from "../primitives/Pattern";
import { smoothstep, useSceneTime } from "../primitives/Timeline";
import { setOpacity } from "../primitives/mutate";

const PERIOD = 16;
const OLD = tent(court(new Sketch()), [0, 0, 0]);
const TRUE_TENT = tent(new Sketch(), [0, 3.2, 0], 1.25);
const PRINT_HATCH = hatch(0, 0, 3.4, 1.3);

/** “Growing old and ready to vanish”: the white copy wears away stitch by stitch until only its faint print is left, beneath the tent that remains. */
export function VanishScene({ mobile, effects }: SceneProps) {
  const ink = useDrawing();
  const old = useStroke(ink, OLD, { width: 1.9 });
  const truth = useStroke(ink, TRUE_TENT, {
    color: PATTERN.gold,
    width: 2.5,
    halo: !mobile,
  });
  const lines = usePrint(ink, PRINT_HATCH);
  const printMat = useRef<Material | null>(null);

  useSceneTime((t, _dt, state) => {
    const p = t % PERIOD;
    const fade = smoothstep(0, 0.8, p) * (1 - smoothstep(14.6, 16, p));
    setFade(ink, fade);
    placeCamera(state.camera, state, t, {
      dist: 40,
      elevation: 0.42,
      azimuth: 0.42,
      look: [0, -0.8, 0],
    });
    setReveal(old, 1.01 * smoothstep(0, 1.5, p));
    setReveal(truth, smoothstep(0.5, 2.5, p));
    setStrength(truth, 0.3 + 0.7 * smoothstep(6, 12, p));
    setWear(old, smoothstep(3, 11.5, p));
    const print = smoothstep(0, 1, p) * (1 - 0.65 * smoothstep(9, 13, p));
    setReveal(lines, 1);
    setStrength(lines, print);
    if (printMat.current) setOpacity(printMat.current, 0.26 * print * fade);
  });

  return (
    <>
      <Sheet ink={ink} />
      <Print
        stroke={lines}
        x={0}
        z={0}
        width={3.4}
        depth={1.3}
        onMaterial={(m) => {
          printMat.current = m;
        }}
      />
      <Strokes stroke={old} />
      <Strokes stroke={truth} />
      {effects && <SceneEffects bloom={0.2} threshold={0.9} vignette={0.25} />}
    </>
  );
}
