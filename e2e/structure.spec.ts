import { expect, test } from "@playwright/test";

test("renders the Hebrews 1 study page skeleton", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { level: 1, name: "Hebrews 1" }),
  ).toBeVisible();
  for (const id of [
    "hb-map",
    "hb-m1",
    "hb-m2",
    "hb-m3",
    "hb-m4",
    "hb-m5",
    "hb-summary",
    "hb-book",
  ]) {
    await expect(page.locator(`#${id}`)).toBeAttached();
  }
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "Fourteen verses, five movements",
    }),
  ).toBeVisible();
  await expect(page.locator("footer")).toContainText("Hebrews group study");
});

test("renders Hebrews 2 with four movements and 새번역 in Korean", async ({
  page,
}) => {
  await page.goto("/2");
  await expect(
    page.getByRole("heading", { level: 1, name: "Hebrews 2" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "Eighteen verses, four movements",
    }),
  ).toBeVisible();
  for (const id of ["m1", "m2", "m3", "m4"])
    await expect(page.locator(`#hb-${id}`)).toBeAttached();
  await expect(page.locator("#hb-m5")).toHaveCount(0);
  await expect(page.locator("footer")).toContainText(
    "He is able to help those who are being tempted.",
  );
  await page.getByRole("button", { name: "한국어" }).click();
  await expect(
    page.getByRole("heading", { level: 1, name: "히브리서 2장" }),
  ).toBeVisible();
  await expect(page.locator("#hb-m1")).toContainText("새번역");
});

test("renders Hebrews 3 with four movements and 새번역 in Korean", async ({
  page,
}) => {
  await page.goto("/3");
  await expect(
    page.getByRole("heading", { level: 1, name: "Hebrews 3" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "Nineteen verses, four movements",
    }),
  ).toBeVisible();
  for (const id of ["m1", "m2", "m3", "m4"])
    await expect(page.locator(`#hb-${id}`)).toBeAttached();
  await expect(page.locator("#hb-m5")).toHaveCount(0);
  await page.getByRole("button", { name: "한국어" }).click();
  await expect(
    page.getByRole("heading", { level: 1, name: "히브리서 3장" }),
  ).toBeVisible();
  await expect(page.locator("#hb-m2")).toContainText(
    "오늘 너희가 그의 음성을 듣거든",
  );
});

test("renders Hebrews 4 with four movements and 새번역 in Korean", async ({
  page,
}) => {
  await page.goto("/4");
  await expect(
    page.getByRole("heading", { level: 1, name: "Hebrews 4" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "Sixteen verses, four movements",
    }),
  ).toBeVisible();
  for (const id of ["m1", "m2", "m3", "m4"])
    await expect(page.locator(`#hb-${id}`)).toBeAttached();
  await expect(page.locator("#hb-m5")).toHaveCount(0);
  await page.getByRole("button", { name: "한국어" }).click();
  await expect(
    page.getByRole("heading", { level: 1, name: "히브리서 4장" }),
  ).toBeVisible();
  await expect(page.locator("#hb-m3")).toContainText(
    "어떤 양날칼보다도 더 날카롭습니다",
  );
});

test("renders Hebrews 5 with four movements and 새번역 in Korean", async ({
  page,
}) => {
  await page.goto("/5");
  await expect(
    page.getByRole("heading", { level: 1, name: "Hebrews 5" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "Fourteen verses, four movements",
    }),
  ).toBeVisible();
  for (const id of ["m1", "m2", "m3", "m4"])
    await expect(page.locator(`#hb-${id}`)).toBeAttached();
  await expect(page.locator("#hb-m5")).toHaveCount(0);
  await page.getByRole("button", { name: "한국어" }).click();
  await expect(
    page.getByRole("heading", { level: 1, name: "히브리서 5장" }),
  ).toBeVisible();
  await expect(page.locator("#hb-m2")).toContainText(
    "멜기세덱의 계통을 따라 임명받은 영원한 제사장",
  );
});

test("renders Hebrews 6 with five movements and 새번역 in Korean", async ({
  page,
}) => {
  await page.goto("/6");
  await expect(
    page.getByRole("heading", { level: 1, name: "Hebrews 6" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "Twenty verses, five movements",
    }),
  ).toBeVisible();
  for (const id of ["m1", "m2", "m3", "m4", "m5"])
    await expect(page.locator(`#hb-${id}`)).toBeAttached();
  await expect(page.locator("#hb-m6")).toHaveCount(0);
  await page.getByRole("button", { name: "한국어" }).click();
  await expect(
    page.getByRole("heading", { level: 1, name: "히브리서 6장" }),
  ).toBeVisible();
  await expect(page.locator("#hb-m5")).toContainText(
    "안전하고 확실한 영혼의 닻",
  );
});

test("renders Hebrews 7 with five movements and 새번역 in Korean", async ({
  page,
}) => {
  await page.goto("/7");
  await expect(
    page.getByRole("heading", { level: 1, name: "Hebrews 7" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "Twenty-eight verses, five movements",
    }),
  ).toBeVisible();
  for (const id of ["m1", "m2", "m3", "m4", "m5"])
    await expect(page.locator(`#hb-${id}`)).toBeAttached();
  await expect(page.locator("#hb-m6")).toHaveCount(0);
  await page.getByRole("button", { name: "한국어" }).click();
  await expect(
    page.getByRole("heading", { level: 1, name: "히브리서 7장" }),
  ).toBeVisible();
  await expect(page.locator("#hb-m5")).toContainText(
    "늘 살아 계셔서 그들을 위하여 중재의 간구",
  );
});

test("renders Hebrews 8 with five movements and 새번역 in Korean", async ({
  page,
}) => {
  await page.goto("/8");
  await expect(
    page.getByRole("heading", { level: 1, name: "Hebrews 8" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "Thirteen verses, five movements",
    }),
  ).toBeVisible();
  for (const id of ["m1", "m2", "m3", "m4", "m5"])
    await expect(page.locator(`#hb-${id}`)).toBeAttached();
  await expect(page.locator("#hb-m6")).toHaveCount(0);
  await page.getByRole("button", { name: "한국어" }).click();
  await expect(
    page.getByRole("heading", { level: 1, name: "히브리서 8장" }),
  ).toBeVisible();
  await expect(page.locator("#hb-m4")).toContainText(
    "그들의 마음에다가 새겨 주겠다",
  );
});

test("desktop header shows the section nav; mobile shows the active label", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Sections" });
  if (testInfo.project.name === "desktop") {
    await expect(nav).toBeVisible();
    await expect(nav.getByRole("button")).toHaveCount(7);
  } else {
    await expect(nav).toBeHidden();
  }
});

test("shows the chapter index with chapter 1 live", async ({ page }) => {
  await page.goto("/");
  const book = page.locator("#hb-book");
  await expect(book.getByRole("link")).toHaveCount(13);
  await expect(book).toContainText("Studying now");
});

test("never scrolls horizontally on a 320px phone", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto("/");
  const widths = await page.evaluate(() => ({
    scroll: document.documentElement.scrollWidth,
    client: document.documentElement.clientWidth,
  }));
  expect(widths.scroll).toBe(widths.client);
});
