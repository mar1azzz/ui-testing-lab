const { expect } = require("@playwright/test");

class BasePage {
  constructor(page) {
    this.page = page;
    this.page.setDefaultTimeout(20000);
  }

  async open(path) {
    await this.page.goto(path, { waitUntil: "load" });
    await this.page.waitForTimeout(300);
    await this.removeOverlays();
  }

  async removeOverlays() {
    await this.page
      .addStyleTag({
        content: `
          #fixedban, iframe, .fc-consent-root {
            display: none !important;
          }
        `,
      })
      .catch(() => {});
  }

  async typeAndAssert(locator, value) {
    await locator.fill(value);
    await expect(locator).toHaveValue(value);
  }

  async clickSafe(locator) {
    await locator.click({ force: true });
  }

  async hoverSafe(locator) {
    await locator.hover();
  }

  async selectReactOptionByInput(inputLocator, optionText) {
    await inputLocator.click({ force: true });
    await inputLocator.fill(optionText);

    const option = this.page
      .locator(".css-26l3qy-menu div", { hasText: optionText })
      .first();

    await expect(option).toBeVisible({ timeout: 8000 });
    await option.click();

    await this.page.waitForTimeout(100);
  }

  async expectTooltipText(expectedText) {
    const tooltip = this.page.locator(".tooltip-inner");

    await expect
      .poll(async () => await tooltip.count(), { timeout: 5000 })
      .toBeGreaterThan(0);

    await expect(tooltip.first()).toContainText(expectedText);
  }

  async expectModalTable(expected) {
    for (const [key, value] of Object.entries(expected)) {
      const row = this.page.locator("tr", {
        has: this.page.locator("td", { hasText: key }),
      });
      await expect(row).toContainText(value);
    }
  }
}

module.exports = BasePage;
