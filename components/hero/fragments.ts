export interface HeroFragment {
  key: "fragBush" | "fragFire" | "fragCloud" | "fragTablet";
  cls: "bush" | "fire" | "cloud" | "tablet";
  /** Desktop home position, percent of the hero. */
  left: number;
  top: number;
  /** Phone home position: pushed into the upper band, clear of the text stack. */
  leftMobile: number;
  topMobile: number;
}

export const HERO_FRAGMENTS: readonly HeroFragment[] = [
  { key: "fragBush", cls: "bush", left: 16, top: 24, leftMobile: 16, topMobile: 9 },
  { key: "fragFire", cls: "fire", left: 83, top: 20, leftMobile: 84, topMobile: 8 },
  { key: "fragCloud", cls: "cloud", left: 86, top: 58, leftMobile: 86, topMobile: 27 },
  { key: "fragTablet", cls: "tablet", left: 13, top: 60, leftMobile: 14, topMobile: 28 },
];
