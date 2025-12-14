const { test, expect } = require("@playwright/test");
const SelectMenuPage = require("../src/pages/SelectMenuPage");
const { SELECT_MENU } = require("../src/data/constants");

test.describe("Select Menu", () => {
  let pageObj;

  test.beforeEach(async ({ page }) => {
    pageObj = new SelectMenuPage(page);
    await pageObj.open();
  });

  test("should select all dropdown values", async () => {
    await pageObj.selectReactOptionByInput(
      pageObj.selectValueInput,
      SELECT_MENU.SELECT_VALUE
    );

    await pageObj.selectReactOptionByInput(
      pageObj.selectOneInput,
      SELECT_MENU.SELECT_ONE
    );

    await pageObj.oldStyle.selectOption({ label: SELECT_MENU.OLD_STYLE });
    const selected = pageObj.oldStyle.locator("option:checked");
    await expect(selected).toHaveText("Green");

    await pageObj.selectReactOptionByInput(pageObj.multiSelectInput, "Black");
    await pageObj.selectReactOptionByInput(pageObj.multiSelectInput, "Blue");

    const chips = pageObj.page.locator(".css-12jo7m5");
    await expect(chips).toContainText(["Black", "Blue"]);
  });

  test("should clear multi select values", async () => {
    await pageObj.selectReactOptionByInput(pageObj.multiSelectInput, "Black");
    await pageObj.selectReactOptionByInput(pageObj.multiSelectInput, "Blue");

    const chips = pageObj.page.locator(".css-12jo7m5");
    await expect(chips).toHaveCount(2);

    // clear by backspace
    await pageObj.multiSelectInput.click({ force: true });
    await pageObj.page.keyboard.press("Backspace");
    await pageObj.page.keyboard.press("Backspace");

    await expect(chips).toHaveCount(0);
  });
});
