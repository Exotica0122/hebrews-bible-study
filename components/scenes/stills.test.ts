import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const ids = [
  ...readFileSync("components/scenes/types.ts", "utf8").matchAll(/"(\w+)"/g),
].map(([, id]) => id);

describe("scene stills", () => {
  it.each(ids)("%s has a desktop and a mobile still", (id) => {
    expect(existsSync(`public/scenes/${id}.webp`)).toBe(true);
    expect(existsSync(`public/scenes/mobile/${id}.webp`)).toBe(true);
  });
});
