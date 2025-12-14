const { test, expect } = require("@playwright/test");
const AlertsPage = require("../src/pages/AlertsPage");

test.describe("Alerts page", () => {
  let alertsPage;

  test.beforeEach(async ({ page }) => {
    alertsPage = new AlertsPage(page);
    await alertsPage.open();
  });

  test("simple alert should be shown and accepted", async ({ page }) => {
    page.once("dialog", async (dialog) => {
      expect(dialog.message()).toBe("You clicked a button");
      await dialog.accept();
    });

    await alertsPage.alertButton.click();
  });

  test("timer alert should appear after delay", async ({ page }) => {
    page.once("dialog", async (dialog) => {
      expect(dialog.message()).toBe("This alert appeared after 5 seconds");
      await dialog.accept();
    });

    await alertsPage.timerAlertButton.click();
  });

  test("confirm alert OK and Cancel", async ({ page }) => {
    // OK
    page.once("dialog", async (dialog) => {
      expect(dialog.type()).toBe("confirm");
      await dialog.accept();
    });

    await alertsPage.confirmButton.click();
    await expect(alertsPage.confirmResult).toContainText("Ok");

    // Cancel
    page.once("dialog", async (dialog) => {
      expect(dialog.type()).toBe("confirm");
      await dialog.dismiss();
    });

    await alertsPage.confirmButton.click();
    await expect(alertsPage.confirmResult).toContainText("Cancel");
  });

  test("prompt alert input and cancel", async ({ page }) => {
    const inputText = "Playwright";

    // Accept
    page.once("dialog", async (dialog) => {
      expect(dialog.type()).toBe("prompt");
      await dialog.accept(inputText);
    });

    await alertsPage.promptButton.click();
    await expect(alertsPage.promptResult).toContainText(inputText);

    // Cancel
    page.once("dialog", async (dialog) => {
      expect(dialog.type()).toBe("prompt");
      await dialog.dismiss();
    });

    await alertsPage.promptButton.click();
    await expect(alertsPage.promptResult).toHaveCount(0);
  });
});
