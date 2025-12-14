const BasePage = require("./BasePage");

class SelectMenuPage extends BasePage {
  constructor(page) {
    super(page);

    this.selectValueInput = page.locator("#react-select-2-input");
    this.selectOneInput = page.locator("#react-select-3-input");
    this.multiSelectInput = page.locator("#react-select-4-input");

    this.oldStyle = page.locator("#oldSelectMenu");

    this.multiSelectRoot = this.multiSelectInput.locator(
      "xpath=ancestor::div[contains(@class,'css-')][1]"
    );
    this.multiSelectedChips = this.multiSelectRoot.locator(
      '[class*="multiValue"]'
    );
  }

  async open() {
    await super.open("/select-menu");
  }
}

module.exports = SelectMenuPage;
