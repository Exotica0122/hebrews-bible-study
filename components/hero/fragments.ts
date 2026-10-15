export interface HeroFragment {
  cls: "bush" | "fire" | "cloud" | "tablet";
  /** Desktop home position, percent of the hero. */
  left: number;
  top: number;
  /** Phone home position: pushed into the upper band, clear of the text stack. */
  leftMobile: number;
  topMobile: number;
}

export const HERO_FRAGMENTS: readonly HeroFragment[] = [
  { cls: "bush", left: 16, top: 28, leftMobile: 16, topMobile: 16 },
  { cls: "fire", left: 83, top: 26, leftMobile: 84, topMobile: 16 },
  { cls: "cloud", left: 86, top: 60, leftMobile: 86, topMobile: 27 },
  { cls: "tablet", left: 13, top: 62, leftMobile: 14, topMobile: 27 },
];
