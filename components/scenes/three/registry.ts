import type { ComponentType, RefObject } from "react";
import type { SceneId } from "../types";
import { HeroScene } from "./scenes/HeroScene";
import { HeroRoadScene } from "./scenes/HeroRoadScene";
import { RadianceScene } from "./scenes/RadianceScene";
import { SealScene } from "./scenes/SealScene";
import { AngelsScene } from "./scenes/AngelsScene";
import { ThroneScene } from "./scenes/ThroneScene";
import { FoldScene } from "./scenes/FoldScene";
import { ExaltedScene } from "./scenes/ExaltedScene";
import { DriftScene } from "./scenes/DriftScene";
import { CrownedScene } from "./scenes/CrownedScene";
import { GatherScene } from "./scenes/GatherScene";
import { FreedScene } from "./scenes/FreedScene";

export interface DragState {
  dx: number;
  active: boolean;
}

export interface PointerState {
  x: number;
  y: number;
}

export interface SceneProps {
  mobile: boolean;
  effects: boolean;
  captions?: RefObject<(HTMLElement | null)[]>;
  drag?: RefObject<DragState>;
  pointer?: RefObject<PointerState>;
}

export const registry: Record<SceneId, ComponentType<SceneProps>> = {
  hero: HeroScene,
  heroEarth: HeroRoadScene,
  radiance: RadianceScene,
  seal: SealScene,
  angels: AngelsScene,
  throne: ThroneScene,
  fold: FoldScene,
  exalted: ExaltedScene,
  drift: DriftScene,
  crowned: CrownedScene,
  gather: GatherScene,
  freed: FreedScene,
};
