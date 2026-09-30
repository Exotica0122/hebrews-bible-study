export type Lang = "en" | "ko";

/** Each chapter's visual world: chapter 1 the heavens, chapter 2 the night road, chapter 3 the wilderness camp at dusk. */
export type Setting = "heavens" | "earth" | "wilderness";

export type SceneId = "radiance" | "angels" | "throne" | "fold" | "exalted" | "drift" | "crowned" | "gather" | "freed" | "tabernacle" | "rock" | "coals" | "threshold";

export type CommentaryBlock = ["h" | "p" | "q", string];

export interface WordStudy {
  t: string;
  g: string;
  v: string;
  s: string;
  d: string;
}

export interface Chip {
  id: string;
  tag: "OT" | "NT";
  en: string;
  ko: string;
  ten: string;
  tko: string;
  wen: string;
  wko: string;
}

export interface MovementCopy {
  title: string;
  quote: string;
  sref: string;
  cap: string;
  altQuote?: string;
  altCap?: string;
  snips: string[];
  verses: [number, string][];
  com: CommentaryBlock[];
}

export interface Movement {
  id: string;
  num: string;
  range: string;
  scene: SceneId;
  art: string;
  en: MovementCopy;
  ko: MovementCopy;
  words: Record<Lang, Record<string, WordStudy>>;
  chips: Chip[];
}

export interface SummaryGroup {
  h: string;
  items: [string, string][];
}

export interface Summary {
  groups: SummaryGroup[];
  intentH: string;
  intentShort: string;
  intent: string[];
}

export interface ChapterCopy {
  heroEyebrow: string;
  heroTitle: string;
  tagline: string;
  taglineRef: string;
  /** Hero fragment captions, in HERO_FRAGMENTS order; only the heavens hero has them. */
  fragments?: [string, string, string, string];
  mapTitle: string;
  mapIntro: string;
  summaryTitle: string;
  footQuote: string;
  version: string;
}

export interface ChapterContent {
  number: number;
  setting: Setting;
  copy: Record<Lang, ChapterCopy>;
  movements: Movement[];
  summary: Record<Lang, Summary>;
}

export interface Segment {
  text: string;
  key?: string;
}
