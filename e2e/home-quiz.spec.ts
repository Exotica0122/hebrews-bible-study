import { expect, test, type Page } from "@playwright/test";

/** Answers every question in the round with its first option. */
async function answerAll(page: Page, total: number, pick = 0) {
  for (let i = 1; i <= total; i++) {
    await page.getByRole("radio").nth(pick).click();
    await page.getByRole("button", { name: "Check" }).click();
    await page
      .getByRole("button", { name: i < total ? "Continue" : "See results" })
      .click();
  }
}

test("the header quiz link opens the chapter's quiz, or the quiz page off a chapter", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "hidden on phones");
  const quiz = page.getByRole("banner").getByRole("link", { name: "Quiz" });
  await page.goto("/1");
  await expect(quiz).toHaveAttribute("href", "/quiz/1");
  await page.goto("/");
  await expect(quiz).toHaveAttribute("href", "/quiz");
  await page.getByRole("button", { name: "Chapters" }).click();
  await expect(page.getByRole("menu").getByRole("menuitem")).toHaveCount(13);
});

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
    await page
      .getByRole("button", { name: "Start · 5 questions from 11 chapters" })
      .click();
    for (let i = 1; i <= 5; i++) {
      await expect(page.getByText(`${i} of 5`)).toBeVisible();
      await page.getByRole("radio").first().click();
      await page.getByRole("button", { name: "Check" }).click();
      await expect(
        page.getByRole("link", { name: /^Read Hebrews/ }),
      ).toBeVisible();
      await page
        .getByRole("button", { name: i < 5 ? "Continue" : "See results" })
        .click();
    }
    await expect(page.getByText("Your round")).toBeVisible();
    await expect(page.locator("main li")).toHaveCount(5);
    await page.goto("/");
    await expect(page.getByText(/Last round \d of 5/)).toBeVisible();
  });

  test("a chapter quiz takes every question in that chapter", async ({
    page,
  }) => {
    await page.goto("/quiz/7");
    await expect(page.getByText("1 of 9")).toBeVisible();
    await expect(page.getByText(/^Hebrews 7:/)).toHaveCount(0);
    await page.getByRole("radio").first().click();
    await page.getByRole("button", { name: "Check" }).click();
    await expect(page.getByText(/^Hebrews 7:/).first()).toBeVisible();
  });

  test("a wrong choice says why it is wrong, here and in the results", async ({
    page,
  }) => {
    await page.goto("/quiz/1");
    await expect(page.getByText("1 of 9")).toBeVisible();
    for (let i = 1; i <= 9; i++) {
      const radios = page.getByRole("radio");
      const choice =
        (await radios.count()) > 2 &&
        !(await page.getByText("Which chapter says this?").isVisible());
      await radios.last().click();
      await page.getByRole("button", { name: "Check" }).click();
      if (choice && (await page.getByText("Not quite").isVisible()))
        await expect(page.getByText("Why not:").first()).toBeVisible();
      await page
        .getByRole("button", { name: i < 9 ? "Continue" : "See results" })
        .click();
    }
    const missed = page.locator("main li").filter({ hasText: "✕" });
    if ((await missed.count()) > 0)
      await expect(page.getByText(/^You chose:/).first()).toBeVisible();
  });

  test("a round survives a trip to read the passage", async ({ page }) => {
    await page.goto("/quiz/3");
    await expect(page.getByText("1 of 9")).toBeVisible();
    await page.getByRole("radio").first().click();
    await page.getByRole("button", { name: "Check" }).click();
    await page.getByRole("link", { name: /^Read Hebrews 3:/ }).click();
    await expect(page).toHaveURL(/\/3#hb-/);
    await page.goBack();
    await expect(page.getByText("1 of 9")).toBeVisible();
    await expect(page.getByRole("button", { name: "Continue" })).toBeVisible();
  });

  test("leaving a round any other way opens the selection", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /^Quick round/ }).click();
    await expect(page.getByText("1 of 5")).toBeVisible();
    await page.getByRole("radio").first().click();
    await page.getByRole("button", { name: "Check" }).click();
    await expect(page.getByRole("button", { name: "Continue" })).toBeVisible();
    await page.goto("/");
    await page.getByRole("link", { name: "Take a quiz" }).click();
    await expect(page.getByRole("heading", { name: "Practice" })).toBeVisible();
  });

  test("the home page starts a quick round in one tap", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /^Quick round/ }).click();
    await expect(page.getByText("1 of 5")).toBeVisible();
    await expect(page).toHaveURL(/\/quiz$/);
  });

  test("the selection sets the round, and results offer a retake or a new selection", async ({
    page,
  }) => {
    await page.goto("/quiz");
    await page.getByRole("button", { name: "None" }).click();
    await expect(
      page.getByRole("button", { name: "Choose at least one chapter" }),
    ).toBeDisabled();
    await page.getByRole("button", { name: /^Hebrews 2 ·/ }).click();
    await page.getByRole("button", { name: /^Hebrews 8 ·/ }).click();
    await expect(
      page.getByRole("button", { name: /^10 questions/ }),
    ).toBeEnabled();
    await page.getByRole("button", { name: /^All 17/ }).click();
    await page
      .getByRole("button", { name: "Start · 17 questions from 2 chapters" })
      .click();
    for (let i = 1; i <= 17; i++) {
      await page.getByRole("radio").first().click();
      await page.getByRole("button", { name: "Check" }).click();
      await page
        .getByRole("button", { name: i < 17 ? "Continue" : "See results" })
        .click();
    }
    await expect(page.locator("main li")).toHaveCount(17);
    await page.getByRole("button", { name: "Retake this quiz" }).click();
    await expect(page.getByText("1 of 17")).toBeVisible();
    await page.getByRole("button", { name: "End" }).click();
    await expect(
      page.getByRole("button", { name: /^Hebrews 2 ·/ }),
    ).toHaveAttribute("aria-pressed", "true");
    await expect(
      page.getByRole("button", { name: /^Hebrews 1 ·/ }),
    ).toHaveAttribute("aria-pressed", "false");
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

  test("an answer is chosen first and only marked on Check", async ({
    page,
  }) => {
    await page.goto("/quiz/3");
    const check = page.getByRole("button", { name: "Check" });
    await expect(check).toBeDisabled();
    const options = page.getByRole("radio");
    await options.nth(0).click();
    await expect(options.nth(0)).toHaveAttribute("aria-checked", "true");
    await options.nth(1).click();
    await expect(options.nth(0)).toHaveAttribute("aria-checked", "false");
    await expect(options.nth(1)).toHaveAttribute("aria-checked", "true");
    await expect(page.getByText(/^Read Hebrews/)).toHaveCount(0);
    await check.click();
    await expect(page.getByText(/^(That’s right|Not quite)$/)).toBeVisible();
    await expect(
      page.getByRole("link", { name: /^Read Hebrews 3:/ }),
    ).toBeVisible();
    // Once checked, the answers are locked.
    await expect(options.nth(0)).toHaveAttribute("aria-disabled", "true");
    await options.nth(0).click({ force: true });
    await expect(options.nth(1)).toHaveAttribute("aria-checked", "true");
  });

  test("the keyboard picks with numbers and checks with Enter", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name === "mobile", "no hardware keyboard");
    await page.goto("/quiz/5");
    await expect(page.getByText("1 of 9")).toBeVisible();
    await page.keyboard.press("2");
    await expect(page.getByRole("radio").nth(1)).toHaveAttribute(
      "aria-checked",
      "true",
    );
    await page.keyboard.press("Enter");
    await expect(page.getByRole("button", { name: "Continue" })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.getByText("2 of 9")).toBeVisible();
  });

  test("after a review, retake the same questions or the full quiz", async ({
    page,
  }) => {
    await page.goto("/quiz/8");
    await expect(page.getByText("1 of 8")).toBeVisible();
    // The last option is never right for a true/false statement that is true,
    // so pick per question until at least one is missed.
    await answerAll(page, 8, 1);
    const review = page.getByRole("button", { name: /^Review the/ });
    test.skip(
      (await review.count()) === 0,
      "every answer happened to be right",
    );
    await review.click();
    const missed = Number(
      (await page.getByText(/^1 of \d+$/).textContent())?.split(" of ")[1],
    );
    await answerAll(page, missed);
    await expect(
      page.getByRole("button", { name: "Retake these questions" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Retake the full quiz" }).click();
    await expect(page.getByText("1 of 8")).toBeVisible();
  });
});
