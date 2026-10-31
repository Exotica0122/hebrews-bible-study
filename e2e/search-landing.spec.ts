import { expect, test, type Page } from "@playwright/test";

const CHAPTERS = [1, 2, 3, 4, 5, 6, 7];

interface Entry {
  kind: string;
  chapter: number;
  ref: string;
  target: string;
}

const pathOf = (n: number) => (n === 1 ? "/" : `/${n}`);

const ready = (page: Page) =>
  page.waitForFunction(
    () =>
      document.fonts.status === "loaded" &&
      Object.keys(document.querySelector("header button")!).some((k) =>
        k.startsWith("__reactProps"),
      ),
  );

/** Jumps to every target in the page and returns the ones that land badly. */
const audit = (entries: Entry[]) =>
  (async (entries: Entry[]) => {
    const HEADER = 64;
    const frames = async () => {
      for (let i = 0; i < 3; i++)
        await new Promise((done) => requestAnimationFrame(done));
    };
    const offscreen = (el: Element, bottom = window.innerHeight) => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return "hidden";
      if (r.top < HEADER - 1) return `top ${Math.round(r.top)} under header`;
      if (r.bottom > bottom + 1)
        return `bottom ${Math.round(r.bottom)} past ${Math.round(bottom)}`;
      if (r.left < -1 || r.right > window.innerWidth + 1)
        return `sides ${Math.round(r.left)}–${Math.round(r.right)}`;
      return null;
    };
    const check = ({ kind, target }: Entry): string[] => {
      const problems: string[] = [];
      if (kind === "word") {
        const [, mid, key] = /^hb-(m\d+)-(\w+)$/.exec(target)!;
        const word = document.querySelector(`[data-word="${mid}:${key}"]`);
        const popup = document.querySelector('[role="dialog"]');
        if (!word) problems.push("no word in the text");
        if (!popup) problems.push("nothing opened");
        if (word && popup) {
          const sheet = popup.getAttribute("aria-modal") === "true";
          const limit = sheet
            ? popup.getBoundingClientRect().top
            : window.innerHeight;
          const w = offscreen(word, limit);
          if (w) problems.push(`word ${w}`);
          const p = sheet ? null : offscreen(popup);
          if (p) problems.push(`popup ${p}`);
        }
        return problems;
      }
      const el = document.getElementById(target);
      if (!el) return ["no landing spot"];
      if (document.querySelector('[role="dialog"]'))
        problems.push("a word study stayed open");
      const where = offscreen(el);
      if (where) problems.push(where);
      if (kind === "thread" && el.getAttribute("aria-expanded") !== "true")
        problems.push("panel closed");
      return problems;
    };

    const jump = (target: string) => {
      history.pushState(null, "", `#${target}`);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    };

    // The first jump repeats because it can beat the page's hash listener.
    const failures: string[] = [];
    for (const [i, entry] of entries.entries()) {
      jump(entry.target);
      const deadline = performance.now() + 2000;
      let problems = ["not checked"];
      while (problems.length > 0 && performance.now() < deadline) {
        await frames();
        if (i === 0) jump(entry.target);
        problems = check(entry);
      }
      for (const why of problems)
        failures.push(`${entry.kind} ${entry.ref} #${entry.target}: ${why}`);
    }
    return failures;
  })(entries);

for (const lang of ["en", "ko"]) {
  for (const n of CHAPTERS) {
    test(`every ${lang} result in Hebrews ${n} lands on screen`, async ({
      page,
      context,
    }) => {
      test.setTimeout(180_000);
      await context.addCookies([
        { name: "hb-lang", value: lang, domain: "localhost", path: "/" },
      ]);
      await page.emulateMedia({ reducedMotion: "reduce" });
      const res = await page.request.get(`/search-index/${lang}`);
      const entries = (await res.json()) as Entry[];
      const mine = entries.filter((e) => e.chapter === n && e.target);
      await page.goto(pathOf(n));
      await ready(page);
      expect(mine.length).toBeGreaterThan(50);
      expect(await page.evaluate(audit, mine)).toEqual([]);
    });
  }
}

test.describe("on a short laptop", () => {
  test.skip(({ isMobile }) => isMobile, "desktop only");
  for (const n of CHAPTERS) {
    test(`Hebrews ${n} word studies fit`, async ({ page }) => {
      test.setTimeout(180_000);
      await page.setViewportSize({ width: 1280, height: 620 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      const res = await page.request.get("/search-index/en");
      const entries = (await res.json()) as Entry[];
      await page.goto(pathOf(n));
      await ready(page);
      const words = entries.filter((e) => e.chapter === n && e.kind === "word");
      expect(await page.evaluate(audit, words)).toEqual([]);
    });
  }
});

test.describe("on a short phone", () => {
  test.skip(({ isMobile }) => !isMobile, "mobile only");
  for (const lang of ["en", "ko"]) {
    for (const n of [4, 7]) {
      test(`${lang} words in Hebrews ${n} stay above the sheet`, async ({
        page,
        context,
      }) => {
        test.setTimeout(180_000);
        await context.addCookies([
          { name: "hb-lang", value: lang, domain: "localhost", path: "/" },
        ]);
        await page.setViewportSize({ width: 390, height: 664 });
        await page.emulateMedia({ reducedMotion: "reduce" });
        const res = await page.request.get(`/search-index/${lang}`);
        const entries = (await res.json()) as Entry[];
        await page.goto(pathOf(n));
        await ready(page);
        const words = entries.filter(
          (e) => e.chapter === n && e.kind === "word",
        );
        expect(await page.evaluate(audit, words)).toEqual([]);
      });
    }
  }
});

test.describe("picking a word study", () => {
  test("enlightened opens with its popup on screen", async ({ page }) => {
    await page.goto("/6");
    await page.getByRole("button", { name: "Search", exact: true }).click();
    await page.getByRole("combobox", { name: "Search" }).fill("enlight");
    await page
      .getByRole("group", { name: "Word studies" })
      .getByRole("option")
      .first()
      .click();
    const popup = page.getByRole("dialog", { name: "Enlightened" });
    await expect(popup).toBeInViewport({ ratio: 1 });
    await expect(page.locator('[data-word$=":enlightened"]')).toBeInViewport({
      ratio: 1,
    });
  });
});

test.describe("reading the results", () => {
  test.skip(({ isMobile }) => isMobile, "needs a pointer");

  test("a hovered result stays readable", async ({ page }) => {
    await page.goto("/6");
    await page.getByRole("button", { name: "Search", exact: true }).click();
    await page.getByRole("combobox", { name: "Search" }).fill("enlight");
    const word = page
      .getByRole("group", { name: "Word studies" })
      .getByRole("option")
      .first();
    await word.hover();
    await expect(word).toHaveAttribute("aria-selected", "true");
    const ink = await page.evaluate(
      () => getComputedStyle(document.body).color,
    );
    await expect(word).toHaveCSS("color", ink);
  });
});

test("a landed cross-reference can still be tabbed to", async ({ page }) => {
  await page.goto("/#hb-t-m1-john");
  const chip = page.locator("#hb-t-m1-john");
  await expect(chip).toHaveAttribute("aria-expanded", "true");
  expect(await chip.evaluate((el: HTMLElement) => el.tabIndex)).toBe(0);
});
