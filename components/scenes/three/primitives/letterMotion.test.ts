import { describe, expect, it } from "vitest";
import { WRITE_END, cameraSettle, flicker, lineReveal } from "./letterMotion";

describe("lineReveal", () => {
  it("is blank before writing and complete at the hold", () => {
    expect(lineReveal(0, 0, 6)).toBe(0);
    for (let i = 0; i < 6; i++) expect(lineReveal(WRITE_END, i, 6)).toBe(1);
    expect(lineReveal(10, 5, 6)).toBe(1);
  });

  it("writes lines in order", () => {
    const t = 4;
    expect(lineReveal(t, 0, 6)).toBeGreaterThanOrEqual(lineReveal(t, 1, 6));
    expect(lineReveal(t, 1, 6)).toBeGreaterThanOrEqual(lineReveal(t, 5, 6));
    expect(lineReveal(t, 0, 6)).toBe(1);
    expect(lineReveal(t, 5, 6)).toBe(0);
  });

  it("never moves backwards", () => {
    let last = 0;
    for (let t = 0; t <= 9; t += 0.05) {
      const v = lineReveal(t, 2, 6);
      expect(v).toBeGreaterThanOrEqual(last);
      last = v;
    }
  });
});

describe("flicker", () => {
  it("stays in range", () => {
    for (let t = 0; t < 60; t += 0.037) {
      const f = flicker(t);
      expect(f.power).toBeGreaterThanOrEqual(0.78);
      expect(f.power).toBeLessThanOrEqual(1.12);
      expect(Math.abs(f.dx)).toBeLessThanOrEqual(0.012);
      expect(Math.abs(f.dy)).toBeLessThanOrEqual(0.012);
    }
  });

  it("is deterministic and not a simple period", () => {
    expect(flicker(3.3)).toEqual(flicker(3.3));
    const a = [1, 2, 3].map((k) => flicker(k).power.toFixed(4));
    expect(new Set(a).size).toBe(3);
  });

  it("actually moves", () => {
    const p = Array.from({ length: 200 }, (_, i) => flicker(i * 0.05).power);
    expect(Math.max(...p) - Math.min(...p)).toBeGreaterThan(0.12);
  });
});

describe("cameraSettle", () => {
  it("settles by 3.2 s", () => {
    expect(cameraSettle(0)).toBe(0);
    expect(cameraSettle(3.2)).toBe(1);
    expect(cameraSettle(1)).toBeGreaterThan(0);
  });
});
