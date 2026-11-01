"use client";

import type { SceneProps } from "../registry";
import { Plate, type Frame } from "../primitives/Beaten";
import {
  altar,
  ark,
  curtain,
  floor,
  lampstand,
  smoke,
  table,
} from "../primitives/beatenArt";

const SAFE = [0.05, 0.94] as const;

function furnishing(paint: (t: number) => void, frame: Frame) {
  const scene = ({ mobile, effects }: SceneProps) => (
    <Plate
      paint={(t) => {
        floor();
        paint(t);
      }}
      period={8}
      hold={8}
      mobile={mobile}
      effects={effects}
      frame={frame}
      safe={SAFE}
    />
  );
  return scene;
}

export const FurnTableScene = furnishing(
  () => table(800, 610, 1.16),
  [440, 300, 720, 322],
);
export const FurnLampstandScene = furnishing(
  (t) => lampstand(800, 610, 1.1, t),
  [530, 150, 540, 472],
);
export const FurnCurtainScene = furnishing(
  () => curtain(480, 54, 640, 556),
  [440, 30, 720, 592],
);
export const FurnAltarScene = furnishing(
  (t) => {
    altar(800, 610, 1.4);
    smoke(800, 200, 0.5, t);
  },
  [540, 60, 520, 562],
);
export const FurnArkScene = furnishing(
  () => ark(800, 610, 1),
  [440, 230, 720, 392],
);
