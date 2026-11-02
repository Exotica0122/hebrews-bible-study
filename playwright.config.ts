import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PORT ?? 3000);
const PROD = Boolean(process.env.E2E_PROD);

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  // Each worker renders WebGL in software; more than this delays hydration enough to flake the intro and canvas tests.
  workers: 4,
  // A rare timing miss under software WebGL shows as flaky rather than failing the run.
  retries: 1,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  reporter: "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    storageState: {
      cookies: [
        {
          name: "hb-intro",
          value: "1",
          domain: "localhost",
          path: "/",
          expires: -1,
          httpOnly: false,
          secure: false,
          sameSite: "Lax",
        },
      ],
      origins: [],
    },
    trace: "retain-on-failure",
    launchOptions: {
      args: [
        "--use-angle=swiftshader",
        "--enable-unsafe-swiftshader",
        "--ignore-gpu-blocklist",
      ],
    },
  },
  projects: [
    {
      name: "desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: "mobile",
      use: { ...devices["Pixel 7"], viewport: { width: 390, height: 844 } },
    },
  ],
  webServer: {
    command: PROD
      ? `pnpm build && pnpm start -p ${PORT}`
      : `pnpm dev -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: true,
    timeout: PROD ? 300_000 : 60_000,
  },
});
