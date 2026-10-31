// Render scenes on the real GPU into public/scenes, the stills shown under reduced motion, while loading and without WebGL.
// Usage: node e2e/tools/scene-stills.mjs [sceneId ...]   (no ids renders all). Rerun for any scene you change.
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { chromium } from "@playwright/test";

const base = process.env.BASE_URL ?? "http://localhost:3000";
const OUT = "public/scenes";
const CHAPTERS = [1, 2, 3, 4, 5, 6, 7, 8];
const HEROES = {
  heavens: "hero",
  earth: "heroEarth",
  wilderness: "heroCamp",
  garden: "heroGarden",
  sanctuary: "heroSanctuary",
  coast: "heroCoast",
  salem: "heroSalem",
  pattern: "heroPattern",
};
/** Seconds into each loop, at the hold after the event and before the fade out. */
const MOMENTS = {
  hero: 3,
  heroEarth: 8,
  heroCamp: 8,
  heroGarden: 8,
  heroSanctuary: 8,
  heroCoast: 8,
  heroSalem: 8,
  heroPattern: 9.5,
  radiance: 11,
  seal: 9,
  angels: 13,
  throne: 11,
  fold: 13,
  exalted: 8.6,
  drift: 12,
  crowned: 13,
  gather: 13,
  freed: 13,
  tabernacle: 11,
  rock: 12,
  coals: 12,
  threshold: 15,
  seventh: 15,
  jordan: 14,
  sword: 13,
  mercy: 14,
  offering: 13,
  diadem: 13,
  cries: 14,
  bread: 13,
  foundation: 13,
  rain: 14,
  footsteps: 13,
  oath: 14,
  anchor: 13,
  meeting: 13,
  tithe: 13,
  arise: 13,
  sworn: 13,
  forever: 15,
  trueTent: 12.5,
  pattern: 13,
  second: 13,
  hearts: 15,
  vanish: 13,
};
const VIEWS = [
  {
    dir: OUT,
    heroWidth: 1920,
    panelWidth: 1600,
    options: {
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
    },
  },
  {
    dir: `${OUT}/mobile`,
    heroWidth: 860,
    panelWidth: 860,
    options: {
      viewport: { width: 430, height: 932 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    },
  },
];

function targets() {
  const list = [];
  for (const n of CHAPTERS) {
    const src = readFileSync(`content/hebrews/${n}.ts`, "utf8");
    const url = `${base}/${n === 1 ? "" : n}?scenetest&gpu=3&still`;
    const setting = src.match(/^ {2}setting: "(\w+)"/m)[1];
    list.push({ scene: HEROES[setting], url, panel: "#hb-top" });
    [...src.matchAll(/^ {4}scene: "(\w+)"/gm)].forEach(([, scene], i) => {
      const panel = `[data-scene="m${i + 1}"]`;
      list.push({ scene, url, panel });
      if (scene === "radiance")
        list.push({ scene: "seal", url, panel, alt: true });
    });
  }
  return list;
}

async function capture(browser, target, view) {
  const context = await browser.newContext(view.options);
  const page = await context.newPage();
  await page.goto(target.url, { waitUntil: "domcontentloaded" });
  const panel = page.locator(target.panel);
  await panel.scrollIntoViewIfNeeded();
  await panel
    .locator("[class*=canvasReady] canvas")
    .waitFor({ state: "attached", timeout: 90_000 });
  if (target.alt) {
    await panel.locator('[aria-pressed="false"]').click();
    await page.waitForTimeout(300);
  }
  await page.waitForTimeout(MOMENTS[target.scene] * 1000);
  const url = await panel
    .locator("canvas")
    .evaluate((c) => c.toDataURL("image/png"));
  await context.close();

  const png = join(tmpdir(), `${target.scene}-${process.pid}.png`);
  writeFileSync(png, Buffer.from(url.split(",")[1], "base64"));
  const width = target.panel === "#hb-top" ? view.heroWidth : view.panelWidth;
  const out = `${view.dir}/${target.scene}.webp`;
  execFileSync(
    "cwebp",
    // prettier-ignore
    ["-quiet", "-q", "82", "-m", "6", "-noalpha", "-blend_alpha", "0x14110d", "-resize", String(width), "0", png, "-o", out],
  );
  rmSync(png);
}

const only = process.argv.slice(2);
const todo = targets().filter((t) => !only.length || only.includes(t.scene));
if (only.some((id) => !todo.find((t) => t.scene === id))) {
  console.error(`unknown scene in: ${only.join(" ")}`);
  process.exit(1);
}
for (const view of VIEWS) mkdirSync(view.dir, { recursive: true });

const browser = await chromium.launch({ channel: "chrome", headless: false });
const failed = [];
for (const target of todo)
  for (const view of VIEWS)
    try {
      await capture(browser, target, view);
      console.log(`${view.dir}/${target.scene}.webp`);
    } catch (e) {
      failed.push(`${view.dir}/${target.scene}: ${e.message.split("\n")[0]}`);
    }
await browser.close();
console.log(`${todo.length} scenes, ${failed.length} failed`);
if (failed.length) {
  console.error(failed.join("\n"));
  process.exit(1);
}
