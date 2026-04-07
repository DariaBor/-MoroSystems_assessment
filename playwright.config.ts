import { defineConfig, devices } from "@playwright/test";

process.env.API_URL ??= "http://localhost:8080";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [["html"], ["list"]],

  use: {
    baseURL: process.env.GUI_URL || "https://www.morosystems.cz",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    launchOptions: {
      args: ["--disable-blink-features=AutomationControlled"],
    },
  },
  // i defiend some possible projects (3 browsers and 3 viewports) here, but you can adjust this list to run only a subset of them if needed, ideally split all ui tests into separate files according to the target viewport (e.g. careers.ui.spec.ts, careers.mobile.spec.ts) and configure testMatch in each project to run only the relevant tests, usefule for CICD pipelines
  projects: [
    {
      name: "api",
      testMatch: /tests\/api\/.*\.spec\.ts/,
      workers: 1,
    },

    {
      name: "chromium-desktop",
      testMatch: /tests\/ui\/.*\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1920, height: 1080 },
        channel: "chrome",
      },
    },

    // BIG NOTE: We never automate Google search flows in E2E tests since Google is blocking automated traffic, so tests will wprk only in chromoium, trying to bypass google validation is a very bad practice and should be agreed with business
    {
      name: "firefox-desktop",
      testMatch: /tests\/ui\/.*\.spec\.ts/,
      use: {
        ...devices["Desktop Firefox"],
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: "safari-desktop",
      testMatch: /tests\/ui\/.*\.spec\.ts/,
      use: {
        ...devices["Desktop Safari"],
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: "chromium-ipad",
      testMatch: /tests\/ui\/.*\.spec\.ts/,
      use: {
        ...devices["iPad (gen 7)"],
        browserName: "chromium",
        channel: "chrome",
      },
    },
    {
      name: "firefox-ipad",
      testMatch: /tests\/ui\/.*\.spec\.ts/,
      use: {
        ...devices["iPad (gen 7)"],
        browserName: "firefox",
        launchOptions: {
          args: ["--disable-blink-features=AutomationControlled"],
          firefoxUserPrefs: { "dom.webdriver.enabled": false },
        },
      },
    },
    {
      name: "safari-ipad",
      testMatch: /tests\/ui\/.*\.spec\.ts/,
      use: {
        ...devices["iPad (gen 7)"],
        browserName: "webkit",
      },
    },
    {
      name: "chromium-mobile",
      testMatch: /tests\/ui\/.*\.spec\.ts/,
      use: {
        ...devices["iPhone 14"],
        browserName: "chromium",
        channel: "chrome",
      },
    },
    {
      name: "firefox-mobile",
      testMatch: /tests\/ui\/.*\.spec\.ts/,
      use: {
        ...devices["iPhone 14"],
        browserName: "firefox",
        launchOptions: {
          args: ["--disable-blink-features=AutomationControlled"],
          firefoxUserPrefs: { "dom.webdriver.enabled": false },
        },
      },
    },
    {
      name: "safari-mobile",
      testMatch: /tests\/ui\/.*\.spec\.ts/,
      use: {
        ...devices["iPhone 14"],
        browserName: "webkit",
      },
    },
  ],
});
