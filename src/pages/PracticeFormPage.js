const BasePage = require("./BasePage");

class PracticeFormPage extends BasePage {
  constructor(page) {
    super(page);

    this.firstName = page.locator("#firstName");
    this.lastName = page.locator("#lastName");
    this.email = page.locator("#userEmail");
    this.genderMale = page.locator('label[for="gender-radio-1"]');
    this.mobile = page.locator("#userNumber");
    this.subjectInput = page.locator("#subjectsInput");
    this.hobbySports = page.locator('label[for="hobbies-checkbox-1"]');
    this.address = page.locator("#currentAddress");

    this.submitButton = page.locator("#submit");
    this.modal = page.locator(".modal-content");
  }

  async open() {
    await super.open("/automation-practice-form");
  }

  async fillForm(data) {
    await this.typeAndAssert(this.firstName, data.firstName);
    await this.typeAndAssert(this.lastName, data.lastName);
    await this.typeAndAssert(this.email, data.email);

    await this.genderMale.click({ force: true });
    await this.typeAndAssert(this.mobile, data.mobile);

    await this.subjectInput.fill(data.subject);
    await this.page.keyboard.press("Enter");

    await this.hobbySports.click({ force: true });
    await this.typeAndAssert(this.address, data.address);
  }

  async submit() {
    await this.submitButton.click({ force: true });
  }
}

module.exports = PracticeFormPage;
