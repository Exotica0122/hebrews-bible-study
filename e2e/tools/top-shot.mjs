import { chromium, devices } from "@playwright/test";
const S = process.argv[2];
const browser = await chromium.launch();
for (const [name, ctxOpts] of [["desktop", { viewport: { width: 1440, height: 900 } }], ["mobile", { ...devices["Pixel 7"], viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 }]]) {
  const ctx = await browser.newContext({ ...ctxOpts, storageState: { cookies: [{ name: "hb-intro", value: "1", domain: "localhost", path: "/", expires: -1, httpOnly: false, secure: false, sameSite: "Lax" }], origins: [] } });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await page.locator("#hb-m3 h2").scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  const box = await page.getByRole("button", { name: "Back to top" }).boundingBox();
  const vw = page.viewportSize();
  await page.screenshot({ path: `${S}/shots/top-${name}.png`, clip: { x: Math.max(0, vw.width - 260), y: vw.height - 160, width: 260, height: 160 } });
  console.log(name, JSON.stringify(box));
  await ctx.close();
}
await browser.close();
