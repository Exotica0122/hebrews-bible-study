import { expect, test, type Page } from "@playwright/test";

const SHIMMER = "Preparing scene…";
const BADGE = "Motion reduced · still image";

async function canvasCount(page: Page) {
  return page.evaluate(() => document.querySelectorAll("canvas").length);
}

test("mounts a WebGL canvas for the hero and for miniatures near the viewport", async ({ page }) => {
  await page.goto("/");
  await expect.poll(() => canvasCount(page), { timeout: 15_000 }).toBeGreaterThanOrEqual(1);
  await page.locator('[data-scene="m1"]').scrollIntoViewIfNeeded();
  await expect.poll(async () => page.locator("#hb-m1 canvas").count(), { timeout: 15_000 }).toBe(1);
});

test("keeps the number of live canvases within the budget while scrolling", async ({ page }, testInfo) => {
  const budget = testInfo.project.name === "mobile" ? 2 : 3;
  const warnings: string[] = [];
  page.on("console", (m) => {
    if (m.type() === "error" || /WebGL context/i.test(m.text())) warnings.push(m.text());
  });
  await page.goto("/");
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y <= height; y += 700) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(250);
    expect(await canvasCount(page)).toBeLessThanOrEqual(budget);
  }
  for (let y = height; y >= 0; y -= 1400) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(250);
    expect(await canvasCount(page)).toBeLessThanOrEqual(budget);
  }
  expect(warnings).toEqual([]);
});

test("shows the shimmer, then hides it", async ({ page }) => {
  await page.goto("/");
  const m1 = page.locator("#hb-m1");
  const panel = page.locator('[data-scene="m1"]');
  await panel.scrollIntoViewIfNeeded();
  await expect(m1.getByText(SHIMMER)).toBeVisible();
  await expect(m1.getByText(SHIMMER)).toBeHidden({ timeout: 6_000 });
});

test("reduced motion shows the CSS still with a badge and mounts no canvas", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const m1 = page.locator("#hb-m1");
  const panel = page.locator('[data-scene="m1"]');
  await panel.scrollIntoViewIfNeeded();
  await expect(m1.getByText(BADGE)).toBeVisible({ timeout: 6_000 });
  await page.waitForTimeout(1500);
  expect(await canvasCount(page)).toBe(0);
});

test("without WebGL the CSS scene stays, with no badge and no errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.addInitScript(() => {
    const orig = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, type: string, ...rest: unknown[]) {
      if (type === "webgl" || type === "webgl2" || type === "experimental-webgl") return null;
      return (orig as (...a: unknown[]) => unknown).call(this, type, ...rest);
    } as typeof orig;
  });
  await page.goto("/");
  const m1 = page.locator("#hb-m1");
  const panel = page.locator('[data-scene="m1"]');
  await panel.scrollIntoViewIfNeeded();
  await expect(m1.getByText(SHIMMER)).toBeHidden({ timeout: 6_000 });
  await page.waitForTimeout(1500);
  expect(await page.locator("#hb-m1 canvas").count()).toBe(0);
  await expect(m1.getByText(BADGE)).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("the scene toggle swaps the scene without remounting the canvas", async ({ page }) => {
  await page.goto("/");
  const m1 = page.locator("#hb-m1");
  const panel = page.locator('[data-scene="m1"]');
  await panel.scrollIntoViewIfNeeded();
  await expect.poll(async () => m1.locator("canvas").count(), { timeout: 15_000 }).toBe(1);
  const before = await m1.locator("canvas").evaluate((el) => ((el as HTMLElement).dataset.id ??= String(Math.random())));
  await m1.getByRole("button", { name: "Exact imprint", exact: true }).click();
  await page.waitForTimeout(600);
  const after = await m1.locator("canvas").evaluate((el) => (el as HTMLElement).dataset.id);
  expect(after).toBe(before);
});

test("three.js is not in the initial HTML and renders a non-blank frame", async ({ page }) => {
  const res = await page.goto("/?scenetest");
  const html = (await res?.text()) ?? "";
  const scripts = [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((m) => m[1]);
  expect(scripts.some((s) => /three/i.test(s))).toBe(false);
  const m1 = page.locator("#hb-m1");
  const panel = page.locator('[data-scene="m1"]');
  await panel.scrollIntoViewIfNeeded();
  await expect.poll(async () => m1.locator("canvas").count(), { timeout: 15_000 }).toBe(1);
  await page.waitForTimeout(2500);
  const nonBlank = await m1.locator("canvas").evaluate((c) => {
    const canvas = c as HTMLCanvasElement;
    const probe = document.createElement("canvas");
    probe.width = 64;
    probe.height = 64;
    const ctx = probe.getContext("2d")!;
    ctx.drawImage(canvas, 0, 0, 64, 64);
    const d = ctx.getImageData(0, 0, 64, 64).data;
    let lit = 0;
    for (let i = 3; i < d.length; i += 4) if (d[i] > 8) lit++;
    return lit;
  });
  expect(nonBlank).toBeGreaterThan(20);
});
