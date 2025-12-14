const BasePage = require("./BasePage");

class TextBoxPage extends BasePage {
  constructor(page) {
    super(page);

    this.fullName = page.locator("#userName");
    this.email = page.locator("#userEmail");
    this.currentAddress = page.locator("#currentAddress");
    this.permanentAddress = page.locator("#permanentAddress");
    this.submitButton = page.locator("#submit");

    // Output
    this.output = page.locator("#output");
    this.outputName = page.locator("#name");
    this.outputEmail = page.locator("#email");
  }

  async open() {
    await super.open("/text-box");
  }

  async fillForm(data) {
    await this.typeAndAssert(this.fullName, data.fullName);
    await this.typeAndAssert(this.email, data.email);
    await this.typeAndAssert(this.currentAddress, data.currentAddress);
    await this.typeAndAssert(this.permanentAddress, data.permanentAddress);
  }

  async submit() {
    await this.submitButton.scrollIntoViewIfNeeded();
    await this.submitButton.click();
  }
}

module.exports = TextBoxPage;
