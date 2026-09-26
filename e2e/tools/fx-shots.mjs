import { chromium } from "@playwright/test";
const S = process.argv[2];
const ids = (process.argv[3] || "m1,m3,m5").split(",");
const wait = Number(process.argv[4] || 5000);
const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on("pageerror", (e) => console.log("[pageerror]", e.message));
page.on("console", (m) => { if (m.type() === "error") console.log("[console]", m.text().slice(0, 240)); });
await page.goto((process.env.BASE_URL ?? "http://localhost:3000/") + "?gpu=3&scenetest", { waitUntil: "networkidle" });
await page.waitForTimeout(wait);
if (ids.includes("hero")) await page.locator("#hb-top").screenshot({ path: `${S}/shots/fx-hero.png` });
for (const id of ids.filter((i) => i !== "hero")) {
  const panel = page.locator(`[data-scene="${id}"]`);
  await panel.scrollIntoViewIfNeeded();
  await page.waitForTimeout(wait);
  await panel.screenshot({ path: `${S}/shots/fx-${id}.png` });
  if (id === "m1" && process.argv[5] === "seal") {
    await page.getByRole("button", { name: "Exact imprint", exact: true }).click();
    await page.waitForTimeout(wait);
    await panel.screenshot({ path: `${S}/shots/fx-m1-seal.png` });
  }
}
await browser.close();
console.log("fx shots done");
