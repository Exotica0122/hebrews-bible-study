import { chromium, devices } from "@playwright/test";
const S = process.argv[2];
const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
const base = process.env.BASE_URL ?? "http://localhost:3000/";
// mobile with 3D
let ctx = await browser.newContext({ ...devices["Pixel 7"], viewport: { width: 390, height: 844 } });
let page = await ctx.newPage();
await page.goto(base + "?scenetest", { waitUntil: "networkidle" });
await page.waitForTimeout(4000);
await page.screenshot({ path: `${S}/shots/mobile-hero-3d.png` });
await page.locator('[data-scene="m1"]').scrollIntoViewIfNeeded();
await page.waitForTimeout(4500);
await page.locator('[data-scene="m1"]').screenshot({ path: `${S}/shots/mobile-m1-3d.png` });
await page.locator('[data-scene="m3"]').scrollIntoViewIfNeeded();
await page.waitForTimeout(4500);
await page.locator('[data-scene="m3"]').screenshot({ path: `${S}/shots/mobile-m3-3d.png` });
await ctx.close();
// reduced motion desktop
ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
page = await ctx.newPage();
await page.goto(base, { waitUntil: "networkidle" });
await page.locator('[data-scene="m2"]').scrollIntoViewIfNeeded();
await page.waitForTimeout(2500);
await page.locator('[data-scene="m2"]').screenshot({ path: `${S}/shots/reduced-m2.png` });
console.log("reduced canvases:", await page.evaluate(() => document.querySelectorAll("canvas").length));
await browser.close();
