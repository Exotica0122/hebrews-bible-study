import { expect, test, type Page } from "@playwright/test";

const canvases = (page: Page) => page.evaluate(() => document.querySelectorAll("canvas").length);

async function litPixels(page: Page, selector: string) {
  return page.locator(selector).evaluate((c) => {
    const probe = document.createElement("canvas");
    probe.width = probe.height = 64;
    const ctx = probe.getContext("2d")!;
    ctx.drawImage(c as HTMLCanvasElement, 0, 0, 64, 64);
    const d = ctx.getImageData(0, 0, 64, 64).data;
    let lit = 0;
    for (let i = 0; i < d.length; i += 4) if (d[i] + d[i + 1] + d[i + 2] > 60) lit++;
    return lit;
  });
}

test("a tier-0 GPU gets the CSS scenes and no canvas", async ({ page }) => {
  await page.goto("/?gpu=0");
  await page.locator('[data-scene="m1"]').scrollIntoViewIfNeeded();
  await page.waitForTimeout(3000);
  expect(await canvases(page)).toBe(0);
  await expect(page.locator("#hb-m1").getByText("Motion reduced")).toHaveCount(0);
});

test("a tier-3 GPU renders the post-processed radiance scene", async ({ page }) => {
  await page.goto("/?gpu=3&scenetest");
  const panel = page.locator('[data-scene="m1"]');
  await panel.scrollIntoViewIfNeeded();
  await expect.poll(() => panel.locator("canvas").count(), { timeout: 15_000 }).toBe(1);
  await expect.poll(() => panel.evaluate((el) => el.dataset.effects), { timeout: 15_000 }).toBe("on");
  await page.waitForTimeout(3000);
  expect(await litPixels(page, '[data-scene="m1"] canvas')).toBeGreaterThan(40);
});

test("a tier-2 GPU renders scenes without post-processing", async ({ page }) => {
  await page.goto("/?gpu=2&scenetest");
  const panel = page.locator('[data-scene="m2"]');
  await panel.scrollIntoViewIfNeeded();
  await expect.poll(() => panel.locator("canvas").count(), { timeout: 15_000 }).toBe(1);
  expect(await panel.evaluate((el) => el.dataset.effects)).toBe("off");
});
