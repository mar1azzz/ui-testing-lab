const { defineConfig } = require("@playwright/test");

const width = Number(process.env.VIEWPORT_WIDTH) || 1920;
const height = Number(process.env.VIEWPORT_HEIGHT) || 1080;

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 30 * 1000,

  reporter: [
    ["html", { open: "never" }],
    ["junit", { outputFile: "reports/junit.xml" }],
  ],

  use: {
    baseURL: "https://demoqa.com",
    viewport: { width, height },
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },

  projects: [
    { name: "chromium", use: { browserName: "chromium" } },
    { name: "firefox", use: { browserName: "firefox" } },
  ],
});
