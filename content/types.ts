export type Lang = "en" | "ko";

/** Each chapter's visual world: chapter 1 the heavens, chapter 2 the night road, chapter 3 the wilderness camp at dusk, chapter 4 the garden on the seventh day, in cut paper, chapter 5 the Holy Place by lamplight, chapter 6 a rain-washed coast in ink on hanji, chapter 7 Salem in shell and lapis inlay, chapter 8 a cyanotype pattern, chapter 9 one sheet of beaten gold, chapter 10 a limewashed wall in hard sun, chapter 11 a long embroidered cloth left unfinished. */
export type Setting =
  | "heavens"
  | "earth"
  | "wilderness"
  | "garden"
  | "sanctuary"
  | "coast"
  | "salem"
  | "pattern"
  | "gold"
  | "wall"
  | "cloth";

export type SceneId =
  | "radiance"
  | "angels"
  | "throne"
  | "fold"
  | "exalted"
  | "drift"
  | "crowned"
  | "gather"
  | "freed"
  | "tabernacle"
  | "rock"
  | "coals"
  | "threshold"
  | "seventh"
  | "jordan"
  | "sword"
  | "mercy"
  | "offering"
  | "diadem"
  | "cries"
  | "bread"
  | "foundation"
  | "rain"
  | "footsteps"
  | "oath"
  | "anchor"
  | "meeting"
  | "tithe"
  | "arise"
  | "sworn"
  | "forever"
  | "heroPattern"
  | "trueTent"
  | "pattern"
  | "second"
  | "hearts"
  | "vanish"
  | "holyPlaces"
  | "notYet"
  | "onceForAll"
  | "covenantBlood"
  | "secondTime"
  | "furnTable"
  | "furnLampstand"
  | "furnCurtain"
  | "furnAltar"
  | "furnArk"
  | "shadow"
  | "bodyPrepared"
  | "satDown"
  | "drawNear"
  | "fearful"
  | "spectacle"
  | "heroCloth"
  | "notSeen"
  | "stillSpeaks"
  | "afar"
  | "receivedBack"
  | "invisible"
  | "notWorthy"
  | "apartFromUs";

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

export interface FurnishingCopy {
  name: string;
  ref: string;
  note: string;
}

export interface Furnishing extends Record<Lang, FurnishingCopy> {
  scene: SceneId;
  source?: string;
}

export interface AppendixCopy {
  nav: string;
  eyebrow: string;
  title: string;
  intro: string;
  original: string;
  overview: string;
  credit: string;
}

export interface Appendix {
  items: Furnishing[];
  overview: string;
  copy: Record<Lang, AppendixCopy>;
}

export interface ChapterContent {
  number: number;
  setting: Setting;
  copy: Record<Lang, ChapterCopy>;
  movements: Movement[];
  summary: Record<Lang, Summary>;
  appendix?: Appendix;
}

export interface Segment {
  text: string;
  key?: string;
}
