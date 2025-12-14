const { test, expect } = require("@playwright/test");
const TextBoxPage = require("../src/pages/TextBoxPage");
const { faker } = require("@faker-js/faker");

test.describe.parallel("Text Box", () => {
  let pageObj;

  test.beforeEach(async ({ page }) => {
    pageObj = new TextBoxPage(page);
    await pageObj.open();
  });

  test("should submit text box with random data", async () => {
    const data = {
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      currentAddress: faker.location.streetAddress(),
      permanentAddress: faker.location.streetAddress(),
    };

    await pageObj.fillForm(data);
    await pageObj.submit();

    await expect(pageObj.outputName).toContainText(data.fullName);
    await expect(pageObj.outputEmail).toContainText(data.email);
  });

  test("should not accept invalid email", async () => {
    await pageObj.typeAndAssert(pageObj.fullName, faker.person.fullName());
    await pageObj.email.fill("invalid-email");
    await pageObj.submit();

    await expect(pageObj.email).toHaveClass(/field-error/);
    await expect(pageObj.outputEmail).toHaveCount(0);
  });

  test("should not submit empty mandatory fields", async () => {
    await pageObj.submit();

    await expect(pageObj.outputName).toHaveCount(0);
    await expect(pageObj.outputEmail).toHaveCount(0);
  });

  // Parameterized tests (Playwright-style, not Jest)
  const datasets = [
    { label: "valid email", valid: true },
    { label: "invalid email", valid: false },
  ];

  for (const dataset of datasets) {
    test(`parameterized submission with ${dataset.label}`, async () => {
      const data = {
        fullName: faker.person.fullName(),
        email: dataset.valid ? faker.internet.email() : "invalid-email",
        currentAddress: faker.location.streetAddress(),
        permanentAddress: faker.location.streetAddress(),
      };

      await pageObj.fillForm(data);
      await pageObj.submit();

      if (dataset.valid) {
        await expect(pageObj.outputEmail).toContainText(data.email);
      } else {
        await expect(pageObj.outputEmail).toHaveCount(0);
      }
    });
  }
});
