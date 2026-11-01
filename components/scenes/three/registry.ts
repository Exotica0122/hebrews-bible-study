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
import { HeroCampScene } from "./scenes/HeroCampScene";
import { TabernacleScene } from "./scenes/TabernacleScene";
import { RockScene } from "./scenes/RockScene";
import { CoalsScene } from "./scenes/CoalsScene";
import { ThresholdScene } from "./scenes/ThresholdScene";
import { HeroSanctuaryScene } from "./scenes/HeroSanctuaryScene";
import { OfferingScene } from "./scenes/OfferingScene";
import { DiademScene } from "./scenes/DiademScene";
import { CriesScene } from "./scenes/CriesScene";
import { BreadScene } from "./scenes/BreadScene";
import { HeroPatternScene } from "./scenes/HeroPatternScene";
import { TrueTentScene } from "./scenes/TrueTentScene";
import { PatternScene } from "./scenes/PatternScene";
import { SecondScene } from "./scenes/SecondScene";
import { HeartsScene } from "./scenes/HeartsScene";
import { VanishScene } from "./scenes/VanishScene";
import { HeroGoldScene } from "./scenes/HeroGoldScene";
import { HolyPlacesScene } from "./scenes/HolyPlacesScene";
import { NotYetScene } from "./scenes/NotYetScene";
import { OnceForAllScene } from "./scenes/OnceForAllScene";
import { CovenantBloodScene } from "./scenes/CovenantBloodScene";
import { SecondTimeScene } from "./scenes/SecondTimeScene";
import {
  FurnAltarScene,
  FurnArkScene,
  FurnCurtainScene,
  FurnLampstandScene,
  FurnTableScene,
} from "./scenes/FurnishingScenes";
import { HeroWallScene } from "./scenes/HeroWallScene";
import { ShadowScene } from "./scenes/ShadowScene";
import { BodyPreparedScene } from "./scenes/BodyPreparedScene";
import { SatDownScene } from "./scenes/SatDownScene";
import { DrawNearScene } from "./scenes/DrawNearScene";
import { FearfulScene } from "./scenes/FearfulScene";
import { SpectacleScene } from "./scenes/SpectacleScene";
import {
  HeroPaperScene,
  JordanScene,
  MercyScene,
  SeventhScene,
  SwordScene,
} from "./scenes/PaperScenes";
import {
  AriseScene,
  ForeverScene,
  HeroInlayScene,
  MeetingScene,
  SwornScene,
  TitheScene,
} from "./scenes/InlayScenes";
import {
  AnchorScene,
  FootstepsScene,
  FoundationScene,
  HeroInkScene,
  OathScene,
  RainScene,
} from "./scenes/InkScenes";
import {
  AfarScene,
  ApartFromUsScene,
  HeroClothScene,
  InvisibleScene,
  NotSeenScene,
  NotWorthyScene,
  ReceivedBackScene,
  StillSpeaksScene,
} from "./scenes/ClothScenes";

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
  heroCamp: HeroCampScene,
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
  tabernacle: TabernacleScene,
  rock: RockScene,
  coals: CoalsScene,
  threshold: ThresholdScene,
  heroGarden: HeroPaperScene,
  seventh: SeventhScene,
  jordan: JordanScene,
  sword: SwordScene,
  mercy: MercyScene,
  heroSanctuary: HeroSanctuaryScene,
  offering: OfferingScene,
  diadem: DiademScene,
  cries: CriesScene,
  bread: BreadScene,
  heroCoast: HeroInkScene,
  foundation: FoundationScene,
  rain: RainScene,
  footsteps: FootstepsScene,
  oath: OathScene,
  anchor: AnchorScene,
  heroSalem: HeroInlayScene,
  meeting: MeetingScene,
  tithe: TitheScene,
  arise: AriseScene,
  sworn: SwornScene,
  forever: ForeverScene,
  heroPattern: HeroPatternScene,
  trueTent: TrueTentScene,
  pattern: PatternScene,
  second: SecondScene,
  hearts: HeartsScene,
  vanish: VanishScene,
  heroGold: HeroGoldScene,
  holyPlaces: HolyPlacesScene,
  notYet: NotYetScene,
  onceForAll: OnceForAllScene,
  covenantBlood: CovenantBloodScene,
  secondTime: SecondTimeScene,
  furnTable: FurnTableScene,
  furnLampstand: FurnLampstandScene,
  furnCurtain: FurnCurtainScene,
  furnAltar: FurnAltarScene,
  furnArk: FurnArkScene,
  heroWall: HeroWallScene,
  shadow: ShadowScene,
  bodyPrepared: BodyPreparedScene,
  satDown: SatDownScene,
  drawNear: DrawNearScene,
  fearful: FearfulScene,
  spectacle: SpectacleScene,
  heroCloth: HeroClothScene,
  notSeen: NotSeenScene,
  stillSpeaks: StillSpeaksScene,
  afar: AfarScene,
  receivedBack: ReceivedBackScene,
  invisible: InvisibleScene,
  notWorthy: NotWorthyScene,
  apartFromUs: ApartFromUsScene,
};
