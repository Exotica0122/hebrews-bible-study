import { chromium } from "@playwright/test";
const S = process.argv[2];
const wait = Number(process.argv[3] || 4000);
const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on("pageerror", (e) => console.log("[pageerror]", e.message));
page.on("console", (m) => { if (m.type() === "error") console.log("[console error]", m.text().slice(0, 300)); });
await page.goto((process.env.BASE_URL ?? "http://localhost:3000/") + "?scenetest", { waitUntil: "networkidle" });
await page.waitForTimeout(wait);
await page.locator("#hb-top").screenshot({ path: `${S}/shots/scene-hero.png` });
for (const id of ["m1", "m2", "m3", "m4", "m5"]) {
  const panel = page.locator(`[data-scene="${id}"]`);
  await panel.scrollIntoViewIfNeeded();
  await page.waitForTimeout(wait);
  await panel.screenshot({ path: `${S}/shots/scene-${id}.png` });
  if (id === "m1") {
    await page.getByRole("button", { name: "Exact imprint", exact: true }).click();
    await page.waitForTimeout(wait);
    await panel.screenshot({ path: `${S}/shots/scene-m1-seal.png` });
    await page.getByRole("button", { name: "Radiance", exact: true }).click();
  }
}
console.log("canvases at end:", await page.evaluate(() => document.querySelectorAll("canvas").length));
await browser.close();
