export interface HeroFragment {
  /** Desktop home position of the 3D object, percent of the hero; its caption hangs below. */
  left: number;
  top: number;
  /** Phone home position: pushed into the upper band, clear of the text stack. */
  leftMobile: number;
  topMobile: number;
}

export const HERO_FRAGMENTS: readonly HeroFragment[] = [
  { left: 16, top: 28, leftMobile: 23, topMobile: 9 },
  { left: 83, top: 26, leftMobile: 77, topMobile: 10 },
  { left: 86, top: 60, leftMobile: 75, topMobile: 27 },
  { left: 13, top: 62, leftMobile: 26, topMobile: 22 },
];
