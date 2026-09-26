import { expect, test } from "@playwright/test";

test.describe("server-rendered language", () => {
  test("a Korean cookie renders Korean from the first byte", async ({ request }) => {
    const res = await request.get("/", { headers: { cookie: "hb-lang=ko; hb-intro=1" } });
    const html = await res.text();
    expect(html).toContain('lang="ko"');
    expect(html).toContain("히브리서 1장");
    expect(html).not.toContain("A verse-by-verse study · ESV");
  });

  test("choosing Korean sets the cookie so the next load has no English paint", async ({ page, context }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "한국어" }).click();
    const cookie = (await context.cookies()).find((c) => c.name === "hb-lang");
    expect(cookie?.value).toBe("ko");
    const res = await page.request.get("/");
    expect(await res.text()).toContain("히브리서 1장");
  });
});

test.describe("intro veil", () => {
  test("plays once on a first visit, then is remembered", async ({ page, context }) => {
    await context.clearCookies();
    await page.goto("/");
    const veil = page.locator("[data-intro]");
    await expect(veil).toBeVisible();
    await expect(veil).toHaveCount(0, { timeout: 6_000 });
    expect((await context.cookies()).find((c) => c.name === "hb-intro")?.value).toBe("1");
    const res = await page.request.get("/");
    expect(await res.text()).not.toContain("data-intro");
  });

  test("is skipped under reduced motion", async ({ page, context }) => {
    await context.clearCookies();
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(page.locator("[data-intro]")).toBeHidden();
    await expect(page.getByRole("heading", { level: 1, name: "Hebrews 1" })).toBeVisible();
  });

  test("is skipped when arriving by a shared word link", async ({ page, context }) => {
    await context.clearCookies();
    await page.goto("/#hb-m1-radiance");
    await expect(page.locator("[data-intro]")).toHaveCount(0, { timeout: 5_000 });
    await expect(page.getByRole("dialog", { name: "Radiance" })).toBeVisible({ timeout: 10_000 });
  });

  test("a click skips it", async ({ page, context }) => {
    await context.clearCookies();
    await page.goto("/");
    const veil = page.locator("[data-intro]");
    await expect(veil).toBeVisible();
    await veil.click();
    await expect(veil).toHaveCount(0, { timeout: 1_500 });
  });
});
