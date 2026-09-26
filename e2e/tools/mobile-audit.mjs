import { chromium, devices } from "@playwright/test";
const S = process.argv[2];
const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
const base = process.env.BASE_URL ?? "http://localhost:3000/";
// overflow check at several widths
for (const w of [320, 360, 390, 430]) {
  const ctx = await browser.newContext({ ...devices["Pixel 7"], viewport: { width: w, height: 844 } });
  const page = await ctx.newPage();
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  const r = await page.evaluate(() => {
    const wide = [...document.querySelectorAll("*")].filter((el) => el.getBoundingClientRect().right > document.documentElement.clientWidth + 1 && getComputedStyle(el).position !== "fixed").slice(0, 6).map((el) => `${el.tagName.toLowerCase()}.${[...el.classList].join(".").slice(0, 40)}`);
    return { scrollW: document.documentElement.scrollWidth, clientW: document.documentElement.clientWidth, wide };
  });
  console.log(w, JSON.stringify(r));
  await ctx.close();
}
// section screenshots at 390 with 3D
const ctx = await browser.newContext({ ...devices["Pixel 7"], viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto(base + "?scenetest", { waitUntil: "networkidle" });
await page.waitForTimeout(4000);
await page.screenshot({ path: `${S}/mobile/hero.png` });
const shots = [["map", "#hb-map"], ["m1-mini", '[data-scene="m1"]'], ["m2-mini", '[data-scene="m2"]'], ["m3-mini", '[data-scene="m3"]'], ["m4-mini", '[data-scene="m4"]'], ["m5-mini", '[data-scene="m5"]'], ["summary", "#hb-summary"], ["book", "#hb-book"]];
for (const [name, sel] of shots) {
  await page.locator(sel).scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollBy(0, -70));
  await page.waitForTimeout(name.includes("mini") ? 4500 : 600);
  await page.screenshot({ path: `${S}/mobile/${name}.png` });
}
// scripture + gloss + chips region of m1
await page.locator("#hb-m1 h2").scrollIntoViewIfNeeded();
await page.evaluate(() => window.scrollBy(0, -80));
await page.waitForTimeout(400);
await page.screenshot({ path: `${S}/mobile/m1-text.png` });
await page.locator("#hb-m1").getByText("Old & New Testament threads").scrollIntoViewIfNeeded();
await page.evaluate(() => window.scrollBy(0, -80));
await page.waitForTimeout(400);
await page.screenshot({ path: `${S}/mobile/m1-chips.png` });
await browser.close();
console.log("audit done");
