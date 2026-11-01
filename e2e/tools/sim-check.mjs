// Check a chapter in real Safari on the booted iOS Simulator, then real touch taps in Playwright WebKit.
// Usage: node e2e/tools/sim-check.mjs <chapter> <outDir>
import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { devices, webkit } from "@playwright/test";

const [chapter, out] = process.argv.slice(2);
if (!chapter || !out) {
  console.error("usage: node e2e/tools/sim-check.mjs <chapter> <outDir>");
  process.exit(1);
}
const base = process.env.BASE_URL ?? "http://localhost:3000";
const url = `${base}/${chapter === "1" ? "" : chapter}`;
/** Staggered so no shot lands on a loop's fade: scenes run 14–18 s. */
const BEATS = [7000, 5000];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const simctl = (...args) => execFileSync("xcrun", ["simctl", ...args]);
mkdirSync(out, { recursive: true });

if (!simctl("list", "devices", "booted").includes("Booted")) {
  console.error("no booted simulator: open Simulator.app first");
  process.exit(1);
}

const browser = await webkit.launch();
const context = await browser.newContext(devices["iPhone 15"]);
const page = await context.newPage();
await page.goto(url, { waitUntil: "domcontentloaded" });
const sections = await page
  .locator("[data-scene]")
  .evaluateAll((els) => els.map((el) => el.dataset.scene));

simctl("openurl", "booted", url);
await sleep(8000);
simctl("io", "booted", "screenshot", `${out}/sim-hero.png`);
for (const id of sections) {
  simctl("openurl", "booted", `${url}#hb-${id}`);
  for (const [i, wait] of BEATS.entries()) {
    await sleep(wait);
    simctl("io", "booted", "screenshot", `${out}/sim-${id}-${i}.png`);
  }
}

const problems = [];
const appendix = page.locator("#hb-appendix");
if (await appendix.count()) {
  await appendix.scrollIntoViewIfNeeded();
  const picks = appendix.locator("[data-furnishing]");
  for (let i = (await picks.count()) - 1; i >= 0; i--) {
    const name = (await picks.nth(i).textContent()).trim();
    await picks.nth(i).tap();
    const shown = await appendix
      .getByRole("heading", { level: 3 })
      .textContent();
    if (shown !== name) problems.push(`tapped ${name}, showed ${shown}`);
  }
}
await page.getByRole("button", { name: "한국어" }).tap();
await page.locator("h1", { hasText: "히브리서" }).waitFor({ timeout: 5000 });
const [scroll, width] = await page.evaluate(() => [
  document.documentElement.scrollWidth,
  innerWidth,
]);
if (scroll > width) problems.push(`scrolls sideways: ${scroll} > ${width}`);
await browser.close();

console.log(`${sections.length + 1} sections shot → ${out}`);
if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log("WebKit taps ok");
