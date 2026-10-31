import { expect, test, type Page } from "@playwright/test";

const openSearch = async (page: Page) => {
  await page.getByRole("button", { name: "Search", exact: true }).click();
  return page.getByRole("combobox", { name: "Search" });
};

const inView = (page: Page, selector: string) =>
  page.locator(selector).evaluate((el) => {
    const { top } = el.getBoundingClientRect();
    return top >= 64 && top < window.innerHeight / 2;
  });

test.describe("search", () => {
  test("a verse jumps to that exact verse in another chapter", async ({
    page,
  }) => {
    await page.goto("/");
    const input = await openSearch(page);
    await input.fill("6:19");
    await page
      .getByRole("option", { name: /Hebrews 6:19/ })
      .first()
      .click();
    await expect(page).toHaveURL(/\/6#hb-v19$/);
    await expect(page.locator("#hb-v19")).toContainText("anchor of the soul");
    await expect.poll(() => inView(page, "#hb-v19")).toBe(true);
    await expect(page.getByRole("dialog")).toBeHidden();
  });

  test("a word in the current chapter glows at its verse", async ({ page }) => {
    await page.goto("/");
    const input = await openSearch(page);
    await input.fill("exact imprint");
    await page
      .getByRole("option", { name: /Hebrews 1:3/ })
      .first()
      .click();
    await expect(page).toHaveURL(/#hb-v3$/);
    await expect.poll(() => inView(page, "#hb-v3")).toBe(true);
    const glowing = await page
      .locator("#hb-v3")
      .evaluate((el) => el.getAnimations().length);
    expect(glowing).toBeGreaterThan(0);
  });

  test("a commentary subheading lands on the subheading", async ({ page }) => {
    await page.goto("/6");
    const input = await openSearch(page);
    await input.fill("behind the curtain");
    await page
      .getByRole("option", { name: /Behind the curtain/ })
      .first()
      .click();
    await expect(page).toHaveURL(/#hb-c-m5-\d+$/);
    const heading = page.getByRole("heading", { name: "Behind the curtain" });
    await expect(heading).toBeInViewport();
  });

  test("a word study opens at its section", async ({ page }) => {
    await page.goto("/2");
    const input = await openSearch(page);
    await input.fill("apaugasma");
    await page
      .getByRole("option", { name: /Radiance/ })
      .first()
      .click();
    await expect(page).toHaveURL(/\/#?hb-m1-radiance$|\/#hb-m1-radiance$/);
    await expect(page.getByRole("dialog", { name: "Radiance" })).toBeVisible();
  });

  test("a cross-reference opens its panel", async ({ page }) => {
    await page.goto("/");
    const input = await openSearch(page);
    await input.fill("Jer 31");
    const option = page
      .getByRole("listbox")
      .getByRole("group", { name: "Cross-references" })
      .getByRole("option")
      .first();
    await option.click();
    await expect(page).toHaveURL(/#hb-t-m\d+-\w+$/);
    await expect(
      page.locator("[id^='hb-t-'][aria-expanded='true']:focus"),
    ).toBeVisible();
  });

  test("Korean searches the Korean text", async ({ page, context }) => {
    await context.addCookies([
      { name: "hb-lang", value: "ko", domain: "localhost", path: "/" },
    ]);
    await page.goto("/6");
    await page.getByRole("button", { name: "검색", exact: true }).click();
    const input = page.getByRole("combobox", { name: "검색" });
    await input.fill("닻");
    await expect(
      page.getByRole("option", { name: /히브리서 6:19/ }).first(),
    ).toBeVisible();
    await input.fill("anchor");
    await expect(page.getByText("찾지 못했습니다")).toBeVisible();
  });

  test("an unwritten chapter says it is coming soon", async ({ page }) => {
    await page.goto("/");
    const input = await openSearch(page);
    await input.fill("9:14");
    await expect(page.getByText("Hebrews 9 is coming soon.")).toBeVisible();
  });

  test("nothing found says so", async ({ page }) => {
    await page.goto("/");
    const input = await openSearch(page);
    await input.fill("sparrow");
    await expect(page.getByText(/No matches for “sparrow”/)).toBeVisible();
  });

  test("a failed index load offers a retry", async ({ page }) => {
    await page.route("**/search-index/en", (route) => route.abort());
    await page.goto("/");
    await openSearch(page);
    const dialog = page.getByRole("dialog");
    await expect(dialog.getByRole("alert")).toContainText("couldn’t load");
    await page.unroute("**/search-index/en");
    await page.getByRole("button", { name: "Try again" }).click();
    await expect(dialog.getByRole("alert")).toHaveCount(0);
    await expect(page.getByText("Search Hebrews 1–8")).toBeVisible();
  });

  test("works on a coming-soon page", async ({ page }) => {
    await page.goto("/10");
    const input = await openSearch(page);
    await input.fill("anchor of the soul");
    await page
      .getByRole("option", { name: /Hebrews 6:19/ })
      .first()
      .click();
    await expect(page).toHaveURL(/\/6#hb-v19$/);
  });

  test("Cancel or Escape returns to the same place", async ({
    page,
  }, testInfo) => {
    await page.goto("/");
    await page.evaluate(() => window.scrollTo(0, 2000));
    await openSearch(page);
    if (testInfo.project.name === "mobile")
      await page.getByRole("button", { name: "Cancel" }).click();
    else await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toBeHidden();
    expect(await page.evaluate(() => window.scrollY)).toBe(2000);
  });
});

test.describe("search on a small phone", () => {
  test.skip(({ isMobile }) => !isMobile, "mobile only");

  for (const width of [320, 360, 390]) {
    test(`the header fits at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 700 });
      await page.goto("/7");
      const scrollWidth = await page.evaluate(
        () => document.documentElement.scrollWidth,
      );
      expect(scrollWidth).toBeLessThanOrEqual(width);
    });
  }
});

test.describe("search on a keyboard", () => {
  test.skip(({ isMobile }) => isMobile, "desktop only");

  test("the shortcut opens it and arrows pick a result", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("ControlOrMeta+k");
    const input = page.getByRole("combobox", { name: "Search" });
    await expect(input).toBeFocused();
    await input.fill("radiance");
    const options = page.getByRole("option");
    await expect(options.first()).toHaveAttribute("aria-selected", "true");
    await page.keyboard.press("ArrowDown");
    await expect(options.nth(1)).toHaveAttribute("aria-selected", "true");
    await page.keyboard.press("ArrowUp");
    await page.keyboard.press("Enter");
    await expect(page.getByRole("dialog")).toBeHidden();
  });

  test("the query survives reopening, selected", async ({ page }) => {
    await page.goto("/");
    const input = await openSearch(page);
    await input.fill("anchor");
    await page.keyboard.press("Escape");
    await page.keyboard.press("ControlOrMeta+k");
    await expect(input).toHaveValue("anchor");
    const selected = await input.evaluate(
      (el: HTMLInputElement) => el.selectionEnd! - el.selectionStart!,
    );
    expect(selected).toBe(6);
  });
});
