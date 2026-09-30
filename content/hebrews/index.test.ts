import { describe, expect, it } from "vitest";
import { keysOf } from "../parse";
import { CHAPTER_COUNT, LATEST_LIVE, LIVE_COUNT, chapterTitle, getChapter, isLive } from "./index";

const LIVE = [1, 2];

describe("chapter registry", () => {
  it("has thirteen chapters with chapters 1 and 2 live", () => {
    expect(CHAPTER_COUNT).toBe(13);
    expect(isLive(1)).toBe(true);
    expect(isLive(2)).toBe(true);
    expect(isLive(3)).toBe(false);
    expect(isLive(13)).toBe(false);
    expect(LIVE_COUNT).toBe(2);
    expect(LATEST_LIVE).toBe(2);
  });

  it("returns chapter 1 with five movements in order", async () => {
    const ch = await getChapter(1);
    expect(ch?.number).toBe(1);
    expect(ch?.movements.map((m) => m.id)).toEqual(["m1", "m2", "m3", "m4", "m5"]);
  });

  it("returns chapter 2 with four movements covering verses 1–18", async () => {
    const ch = await getChapter(2);
    expect(ch?.number).toBe(2);
    expect(ch?.movements.map((m) => m.range)).toEqual(["1–4", "5–9", "10–13", "14–18"]);
    for (const lang of ["en", "ko"] as const) {
      expect(ch!.movements.flatMap((m) => m[lang].verses.map(([n]) => n))).toEqual(Array.from({ length: 18 }, (_, i) => i + 1));
    }
  });

  it("names every live chapter in both languages", () => {
    for (const n of LIVE) {
      expect(chapterTitle(n, "en")).toBeTruthy();
      expect(chapterTitle(n, "ko")).toBeTruthy();
    }
    expect(chapterTitle(3, "en")).toBeUndefined();
  });

  it("returns null for chapters that are not live", async () => {
    expect(await getChapter(7)).toBeNull();
  });
});

describe.each(LIVE)("chapter %i data integrity", (n) => {
  it("has a word study in both languages for every marked key", async () => {
    const ch = await getChapter(n);
    for (const m of ch!.movements) {
      for (const lang of ["en", "ko"] as const) {
        for (const k of keysOf(m[lang].verses)) {
          expect(m.words[lang][k], `${m.id}/${lang}/${k}`).toBeDefined();
        }
      }
    }
  });

  it("has no word study that no verse marks", async () => {
    const ch = await getChapter(n);
    for (const m of ch!.movements) {
      for (const lang of ["en", "ko"] as const) {
        expect(Object.keys(m.words[lang]).sort(), `${m.id}/${lang}`).toEqual([...keysOf(m[lang].verses)].sort());
      }
    }
  });

  it("marks the same keys in English and Korean for every movement", async () => {
    const ch = await getChapter(n);
    for (const m of ch!.movements) {
      expect([...keysOf(m.en.verses)].sort()).toEqual([...keysOf(m.ko.verses)].sort());
    }
  });

  it("has one map snippet per verse in both languages", async () => {
    const ch = await getChapter(n);
    for (const m of ch!.movements) {
      expect(m.en.snips.length).toBe(m.en.verses.length);
      expect(m.ko.snips.length).toBe(m.ko.verses.length);
    }
  });

  it("has unique thread chip ids within each movement", async () => {
    const ch = await getChapter(n);
    for (const m of ch!.movements) {
      const ids = m.chips.map((c) => c.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });
});
