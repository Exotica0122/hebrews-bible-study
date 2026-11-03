import { describe, expect, it } from "vitest";
import { SCROLL_TEXT, glyphs, lines } from "./letterText";

describe("scroll text", () => {
  const all = glyphs(SCROLL_TEXT);
  const plain = all.map((g) => g.ch).join("");

  it("is capitals with no spaces, accents or final sigma", () => {
    expect(plain).toMatch(/^[Α-ΩϹ]+$/);
  });

  it("uses the lunate sigma only", () => {
    expect(plain).not.toMatch(/[Σσς]/);
    expect(plain).toContain("Ϲ");
  });

  it("opens Hebrews 1:1 and ends 1:2 as P46 has it", () => {
    expect(plain.startsWith("ΠΟΛΥΜΕΡΩϹΚΑΙΠΟΛΥΤΡΟΠΩϹ")).toBe(true);
    expect(plain.endsWith("ΔΙΟΥΕΠΟΙΗϹΕΝΤΟΥϹΑΙΩΝΑϹ")).toBe(true);
  });

  it("contracts θεός as an overlined ΘϹ", () => {
    const i = plain.indexOf("ΘϹ");
    expect(i).toBeGreaterThan(0);
    expect(all[i].over && all[i + 1].over).toBe(true);
    expect(all.filter((g) => g.over)).toHaveLength(2);
  });
});

describe("lines", () => {
  const rows = lines(SCROLL_TEXT);

  it("keeps the text in order across P46's line breaks", () => {
    expect(rows.flat()).toEqual(glyphs(SCROLL_TEXT));
  });

  it("breaks mid-word where the scribe did", () => {
    const ends = rows.map((r) => r.map((g) => g.ch).join(""));
    expect(ends.some((l) => l.endsWith("ΗΜΕ"))).toBe(true);
    expect(ends.some((l) => l.startsWith("ΡΩΝ"))).toBe(true);
  });
});
