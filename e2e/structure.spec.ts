import { expect, test } from "@playwright/test";

test("renders the Hebrews 1 study page skeleton", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: "Hebrews 1" })).toBeVisible();
  for (const id of ["hb-map", "hb-m1", "hb-m2", "hb-m3", "hb-m4", "hb-m5", "hb-summary", "hb-book"]) {
    await expect(page.locator(`#${id}`)).toBeAttached();
  }
  await expect(page.getByRole("heading", { level: 2, name: "Fourteen verses, five movements" })).toBeVisible();
  await expect(page.locator("footer")).toContainText("Hebrews 1 group study");
});

test("desktop header shows the section nav; mobile shows the active label", async ({ page }, testInfo) => {
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
