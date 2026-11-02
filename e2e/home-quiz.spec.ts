import { expect, test } from "@playwright/test";

test.describe("home page", () => {
  test("offers reading and the quiz, and lists every chapter", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { level: 1, name: "Hebrews" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Start reading/ }),
    ).toHaveAttribute("href", "/1");
    await expect(
      page.getByRole("link", { name: /Take a quiz/ }),
    ).toHaveAttribute("href", "/quiz");
    const grid = page.locator("#hb-book ol > li");
    await expect(grid).toHaveCount(13);
    await expect(
      page.getByRole("link", { name: "Hebrews 12 · Coming soon" }),
    ).toBeVisible();
  });

  test("forwards old chapter 1 links to /1", async ({ page }) => {
    await page.goto("/#hb-m1-radiance");
    await expect(page).toHaveURL(/\/1#hb-m1-radiance$/);
    await expect(page.getByRole("dialog", { name: "Radiance" })).toBeVisible();
  });

  test("continues where the reader left off", async ({ page }) => {
    await page.goto("/4");
    await expect(
      page.getByRole("heading", { level: 1, name: "Hebrews 4" }),
    ).toBeVisible();
    await expect
      .poll(() => page.evaluate(() => localStorage.getItem("hb-last-read")))
      .toContain('"chapter":4');
    await page.goto("/");
    await expect(
      page.getByRole("link", { name: /Continue reading.*Hebrews 4/ }),
    ).toBeVisible();
  });
});

test.describe("quiz", () => {
  test("plays a round, explains each answer and saves progress", async ({
    page,
  }) => {
    await page.goto("/quiz");
    await page.getByRole("button", { name: "Start round" }).click();
    for (let i = 1; i <= 5; i++) {
      await expect(page.getByText(`${i} of 5`)).toBeVisible();
      await page.locator("main [class*=options] button").first().click();
      await expect(
        page.getByRole("link", { name: /^Read Hebrews/ }),
      ).toBeVisible();
      await page
        .getByRole("button", { name: i < 5 ? "Next question" : "See results" })
        .click();
    }
    await expect(page.getByText("Your round")).toBeVisible();
    await expect(page.locator("main li")).toHaveCount(5);
    await page.goto("/");
    await expect(
      page.getByRole("link", { name: /Last round \d of 5/ }),
    ).toBeVisible();
  });

  test("a chapter quiz starts straight away on that chapter", async ({
    page,
  }) => {
    await page.goto("/quiz/7");
    await expect(page.getByText("1 of 5")).toBeVisible();
    await expect(page.getByText(/^Hebrews 7:/).first()).toBeVisible();
  });

  test("each chapter page links to its quiz", async ({ page }) => {
    await page.goto("/3");
    await expect(
      page.getByRole("link", { name: "Start the quiz" }),
    ).toHaveAttribute("href", "/quiz/3");
  });

  test("chapters without a quiz are not found", async ({ page }) => {
    const res = await page.goto("/quiz/12");
    expect(res?.status()).toBe(404);
  });
});
