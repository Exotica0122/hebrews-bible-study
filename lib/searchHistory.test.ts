import { describe, expect, it } from "vitest";
import { MAX_RECENT, parseRecent, withRecent } from "./searchHistory";

describe("withRecent", () => {
  it("puts the newest search first", () => {
    expect(withRecent(["anchor"], "6:19")).toEqual(["6:19", "anchor"]);
  });

  it("moves a repeat to the front, ignoring case and keeping the new spelling", () => {
    expect(withRecent(["6:19", "anchor"], "Anchor")).toEqual([
      "Anchor",
      "6:19",
    ]);
  });

  it("trims the query and ignores a blank one", () => {
    expect(withRecent([], "  faith  ")).toEqual(["faith"]);
    expect(withRecent(["faith"], "   ")).toEqual(["faith"]);
  });

  it("forgets the oldest past the limit", () => {
    const full = Array.from({ length: MAX_RECENT }, (_, i) => `q${i}`);
    const next = withRecent(full, "new");
    expect(next).toHaveLength(MAX_RECENT);
    expect(next[0]).toBe("new");
    expect(next).not.toContain(`q${MAX_RECENT - 1}`);
  });
});

describe("parseRecent", () => {
  it("reads a stored list", () => {
    expect(parseRecent('["anchor","6:19"]')).toEqual(["anchor", "6:19"]);
  });

  it("treats missing or damaged data as empty", () => {
    expect(parseRecent(null)).toEqual([]);
    expect(parseRecent("{not json")).toEqual([]);
    expect(parseRecent('{"a":1}')).toEqual([]);
  });

  it("drops anything that is not a string and caps the length", () => {
    expect(parseRecent('["a",1,null]')).toEqual(["a"]);
    const long = JSON.stringify(Array(MAX_RECENT + 3).fill("a"));
    expect(parseRecent(long)).toHaveLength(MAX_RECENT);
  });
});
