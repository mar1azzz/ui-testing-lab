const { test, expect } = require("@playwright/test");
const PracticeFormPage = require("../src/pages/PracticeFormPage");
const { createPracticeFormData } = require("../src/data/factories/formFactory");

test.describe("Practice Form", () => {
  let formPage;

  test.beforeEach(async ({ page }) => {
    formPage = new PracticeFormPage(page);
    await formPage.open();
  });

  test("should submit form with valid data", async ({ page }) => {
    const data = createPracticeFormData();

    await formPage.fillForm(data);
    await formPage.submit();

    await expect(formPage.modal).toBeVisible();

    await formPage.expectModalTable({
      "Student Name": `${data.firstName} ${data.lastName}`,
      "Student Email": data.email,
      Gender: data.gender,
      Mobile: data.mobile,
      Address: data.address,
    });
  });

  test("should not submit form with empty required fields", async () => {
    await formPage.submit();

    await expect(formPage.modal).not.toBeVisible();
  });
});
