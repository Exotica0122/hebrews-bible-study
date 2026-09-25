import { expect, test } from "@playwright/test";

test.describe("word studies", () => {
  test("open on tap, one at a time, close on Escape and ×", async ({ page }, testInfo) => {
    await page.goto("/");
    const m1 = page.locator("#hb-m1");
    const radiance = m1.getByRole("button", { name: "radiance", exact: true });
    await radiance.scrollIntoViewIfNeeded();
    await radiance.click();
    const dialog = page.getByRole("dialog", { name: "Radiance" });
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText("apaugasma");
    if (testInfo.project.name === "mobile") {
      await expect(dialog).toHaveAttribute("aria-modal", "true");
      await page.mouse.click(10, 10);
      await expect(page.getByRole("dialog")).toHaveCount(0);
      await radiance.click();
      await expect(dialog).toBeVisible();
    } else {
      await m1.getByRole("button", { name: "glory of God", exact: true }).click();
      await expect(page.getByRole("dialog", { name: "Glory of God" })).toBeVisible();
      await expect(page.getByRole("dialog", { name: "Radiance" })).toHaveCount(0);
    }

    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);

    await radiance.click();
    await page.getByRole("dialog", { name: "Radiance" }).getByRole("button", { name: "Close" }).click();
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });

  test("open with Enter and Space from the keyboard", async ({ page }) => {
    await page.goto("/");
    const fathers = page.locator("#hb-m1").getByRole("button", { name: "fathers", exact: true });
    await fathers.scrollIntoViewIfNeeded();
    await fathers.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("dialog", { name: "Fathers" })).toBeVisible();
    await page.keyboard.press("Space");
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });

  test("mobile sheet steps to the previous and next word", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile", "bottom sheet is mobile only");
    await page.goto("/");
    const glory = page.locator("#hb-m1").getByRole("button", { name: "glory of God", exact: true });
    await glory.scrollIntoViewIfNeeded();
    await glory.click();
    const sheet = page.getByRole("dialog", { name: "Glory of God" });
    await sheet.getByRole("button", { name: /Exact imprint →/ }).click();
    await expect(page.getByRole("dialog", { name: "Exact imprint" })).toBeVisible();
    await page.getByRole("dialog", { name: "Exact imprint" }).getByRole("button", { name: /← Glory of God/ }).click();
    await expect(page.getByRole("dialog", { name: "Glory of God" })).toBeVisible();
  });
});

test("cross-reference chips open one per movement, with Colossians open by default", async ({ page }) => {
  await page.goto("/");
  const m1 = page.locator("#hb-m1");
  const col = m1.getByRole("button", { name: /Col 1:16–17/ });
  const john = m1.getByRole("button", { name: /John 1:1–3/ });
  await col.scrollIntoViewIfNeeded();
  await expect(col).toHaveAttribute("aria-expanded", "true");
  await expect(m1).toContainText("in him all things hold together");
  await john.click();
  await expect(john).toHaveAttribute("aria-expanded", "true");
  await expect(col).toHaveAttribute("aria-expanded", "false");
  await expect(m1).toContainText("In the beginning was the Word");
  await john.click();
  await expect(john).toHaveAttribute("aria-expanded", "false");
  await expect(m1).not.toContainText("In the beginning was the Word");
});

test("language toggle swaps every string and drops the English drop cap", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#hb-m1 [aria-hidden] >> text=L").first()).toBeVisible();
  await page.getByRole("button", { name: "한국어" }).click();
  await expect(page.getByRole("heading", { level: 1, name: "히브리서 1장" })).toBeVisible();
  await expect(page.locator("#hb-m1")).toContainText("개역한글");
  await expect(page.locator("#hb-m1")).toContainText("옛적에 선지자들로");
  await expect(page.locator("html")).toHaveAttribute("lang", "ko");
  await page.reload();
  await expect(page.getByRole("heading", { level: 1, name: "히브리서 1장" })).toBeVisible();
});

test("scene toggle swaps the radiance quote for the seal", async ({ page }) => {
  await page.goto("/");
  const m1 = page.locator("#hb-m1");
  const altBtn = m1.getByRole("button", { name: "Exact imprint", exact: true });
  await altBtn.scrollIntoViewIfNeeded();
  await altBtn.click();
  await expect(m1).toContainText("…and the exact imprint of his nature.");
  await expect(m1).toContainText("a seal presses into warm gold wax");
  await m1.getByRole("button", { name: "Radiance", exact: true }).click();
  await expect(m1).toContainText("He is the radiance of the glory of God…");
});

test("chapter menu routes to a coming-soon chapter with prev, next and back", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Chapter 1/ }).click();
  await page.getByRole("menuitem", { name: /Hebrews 5/ }).click();
  await expect(page).toHaveURL(/\/5$/);
  await expect(page.getByRole("heading", { level: 1, name: "Hebrews 5" })).toBeVisible();
  await expect(page.locator("main").getByText("Coming soon", { exact: true }).first()).toBeVisible();
  await page.getByRole("link", { name: /Hebrews 6 →/ }).click();
  await expect(page).toHaveURL(/\/6$/);
  await page.getByRole("link", { name: /← Hebrews 5/ }).click();
  await expect(page).toHaveURL(/\/5$/);
  await page.getByRole("link", { name: "Back to Hebrews 1" }).click();
  await expect(page).toHaveURL(/\/$/);
});

test("chapter 2 has no previous link and chapter 13 has no next link", async ({ page }) => {
  await page.goto("/2");
  await expect(page.getByRole("link", { name: /← Hebrews/ })).toHaveCount(0);
  await page.goto("/13");
  await expect(page.getByRole("link", { name: /Hebrews 14/ })).toHaveCount(0);
  await page.goto("/1");
  await expect(page).toHaveURL(/\/$/);
  const res = await page.goto("/99");
  expect(res?.status()).toBe(404);
});

test("section nav scroll-spies and the progress bar grows", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "section nav is desktop only");
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Sections" });
  await expect(nav.getByRole("button", { name: "Map" })).not.toHaveAttribute("aria-current", "true");
  await nav.getByRole("button", { name: "Summary" }).click();
  await expect(nav.getByRole("button", { name: "Summary" })).toHaveAttribute("aria-current", "true");
  const width = await page.locator("header > div:last-child").evaluate((el) => parseFloat(getComputedStyle(el).width));
  expect(width).toBeGreaterThan(500);
});
