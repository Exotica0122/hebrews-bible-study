// Screenshot a chapter's hero and every movement scene for review.
// Usage: node e2e/tools/chapter-shots.mjs <chapter> <outDir> [--swiftshader]
// Default runs headed Chrome on the real GPU, so post-processing is on as visitors see it;
// SwiftShader turns effects off and hides bugs in them. Also shoots the reduced-motion CSS twins and mobile.
import { mkdirSync } from "node:fs";
import { chromium } from "@playwright/test";

const [chapter, out, flag] = process.argv.slice(2);
if (!chapter || !out) {
  console.error(
    "usage: node e2e/tools/chapter-shots.mjs <chapter> <outDir> [--swiftshader]",
  );
  process.exit(1);
}
const base = process.env.BASE_URL ?? "http://localhost:3000";
const url = `${base}/${chapter === "1" ? "" : chapter}`;
const swift = flag === "--swiftshader";
/** Waits between shots, so each scene is caught at several points in its 14–18 s loop. */
const BEATS = [2500, 4500, 4500, 4500];
mkdirSync(out, { recursive: true });

const browser = swift
  ? await chromium.launch({
      args: [
        "--use-angle=swiftshader",
        "--enable-unsafe-swiftshader",
        "--ignore-gpu-blocklist",
      ],
    })
  : await chromium.launch({ channel: "chrome", headless: false });
const problems = [];

async function shoot(label, options, beats) {
  const page = await browser.newPage(options);
  page.on("pageerror", (e) =>
    problems.push(`${label} pageerror: ${e.message}`),
  );
  page.on("console", (m) => {
    if (m.type() === "error")
      problems.push(`${label} console: ${m.text().slice(0, 200)}`);
  });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(6000);
  await page
    .locator("#hb-top")
    .screenshot({ path: `${out}/${label}-hero.png` });
  const ids = await page
    .locator("[data-scene]")
    .evaluateAll((els) => els.map((el) => el.getAttribute("data-scene")));
  for (const id of ids) {
    const panel = page.locator(`[data-scene="${id}"]`);
    await panel.scrollIntoViewIfNeeded();
    for (const [i, wait] of beats.entries()) {
      await page.waitForTimeout(wait);
      await panel.screenshot({ path: `${out}/${label}-${id}-${i}.png` });
    }
    const effects = await panel.getAttribute("data-effects");
    if (!swift && label === "gpu" && effects !== "on")
      problems.push(`${label} ${id}: effects ${effects}, expected on`);
  }
  await page.close();
  return ids.length;
}

const n = await shoot(
  swift ? "swift" : "gpu",
  { viewport: { width: 1440, height: 900 } },
  BEATS,
);
await shoot(
  "css",
  { viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" },
  [2500],
);
await shoot(
  "mobile",
  { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
  [3000, 5000],
);
await browser.close();

console.log(`Hebrews ${chapter}: hero + ${n} scenes → ${out}`);
console.log(problems.length ? problems.join("\n") : "no page errors");
