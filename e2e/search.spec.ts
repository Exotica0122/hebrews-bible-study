import { expect, test, type Locator, type Page } from "@playwright/test";

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
    await page.evaluate(() => {
      const glows: string[] = [];
      Object.assign(window, { glows });
      const animate = Element.prototype.animate;
      Element.prototype.animate = function (...args) {
        glows.push(this.id);
        return animate.apply(this, args);
      };
    });
    const input = await openSearch(page);
    await input.fill("exact imprint");
    await page
      .getByRole("option", { name: /Hebrews 1:3/ })
      .first()
      .click();
    await expect(page).toHaveURL(/#hb-v3$/);
    await expect.poll(() => inView(page, "#hb-v3")).toBe(true);
    await expect
      .poll(() =>
        page.evaluate(() => (window as unknown as { glows: string[] }).glows),
      )
      .toContain("hb-v3");
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
    await input.fill("12:1");
    await expect(page.getByText("Hebrews 12 is coming soon.")).toBeVisible();
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
    await expect(page.getByText("Hebrews 1–11", { exact: true })).toBeVisible();
  });

  test("works on a coming-soon page", async ({ page }) => {
    await page.goto("/12");
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

test.describe("recently viewed", () => {
  const pick = async (page: Page, input: Locator, query: string) => {
    await input.fill(query);
    await page.getByRole("option").first().click();
    await expect(page.getByRole("dialog")).toBeHidden();
  };
  const recent = (page: Page) =>
    page.getByRole("group", { name: "Recently viewed" });

  test("a fresh search shows no history", async ({ page }) => {
    await page.goto("/");
    await openSearch(page);
    await expect(page.getByText("Hebrews 1–11", { exact: true })).toBeVisible();
    await expect(recent(page)).toHaveCount(0);
  });

  test("opened items are remembered, newest first, across reloads", async ({
    page,
  }) => {
    await page.goto("/");
    await pick(page, await openSearch(page), "1:3");
    await pick(page, await openSearch(page), "1:5");
    await page.reload();
    await openSearch(page);
    await expect(recent(page).getByRole("option")).toHaveText([
      /^Hebrews 1:5/,
      /^Hebrews 1:3/,
    ]);
  });

  test("it remembers the item, not the unfinished query", async ({ page }) => {
    await page.goto("/");
    await pick(page, await openSearch(page), "radianc");
    await openSearch(page);
    const option = recent(page).getByRole("option");
    await expect(option).toContainText(/radiance/i);
    await expect(option).not.toHaveText("radianc");
  });

  test("a search with no result adds nothing", async ({ page }) => {
    await page.goto("/");
    const input = await openSearch(page);
    await pick(page, input, "1:3");
    await (await openSearch(page)).fill("sparrow");
    await input.fill("");
    await expect(recent(page).getByRole("option")).toHaveCount(1);
  });

  test("an item goes straight back to its place", async ({ page }) => {
    await page.goto("/");
    await pick(page, await openSearch(page), "6:19");
    await expect(page).toHaveURL(/\/6#hb-v19$/);
    await page.goto("/");
    await openSearch(page);
    await recent(page)
      .getByRole("option", { name: /Hebrews 6:19/ })
      .click();
    await expect(page).toHaveURL(/\/6#hb-v19$/);
    await expect(page.getByRole("dialog")).toBeHidden();
    await expect.poll(() => inView(page, "#hb-v19")).toBe(true);
  });

  test("one can be removed, or all cleared", async ({ page }) => {
    await page.goto("/");
    await pick(page, await openSearch(page), "1:3");
    const input = await openSearch(page);
    await pick(page, input, "1:5");
    await openSearch(page);
    await page.getByRole("button", { name: "Remove Hebrews 1:5" }).click();
    await expect(recent(page).getByRole("option")).toHaveText([/^Hebrews 1:3/]);
    await expect(input).toBeFocused();
    await page.getByRole("button", { name: "Clear" }).click();
    await expect(recent(page)).toHaveCount(0);
    await page.reload();
    await openSearch(page);
    await expect(recent(page)).toHaveCount(0);
  });

  test("the plain queries of the earlier format are dropped", async ({
    page,
  }) => {
    await page.goto("/");
    await page.evaluate(() =>
      window.localStorage.setItem("hb-search-history-en", '["for","enligh"]'),
    );
    await page.reload();
    await openSearch(page);
    await expect(recent(page)).toHaveCount(0);
  });

  test("each language keeps its own history", async ({ page, context }) => {
    await page.goto("/");
    await pick(page, await openSearch(page), "1:3");
    await context.addCookies([
      { name: "hb-lang", value: "ko", domain: "localhost", path: "/" },
    ]);
    await page.evaluate(() => window.localStorage.setItem("hb-lang", "ko"));
    await page.goto("/");
    await page.getByRole("button", { name: "검색", exact: true }).click();
    await expect(page.getByRole("group", { name: "최근 본 항목" })).toHaveCount(
      0,
    );
  });
});

test.describe("search on a small phone", () => {
  test.skip(({ isMobile }) => !isMobile, "mobile only");

  for (const width of [320, 360, 390]) {
    test(`the header fits at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 700 });
      await page.goto("/7");
      const scrollWidth = await page.evaluate(async () => {
        await document.fonts.ready;
        return document.documentElement.scrollWidth;
      });
      expect(scrollWidth).toBeLessThanOrEqual(width);
    });
  }
});

test("the header gives way when a label renders wider", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "mobile only");
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto("/7");
  await page.addStyleTag({
    content: "[class*=langKo] { padding-right: 28px !important; }",
  });
  const scrollWidth = await page.evaluate(async () => {
    await document.fonts.ready;
    return document.documentElement.scrollWidth;
  });
  expect(scrollWidth).toBeLessThanOrEqual(320);
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

  test("arrows walk recent items and nothing is chosen until then", async ({
    page,
  }) => {
    await page.goto("/");
    const input = await openSearch(page);
    await input.fill("1:3");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#hb-v3$/);
    await expect(page.getByRole("dialog")).toBeHidden();
    await page.evaluate(() => history.replaceState(null, "", "/"));
    await page.keyboard.press("ControlOrMeta+k");
    await expect(input).toHaveValue("");
    const option = page.getByRole("option", { name: /Hebrews 1:3/ });
    await expect(option).toHaveAttribute("aria-selected", "false");
    await page.keyboard.press("Enter");
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("ArrowDown");
    await expect(option).toHaveAttribute("aria-selected", "true");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#hb-v3$/);
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
