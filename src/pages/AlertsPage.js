const BasePage = require("./BasePage");

class AlertsPage extends BasePage {
  constructor(page) {
    super(page);

    this.alertButton = page.locator("#alertButton");
    this.timerAlertButton = page.locator("#timerAlertButton");
    this.confirmButton = page.locator("#confirmButton");
    this.promptButton = page.locator("#promtButton");

    this.confirmResult = page.locator("#confirmResult");
    this.promptResult = page.locator("#promptResult");
  }

  async open() {
    await super.open("/alerts");
  }

  async clickAlert() {
    await this.clickSafe(this.alertButton);
  }

  async clickTimerAlert() {
    await this.clickSafe(this.timerAlertButton);
  }

  async clickConfirm() {
    await this.clickSafe(this.confirmButton);
  }

  async clickPrompt() {
    await this.clickSafe(this.promptButton);
  }
}

module.exports = AlertsPage;
