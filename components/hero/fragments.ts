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
  { cls: "bush", left: 16, top: 28, leftMobile: 23, topMobile: 6 },
  { cls: "fire", left: 83, top: 26, leftMobile: 77, topMobile: 9 },
  { cls: "cloud", left: 86, top: 60, leftMobile: 75, topMobile: 24 },
  { cls: "tablet", left: 13, top: 62, leftMobile: 26, topMobile: 22 },
];
