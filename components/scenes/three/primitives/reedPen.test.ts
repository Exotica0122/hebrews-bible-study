import { describe, expect, it } from "vitest";
import { LETTERS, strokePoints } from "./reedPen";
import { SCROLL_TEXT, glyphs } from "./letterText";

describe("reed-pen letters", () => {
  const used = [...new Set(glyphs(SCROLL_TEXT).map((g) => g.ch))];

  it.each(used)("%s has a pen form", (ch) => {
    expect(LETTERS[ch]).toBeDefined();
    expect(LETTERS[ch].width).toBeGreaterThan(0.15);
    expect(LETTERS[ch].strokes.length).toBeGreaterThan(0);
  });

  it.each(used)("%s stays inside its cell", (ch) => {
    for (const s of LETTERS[ch].strokes)
      for (const [x, y] of strokePoints(s, 0.02)) {
        expect(x).toBeGreaterThanOrEqual(-0.1);
        expect(x).toBeLessThanOrEqual(LETTERS[ch].width + 0.1);
        expect(y).toBeGreaterThanOrEqual(-0.3);
        expect(y).toBeLessThanOrEqual(1.35);
      }
  });

  it("samples a stroke densely", () => {
    const pts = strokePoints({ k: "L", p: [0, 0, 0, 1] }, 0.05);
    expect(pts.length).toBeGreaterThanOrEqual(21);
    expect(pts[0]).toEqual([0, 0]);
    expect(pts.at(-1)).toEqual([0, 1]);
  });
});
