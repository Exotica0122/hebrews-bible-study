"use client";

import { useMemo, useRef } from "react";
import { damp } from "maath/easing";
import type { Material } from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import {
  contours,
  court,
  Dimension,
  hatch,
  Occluder,
  PATTERN,
  placeCamera,
  Print,
  setReveal,
  Sheet,
  Sketch,
  Strokes,
  tent,
  usePrint,
  useDrawing,
  useStroke,
  type V3,
} from "../primitives/Pattern";
import { smoothstep, useSceneTime } from "../primitives/Timeline";
import { setOpacity } from "../primitives/mutate";

const COPY_AT: V3 = [-2, 0, 0];
const TRUE_Y = 3.4;
const TRUE_K = 1.3;
const HILL = new Sketch();
contours(HILL, -6.2, -3.6, 3.1, 9, 0.17);
const COPY = tent(court(new Sketch()), COPY_AT);
const TRUE_TENT = tent(new Sketch(), [-2, TRUE_Y, 0], TRUE_K);
const DROP = (() => {
  const sk = new Sketch();
  const x = 1.5 * TRUE_K;
  const z = 0.5 * TRUE_K;
  const corners: [V3, V3][] = [
    [
      [-2 - x, TRUE_Y, -z],
      [-3.5, 1, -0.5],
    ],
    [
      [-2 + x, TRUE_Y, -z],
      [-0.5, 1, -0.5],
    ],
    [
      [-2 + x, TRUE_Y, z],
      [-0.5, 1, 0.5],
    ],
    [
      [-2 - x, TRUE_Y, z],
      [-3.5, 1, 0.5],
    ],
  ];
  corners.forEach(([a, b]) => sk.line(a, b));
  return sk;
})();
const PRINT_HATCH = hatch(-2, 0, 3.8, 1.5);

/** Hebrews 8 opening: the plan of the court drawn in white on a blue sheet, the mountain in contours behind it, and the true tent above in gold. */
export function HeroPatternScene({ mobile, effects, pointer }: SceneProps) {
  const ink = useDrawing();
  const hill = useStroke(ink, HILL, { width: 1.5, opacity: 0.5 });
  const copy = useStroke(ink, COPY, { width: 1.7 });
  const truth = useStroke(ink, TRUE_TENT, {
    color: PATTERN.gold,
    width: 2.6,
    halo: !mobile,
  });
  const drop = useStroke(ink, DROP, {
    color: PATTERN.gold,
    width: 1.5,
    opacity: 0.7,
    dash: 5,
  });
  const lines = usePrint(ink, PRINT_HATCH);
  const printMat = useRef<Material | null>(null);
  const turn = useRef(0);
  const view = useMemo(
    () =>
      mobile
        ? ({
            dist: 21,
            elevation: 0.52,
            azimuth: 1.05,
            look: [0.2, -6.6, 0],
            sway: 0.05,
          } as const)
        : ({
            dist: 46,
            elevation: 0.34,
            azimuth: 0.22,
            look: [-0.4, -2.7, 0],
            sway: 0.05,
          } as const),
    [mobile],
  );

  useSceneTime((t, dt, state) => {
    damp(turn, "current", (pointer?.current.x ?? 0) * 0.06, 0.9, dt);
    placeCamera(state.camera, state, t, {
      ...view,
      look: [...view.look],
      turn: turn.current,
    });
    setReveal(hill, smoothstep(0, 2.2, t));
    setReveal(copy, smoothstep(0.6, 4, t));
    setReveal(truth, smoothstep(2.5, 6.5, t));
    setReveal(drop, smoothstep(5.5, 7, t));
    setReveal(lines, smoothstep(6.5, 8.5, t));
    if (printMat.current)
      setOpacity(printMat.current, 0.26 * smoothstep(6.5, 8.5, t));
  });

  return (
    <>
      <Sheet ink={ink} />
      <Strokes stroke={hill} />
      <Occluder position={[-2, 0.5, 0]} size={[3, 1, 1]} />
      <Strokes stroke={copy} />
      <Print
        stroke={lines}
        x={-2}
        z={0}
        width={3.8}
        depth={1.5}
        onMaterial={(m) => {
          printMat.current = m;
        }}
      />
      <Strokes stroke={truth} />
      <Strokes stroke={drop} />
      <Dimension text="100 × 50" position={[0.2, 0.75, -3.1]} width={2} />
      {effects && <SceneEffects bloom={0.2} threshold={0.9} vignette={0.25} />}
    </>
  );
}
