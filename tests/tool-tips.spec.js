const { test, expect } = require("@playwright/test");
const ToolTipsPage = require("../src/pages/ToolTipsPage");

test.describe.parallel("Tool Tips", () => {
  let pageObj;

  test.beforeEach(async ({ page }) => {
    pageObj = new ToolTipsPage(page);
    await pageObj.open();
  });

  test("should show correct tooltips on hover", async () => {
    await pageObj.hoverSafe(pageObj.button);
    await pageObj.expectTooltipText("Button");

    await pageObj.hoverSafe(pageObj.input);
    await pageObj.expectTooltipText("text field");

    await pageObj.hoverSafe(pageObj.contraryLink);
    await pageObj.expectTooltipText("Contrary");

    await pageObj.hoverSafe(pageObj.sectionLink);
    await pageObj.expectTooltipText("1.10.32");
  });

  test("tooltip should disappear when mouse leaves element", async ({
    page,
  }) => {
    await pageObj.hoverSafe(pageObj.button);
    await pageObj.expectTooltipText("Button");

    await page.mouse.move(0, 0);
    await expect(page.locator(".tooltip-inner")).toHaveCount(0);
  });
});
