const { faker } = require("@faker-js/faker");

function createPracticeFormData() {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    gender: "Male",
    mobile: faker.string.numeric(10),
    subject: "Maths",
    hobby: "Sports",
    address: faker.location.streetAddress(),
  };
}

module.exports = { createPracticeFormData };
