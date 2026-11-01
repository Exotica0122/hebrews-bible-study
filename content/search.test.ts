import { describe, expect, it } from "vitest";
import { allChapters } from "./hebrews";
import {
  buildEntries,
  normalize,
  parseReference,
  searchEntries,
  snippet,
  type SearchEntry,
  type SearchResults,
} from "./search";

const chapters = await allChapters();
const en = chapters.flatMap((c) => buildEntries(c, "en"));
const ko = chapters.flatMap((c) => buildEntries(c, "ko"));

const group = (r: SearchResults, kind: string) =>
  r.groups.find((g) => g.kind === kind)?.hits ?? [];
const kinds = (r: SearchResults) => r.groups.map((g) => g.kind);

describe("buildEntries", () => {
  it("strips word-study marks from verse text", () => {
    const v = en.find((e) => e.kind === "verse" && e.target === "hb-v3");
    expect(v?.text).toContain("He is the radiance of the glory of God and");
    expect(v?.text).not.toContain("[");
  });

  it("gives every verse its reference and landing spot", () => {
    const v = en.find((e) => e.ref === "Hebrews 6:19");
    expect(v).toMatchObject({ kind: "verse", chapter: 6, target: "hb-v19" });
  });

  it("points commentary subheadings at their block", () => {
    const h = en.find((e) => e.title === "Behind the curtain");
    expect(h?.kind).toBe("section");
    expect(h?.chapter).toBe(6);
    expect(h?.target).toMatch(/^hb-c-m5-\d+$/);
  });

  it("points movement titles at the title, not the scene", () => {
    const h = en.find(
      (e) => e.kind === "section" && e.title === "God has spoken by his Son",
    );
    expect(h?.target).toBe("hb-title-m1");
  });

  it("lists a subheading that repeats its section title only once", () => {
    const titles = en.filter(
      (e) => e.kind === "section" && e.title === "An anchor of the soul",
    );
    expect(titles.map((e) => e.target)).toEqual(["hb-title-m5"]);
  });

  it("uses the existing word-study link", () => {
    const w = en.find((e) => e.kind === "word" && e.title === "Radiance");
    expect(w?.target).toBe("hb-m1-radiance");
  });

  it("uses Korean text and labels for Korean", () => {
    const v = ko.find((e) => e.kind === "verse" && e.ref === "히브리서 6:19");
    expect(v?.text).toContain("영혼의 닻");
  });

  it("keeps normalized text the same length so highlights line up", () => {
    for (const e of [...en, ...ko]) {
      expect(normalize(e.text)).toHaveLength(e.text.length);
    }
  });
});

describe("parseReference", () => {
  it.each([
    ["6:19", { chapter: 6, from: 19, to: 19 }],
    ["Hebrews 6:19", { chapter: 6, from: 19, to: 19 }],
    ["heb 6:19", { chapter: 6, from: 19, to: 19 }],
    ["히브리서 6:19", { chapter: 6, from: 19, to: 19 }],
    ["히 6:19", { chapter: 6, from: 19, to: 19 }],
    ["6장 19절", { chapter: 6, from: 19, to: 19 }],
    ["6:16-20", { chapter: 6, from: 16, to: 20 }],
    ["6:16–20", { chapter: 6, from: 16, to: 20 }],
    ["Hebrews 6", { chapter: 6, from: null, to: null }],
    ["히브리서 6장", { chapter: 6, from: null, to: null }],
    ["6", { chapter: 6, from: null, to: null }],
  ])("reads %s", (q, expected) => {
    expect(parseReference(q)).toEqual(expected);
  });

  it.each(["faith", "6:", "14:2", "0:1", "hebrews", "psalm 6"])(
    "ignores %s",
    (q) => {
      expect(parseReference(q)).toBeNull();
    },
  );
});

describe("searchEntries", () => {
  it("finds nothing for an empty query", () => {
    expect(searchEntries(en, "   ").groups).toEqual([]);
  });

  it("ignores case", () => {
    expect(group(searchEntries(en, "RADIANCE"), "verse")[0].ref).toBe(
      "Hebrews 1:3",
    );
  });

  it("matches partial words", () => {
    const refs = group(searchEntries(en, "anch"), "verse").map((e) => e.ref);
    expect(refs).toContain("Hebrews 6:19");
  });

  it("matches phrases that cross a word-study mark", () => {
    const refs = group(searchEntries(en, "radiance of the glory"), "verse");
    expect(refs[0].ref).toBe("Hebrews 1:3");
  });

  it("requires every word, in any order", () => {
    const refs = group(searchEntries(en, "soul anchor"), "verse").map(
      (e) => e.ref,
    );
    expect(refs).toEqual(["Hebrews 6:19"]);
  });

  it("matches inside Korean words", () => {
    const refs = group(searchEntries(ko, "닻"), "verse").map((e) => e.ref);
    expect(refs).toContain("히브리서 6:19");
  });

  it("does not search the other language", () => {
    expect(searchEntries(en, "닻").groups).toEqual([]);
    expect(group(searchEntries(ko, "anchor"), "verse")).toEqual([]);
  });

  it("finds word studies by their Greek", () => {
    const hits = group(searchEntries(en, "apaugasma"), "word");
    expect(hits[0].title).toBe("Radiance");
  });

  it("orders groups: passage, titles, Scripture, words, commentary", () => {
    const order: string[] = kinds(searchEntries(en, "anchor"));
    const expected = [
      "section",
      "verse",
      "word",
      "commentary",
      "thread",
      "summary",
    ].filter((k) => order.includes(k));
    expect(order).toEqual(expected);
  });

  it("ranks a whole-word match above a partial one", () => {
    const hits = group(searchEntries(en, "faith"), "verse");
    const firstPartial = hits.findIndex((e) => !/\bfaith\b/i.test(e.text));
    const lastWhole = hits.findLastIndex((e) => /\bfaith\b/i.test(e.text));
    expect(hits.length).toBeGreaterThan(1);
    if (firstPartial !== -1) expect(lastWhole).toBeLessThan(firstPartial);
  });

  it("does not treat a one-letter English query as a search", () => {
    expect(searchEntries(en, "a").groups).toEqual([]);
  });

  it("puts the exact verse first for a reference", () => {
    const r = searchEntries(en, "6:19");
    expect(r.groups[0].kind).toBe("passage");
    expect(r.groups[0].hits.map((e) => e.ref)).toEqual(["Hebrews 6:19"]);
  });

  it("lists every verse in a range", () => {
    const r = searchEntries(en, "6:16-18");
    expect(r.groups[0].hits.map((e) => e.ref)).toEqual([
      "Hebrews 6:16",
      "Hebrews 6:17",
      "Hebrews 6:18",
    ]);
  });

  it("does not match 1:3 inside 11:3 or 1:31", () => {
    const fake: SearchEntry[] = [
      {
        kind: "commentary",
        chapter: 1,
        ref: "r",
        text: "see Heb 11:3",
        target: "a",
      },
      {
        kind: "commentary",
        chapter: 1,
        ref: "r",
        text: "see Heb 1:31",
        target: "b",
      },
      {
        kind: "commentary",
        chapter: 1,
        ref: "r",
        text: "see Heb 1:3.",
        target: "c",
      },
    ];
    const hits = group(searchEntries(fake, "1:3"), "commentary");
    expect(hits.map((e) => e.target)).toEqual(["c"]);
  });

  it("goes to the chapter for a chapter reference", () => {
    const r = searchEntries(en, "Hebrews 6");
    expect(r.groups[0].hits[0]).toMatchObject({
      kind: "chapter",
      chapter: 6,
      target: "",
    });
  });

  it("flags a chapter that isn't written yet", () => {
    expect(searchEntries(en, "11:1").soon).toBe(11);
    expect(searchEntries(en, "6:19").soon).toBeNull();
    expect(searchEntries(en, "14:1").soon).toBeNull();
  });
});

describe("snippet", () => {
  it("marks every hit", () => {
    expect(snippet("the anchor of the soul", ["anchor"])).toEqual([
      { text: "the " },
      { text: "anchor", key: "hit" },
      { text: " of the soul" },
    ]);
  });

  it("trims long text around the first hit", () => {
    const text = `${"x ".repeat(200)}anchor${" y".repeat(200)}`;
    const segs = snippet(text, ["anchor"], 20);
    expect(segs[0].text.startsWith("…")).toBe(true);
    expect(segs.at(-1)?.text.endsWith("…")).toBe(true);
    expect(segs.map((s) => s.text).join("").length).toBeLessThan(60);
  });

  it("returns the start of the text when nothing matches", () => {
    expect(snippet("hello world", ["zzz"])).toEqual([{ text: "hello world" }]);
  });
});
