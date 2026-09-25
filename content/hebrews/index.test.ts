import { describe, expect, it } from "vitest";
import { keysOf } from "../parse";
import { CHAPTER_COUNT, getChapter, isLive } from "./index";

describe("chapter registry", () => {
  it("has thirteen chapters with only chapter 1 live", () => {
    expect(CHAPTER_COUNT).toBe(13);
    expect(isLive(1)).toBe(true);
    expect(isLive(2)).toBe(false);
    expect(isLive(13)).toBe(false);
  });

  it("returns chapter 1 with five movements in order", async () => {
    const ch = await getChapter(1);
    expect(ch?.number).toBe(1);
    expect(ch?.movements.map((m) => m.id)).toEqual(["m1", "m2", "m3", "m4", "m5"]);
  });

  it("returns null for chapters that are not live", async () => {
    expect(await getChapter(7)).toBeNull();
  });
});

describe("chapter 1 data integrity", () => {
  it("has a word study in both languages for every marked key", async () => {
    const ch = await getChapter(1);
    for (const m of ch!.movements) {
      for (const lang of ["en", "ko"] as const) {
        for (const k of keysOf(m[lang].verses)) {
          expect(m.words[lang][k], `${m.id}/${lang}/${k}`).toBeDefined();
        }
      }
    }
  });

  it("marks the same keys in English and Korean for every movement", async () => {
    const ch = await getChapter(1);
    for (const m of ch!.movements) {
      expect([...keysOf(m.en.verses)].sort()).toEqual([...keysOf(m.ko.verses)].sort());
    }
  });

  it("has one map snippet per verse in both languages", async () => {
    const ch = await getChapter(1);
    for (const m of ch!.movements) {
      expect(m.en.snips.length).toBe(m.en.verses.length);
      expect(m.ko.snips.length).toBe(m.ko.verses.length);
    }
  });
});
