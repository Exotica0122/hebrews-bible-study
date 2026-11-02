import { describe, expect, it } from "vitest";
import type { SearchEntry } from "@/content/search";
import { MAX_RECENT, parseRecent, withRecent } from "./searchHistory";

const entry = (v: number, extra: Partial<SearchEntry> = {}): SearchEntry => ({
  kind: "verse",
  chapter: 6,
  ref: `Hebrews 6:${v}`,
  text: `Verse ${v}`,
  target: `hb-v${v}`,
  ...extra,
});

describe("withRecent", () => {
  it("puts the newest item first", () => {
    const list = withRecent(withRecent([], entry(19)), entry(20));
    expect(list.map((e) => e.ref)).toEqual(["Hebrews 6:20", "Hebrews 6:19"]);
  });

  it("moves a repeat to the front with its latest wording", () => {
    const list = withRecent(
      withRecent(withRecent([], entry(19)), entry(20)),
      entry(19, { text: "Reworded" }),
    );
    expect(list.map((e) => e.text)).toEqual(["Reworded", "Verse 20"]);
  });

  it("keeps items that share a target but differ in kind or chapter", () => {
    const list = withRecent(
      withRecent([], entry(1)),
      entry(1, { kind: "summary" }),
    );
    expect(withRecent(list, entry(1, { chapter: 7 }))).toHaveLength(3);
  });

  it("stores no search-only fields and caps long text", () => {
    const [saved] = withRecent(
      [],
      entry(19, { also: "ankura", text: "x".repeat(1000) }),
    );
    expect(saved).not.toHaveProperty("also");
    expect(saved.text.length).toBeLessThan(1000);
  });

  it("forgets the oldest past the limit", () => {
    let list = withRecent([], entry(0));
    for (let v = 1; v <= MAX_RECENT; v++) list = withRecent(list, entry(v));
    expect(list).toHaveLength(MAX_RECENT);
    expect(list[0].ref).toBe(`Hebrews 6:${MAX_RECENT}`);
    expect(list.map((e) => e.ref)).not.toContain("Hebrews 6:0");
  });
});

describe("parseRecent", () => {
  it("reads a stored list", () => {
    const list = withRecent([], entry(19));
    expect(parseRecent(JSON.stringify(list))).toEqual(list);
  });

  it("treats missing or damaged data as empty", () => {
    expect(parseRecent(null)).toEqual([]);
    expect(parseRecent("{not json")).toEqual([]);
    expect(parseRecent('{"a":1}')).toEqual([]);
  });

  it("drops the plain queries of the earlier format", () => {
    expect(parseRecent('["for","enligh"]')).toEqual([]);
  });

  it("drops malformed items and caps the length", () => {
    const good = entry(19);
    expect(parseRecent(JSON.stringify([good, { ref: "x" }, null]))).toEqual([
      good,
    ]);
    const long = JSON.stringify(Array(MAX_RECENT + 3).fill(good));
    expect(parseRecent(long)).toHaveLength(MAX_RECENT);
  });
});
