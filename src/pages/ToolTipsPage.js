const BasePage = require("./BasePage");

class ToolTipsPage extends BasePage {
  constructor(page) {
    super(page);

    this.button = page.locator("#toolTipButton");
    this.input = page.locator("#toolTipTextField");
    this.contraryLink = page.locator("a", { hasText: "Contrary" });
    this.sectionLink = page.locator("a", { hasText: "1.10.32" });
  }

  async open() {
    await super.open("/tool-tips");
  }
}

module.exports = ToolTipsPage;
