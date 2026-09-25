import { describe, expect, it } from "vitest";
import { keysOf, parseMarked } from "./parse";

describe("parseMarked", () => {
  it("returns one plain segment for text without markers", () => {
    expect(parseMarked("God spoke to our fathers")).toEqual([
      { text: "God spoke to our fathers" },
    ]);
  });

  it("turns [key|text] into a keyed segment", () => {
    expect(parseMarked("[radiance|radiance]")).toEqual([
      { key: "radiance", text: "radiance" },
    ]);
  });

  it("interleaves plain and keyed segments in source order", () => {
    expect(parseMarked("He is the [radiance|radiance] of the [glory|glory of God].")).toEqual([
      { text: "He is the " },
      { key: "radiance", text: "radiance" },
      { text: " of the " },
      { key: "glory", text: "glory of God" },
      { text: "." },
    ]);
  });

  it("keeps Korean particles attached after a marker", () => {
    expect(parseMarked("옛적에 [prophets|선지자들]로 말씀하신")).toEqual([
      { text: "옛적에 " },
      { key: "prophets", text: "선지자들" },
      { text: "로 말씀하신" },
    ]);
  });
});

describe("keysOf", () => {
  it("lists keys in verse order without duplicates", () => {
    const verses: [number, string][] = [
      [1, "[a|one] and [b|two]"],
      [2, "[b|two] again then [c|three]"],
    ];
    expect(keysOf(verses)).toEqual(["a", "b", "c"]);
  });
});
