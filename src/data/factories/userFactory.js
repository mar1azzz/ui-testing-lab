const { faker } = require("@faker-js/faker");

function createUser() {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.string.numeric(10),
    address: faker.location.streetAddress(),
  };
}

module.exports = { createUser };
