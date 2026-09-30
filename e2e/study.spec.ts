import { expect, test } from "@playwright/test";

test.describe("chapter menu keyboard", () => {
  test("arrow keys, Home and End move between chapters and Enter follows", async ({ page }) => {
    await page.goto("/");
    const button = page.getByRole("button", { name: /Chapter 1/ });
    await button.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("menuitem", { name: "1", exact: true })).toBeFocused();
    await page.keyboard.press("ArrowRight");
    await expect(page.getByRole("menuitem", { name: "2", exact: true })).toBeFocused();
    await page.keyboard.press("End");
    await expect(page.getByRole("menuitem", { name: /13/ })).toBeFocused();
    await page.keyboard.press("Home");
    await expect(page.getByRole("menuitem", { name: "1", exact: true })).toBeFocused();
    await page.keyboard.press("ArrowLeft");
    await expect(page.getByRole("menuitem", { name: /13/ })).toBeFocused();
    await page.keyboard.press("ArrowDown");
    await expect(page.getByRole("menuitem", { name: "1", exact: true })).toBeFocused();
    await page.keyboard.press("ArrowUp");
    await page.keyboard.press("ArrowUp");
    await expect(page.getByRole("menuitem", { name: /12/ })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/12$/);
  });
});

test.describe("shareable word links", () => {
  test("opening a word sets the hash and a hash link opens the word", async ({ page }) => {
    await page.goto("/");
    const key = page.locator("#hb-m1").getByRole("button", { name: "radiance", exact: true });
    await key.scrollIntoViewIfNeeded();
    await key.click();
    await expect(page).toHaveURL(/#hb-m1-radiance$/);
    await page.keyboard.press("Escape");
    await expect(page).not.toHaveURL(/#hb-m1-radiance$/);

    await page.goto("/#hb-m2-firstborn");
    await expect(page.getByRole("dialog", { name: "Firstborn" })).toBeVisible({ timeout: 10_000 });
    const top = await page.locator("#hb-m2").evaluate((el) => el.getBoundingClientRect().top);
    expect(top).toBeLessThan(200);
  });

  test("the Link button copies the address", async ({ page, context }, testInfo) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/");
    const key = page.locator("#hb-m1").getByRole("button", { name: "heir of all things", exact: true });
    await key.scrollIntoViewIfNeeded();
    await key.click();
    const dialog = page.getByRole("dialog", { name: "Heir of all things" });
    await dialog.getByRole("button", { name: /Link|Copied/ }).click();
    await expect(dialog.getByRole("button", { name: "Copied" })).toBeVisible();
    if (testInfo.project.name === "desktop") {
      const text = await page.evaluate(() => navigator.clipboard.readText());
      expect(text).toMatch(/#hb-m1-heir$/);
    }
  });
});

test("offers to continue from the last movement on the next visit", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: /Continue/ })).toHaveCount(0);
  await page.locator("#hb-m3").scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollBy(0, 200));
  await page.waitForTimeout(600);
  await page.goto("/");
  const resume = page.getByRole("link", { name: /Continue/ });
  await expect(resume).toBeVisible();
  await expect(resume).toContainText("III");
  await resume.click();
  await expect.poll(() => page.locator("#hb-m3").evaluate((el) => el.getBoundingClientRect().top), { timeout: 5000 }).toBeLessThan(200);
  await expect(resume).toHaveCount(0);
});

test("print layout hides chrome and prints every word study and cross-reference", async ({ page }) => {
  await page.goto("/");
  await page.emulateMedia({ media: "print" });
  await expect(page.locator("header")).toBeHidden();
  await expect(page.locator("#hb-book")).toBeHidden();
  const m1 = page.locator("#hb-m1");
  await expect(m1.locator('[data-scene="m1"]')).toBeHidden();
  await expect(m1.getByText("I will put my law within them")).toBeVisible();
  await expect(m1.getByText("Reflected brightness beamed forth")).toBeVisible();
});

test("page scroll is locked behind the mobile word sheet", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "sheet is mobile only");
  await page.goto("/");
  const key = page.locator("#hb-m1").getByRole("button", { name: "prophets", exact: true });
  await key.scrollIntoViewIfNeeded();
  await key.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflow)).toBe("hidden");
  await page.keyboard.press("Escape");
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflow)).not.toBe("hidden");
});

test("a back-to-top button appears after the hero and returns to the top", async ({ page }) => {
  await page.goto("/");
  const top = page.getByRole("button", { name: "Back to top" });
  await expect(top).toBeHidden();
  await page.locator("#hb-m2").scrollIntoViewIfNeeded();
  await expect(top).toBeVisible();
  await top.click();
  await expect.poll(() => page.evaluate(() => window.scrollY), { timeout: 8_000 }).toBeLessThan(5);
  await expect(top).toBeHidden();
});
