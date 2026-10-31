import { parseMarked } from "./parse";
import { CHAPTER_COUNT, chapterTitle, isLive } from "./hebrews";
import type { ChapterContent, Lang, Segment } from "./types";

export type SearchKind =
  | "chapter"
  | "section"
  | "verse"
  | "word"
  | "commentary"
  | "thread"
  | "summary";

export interface SearchEntry {
  kind: SearchKind;
  chapter: number;
  ref: string;
  title?: string;
  /** Searched but not shown, like a word's Greek. */
  also?: string;
  text: string;
  target: string;
}

export type SearchGroupKind = "passage" | Exclude<SearchKind, "chapter">;

export interface SearchGroup {
  kind: SearchGroupKind;
  hits: SearchEntry[];
}

export interface SearchResults {
  groups: SearchGroup[];
  terms: string[];
  /** A referenced chapter that isn't written yet. */
  soon: number | null;
}

export interface Reference {
  chapter: number;
  from: number | null;
  to: number | null;
}

const GROUP_ORDER: SearchGroupKind[] = [
  "section",
  "verse",
  "word",
  "commentary",
  "thread",
  "summary",
];

const REFERENCE =
  /^(?:(?:hebrews|heb|히브리서|히)\.?\s*)?(\d{1,2})(?:\s*장)?(?:(?:\s*[:.]\s*|\s+|(?<=장))(\d{1,3})(?:\s*절)?(?:\s*-\s*(\d{1,3})(?:\s*절)?)?)?$/;

export function normalize(s: string): string {
  return s
    .normalize("NFC")
    .toLowerCase()
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, "-");
}

export function parseReference(query: string): Reference | null {
  const m = REFERENCE.exec(normalize(query).trim());
  if (!m) return null;
  const chapter = Number(m[1]);
  if (chapter < 1 || chapter > CHAPTER_COUNT) return null;
  const from = m[2] ? Number(m[2]) : null;
  return { chapter, from, to: m[3] ? Number(m[3]) : from };
}

export function buildEntries(
  chapter: ChapterContent,
  lang: Lang,
): SearchEntry[] {
  const n = chapter.number;
  const book = lang === "ko" ? "히브리서" : "Hebrews";
  const title = chapterTitle(n, lang) ?? "";
  const entries: SearchEntry[] = [
    {
      kind: "chapter",
      chapter: n,
      ref: `${book} ${n}`,
      title,
      text: "",
      target: "",
    },
  ];
  const add = (entry: Omit<SearchEntry, "chapter">) =>
    entries.push({ ...entry, chapter: n });

  if (!chapter.movements.some((m) => m[lang].title === title))
    add({ kind: "section", ref: `${book} ${n}`, title, text: "", target: "" });

  for (const m of chapter.movements) {
    const c = m[lang];
    const range = `${book} ${n}:${m.range}`;
    add({
      kind: "section",
      ref: range,
      title: c.title,
      text: "",
      target: `hb-title-${m.id}`,
    });
    for (const [v, marked] of c.verses) {
      add({
        kind: "verse",
        ref: `${book} ${n}:${v}`,
        text: parseMarked(marked)
          .map((seg) => seg.text)
          .join(""),
        target: `hb-v${v}`,
      });
    }
    let heading = c.title;
    c.com.forEach(([type, text], i) => {
      const target = `hb-c-${m.id}-${i}`;
      if (type === "h") {
        heading = text;
        if (text === c.title) return;
        add({
          kind: "section",
          ref: `${range} · ${c.title}`,
          title: text,
          text: "",
          target,
        });
      } else {
        add({ kind: "commentary", ref: `${range} · ${heading}`, text, target });
      }
    });
    for (const [key, w] of Object.entries(m.words[lang])) {
      add({
        kind: "word",
        ref: `${book} ${w.v} · ${w.g}`,
        title: w.t,
        also: w.g,
        text: `${w.s}. ${w.d}`,
        target: `hb-${m.id}-${key}`,
      });
    }
    for (const chip of m.chips) {
      add({
        kind: "thread",
        ref: `${range} · ${c.title}`,
        title: chip[lang],
        text: `${lang === "ko" ? chip.tko : chip.ten} ${lang === "ko" ? chip.wko : chip.wen}`,
        target: `hb-t-${m.id}-${chip.id}`,
      });
    }
  }

  const summary = chapter.summary[lang];
  const summaryRef = `${book} ${n} · ${chapter.copy[lang].summaryTitle}`;
  summary.groups.forEach((g, gi) => {
    g.items.forEach(([v, text], ii) => {
      add({
        kind: "summary",
        ref: `${summaryRef} · ${v}`,
        text,
        target: `hb-s-${gi}-${ii}`,
      });
    });
  });
  summary.intent.forEach((text, i) => {
    add({ kind: "summary", ref: summaryRef, text, target: `hb-s-i-${i}` });
  });
  return entries;
}

const isDigit = (c: string | undefined) => c !== undefined && /\d/.test(c);
const isWordChar = (c: string | undefined) =>
  c !== undefined && /[\p{L}\p{N}]/u.test(c);

/** Numbers match whole, so "1:3" doesn't hit "11:3" or "1:31". */
function findTerm(hay: string, term: string, from = 0): number {
  let i = hay.indexOf(term, from);
  while (i !== -1) {
    const clearBefore = !isDigit(term[0]) || !isDigit(hay[i - 1]);
    const clearAfter = !isDigit(term.at(-1)) || !isDigit(hay[i + term.length]);
    if (clearBefore && clearAfter) return i;
    i = hay.indexOf(term, i + 1);
  }
  return -1;
}

function hasWholeWord(hay: string, term: string): boolean {
  for (let i = findTerm(hay, term); i !== -1; i = findTerm(hay, term, i + 1)) {
    if (!isWordChar(hay[i - 1]) && !isWordChar(hay[i + term.length]))
      return true;
  }
  return false;
}

const hays = new WeakMap<SearchEntry, string>();

function hayOf(entry: SearchEntry): string {
  let hay = hays.get(entry);
  if (hay === undefined) {
    hay = normalize(
      [entry.title, entry.also, entry.text].filter(Boolean).join("\n"),
    );
    hays.set(entry, hay);
  }
  return hay;
}

function score(entry: SearchEntry, terms: string[]): number {
  const hay = hayOf(entry);
  const title = normalize(entry.title ?? "");
  let total = hay.includes(terms.join(" ")) ? 4 : 0;
  if (terms.some((t) => hasWholeWord(hay, t))) total += 2;
  if (terms.some((t) => title.includes(t))) total += 1;
  return total;
}

function textMatches(entries: SearchEntry[], terms: string[]): SearchGroup[] {
  const matched = entries
    .filter(
      (e) =>
        e.kind !== "chapter" &&
        terms.every((t) => findTerm(hayOf(e), t) !== -1),
    )
    .map((entry) => ({ entry, score: score(entry, terms) }))
    .sort((a, b) => b.score - a.score);
  return GROUP_ORDER.map((kind) => ({
    kind,
    hits: matched.filter((m) => m.entry.kind === kind).map((m) => m.entry),
  })).filter((g) => g.hits.length > 0);
}

function passageHits(entries: SearchEntry[], ref: Reference): SearchEntry[] {
  const { chapter, from, to } = ref;
  if (from === null || to === null)
    return entries.filter((e) => e.kind === "chapter" && e.chapter === chapter);
  return entries.filter((e) => {
    if (e.kind !== "verse" || e.chapter !== chapter) return false;
    const v = Number(e.target.slice("hb-v".length));
    return v >= from && v <= to;
  });
}

export function searchEntries(
  entries: SearchEntry[],
  query: string,
): SearchResults {
  const q = normalize(query).trim();
  const ref = parseReference(query);
  const soon = ref && !isLive(ref.chapter) ? ref.chapter : null;

  if (ref) {
    const verse = ref.from === null ? null : `${ref.chapter}:${ref.from}`;
    const span = ref.to === ref.from ? verse : `${verse}-${ref.to}`;
    const terms = span ? [span] : [];
    const hits = passageHits(entries, ref);
    return {
      groups: [
        ...(hits.length > 0 ? [{ kind: "passage" as const, hits }] : []),
        ...(terms.length > 0 ? textMatches(entries, terms) : []),
      ],
      terms,
      soon,
    };
  }

  // One Latin letter matches nearly everything; one Hangul syllable is a real word.
  if (q.length === 0 || (q.length === 1 && q.charCodeAt(0) < 128))
    return { groups: [], terms: [], soon };
  const terms = q.split(/\s+/);
  return { groups: textMatches(entries, terms), terms, soon };
}

/** Cuts text to a window around the first hit and marks each hit with `key: "hit"`. */
export function snippet(text: string, terms: string[], radius = 70): Segment[] {
  const hay = normalize(text);
  const ranges: [number, number][] = [];
  for (const term of terms) {
    for (let i = findTerm(hay, term); i !== -1; i = findTerm(hay, term, i + 1))
      ranges.push([i, i + term.length]);
  }
  ranges.sort((a, b) => a[0] - b[0]);

  const first = ranges[0]?.[0] ?? 0;
  let start = Math.max(0, first - radius);
  if (start > 0) {
    const space = text.indexOf(" ", start);
    if (space !== -1 && space < first) start = space + 1;
  }
  const end = Math.min(text.length, start + radius * 2);

  const segs: Segment[] = [];
  let at = start;
  for (const [from, to] of ranges) {
    if (from < at || to > end) continue;
    if (from > at) segs.push({ text: text.slice(at, from) });
    segs.push({ text: text.slice(from, to), key: "hit" });
    at = to;
  }
  if (at < end) segs.push({ text: text.slice(at, end) });

  if (segs.length === 0) return segs;
  if (start > 0) {
    const head = segs[0].key ? { text: "…" } : null;
    if (head) segs.unshift(head);
    else segs[0] = { text: `…${segs[0].text}` };
  }
  if (end < text.length) {
    const last = segs[segs.length - 1];
    if (last.key) segs.push({ text: "…" });
    else segs[segs.length - 1] = { text: `${last.text}…` };
  }
  return segs;
}
