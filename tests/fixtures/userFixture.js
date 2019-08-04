const faker = require('faker');
const moment = require('moment');

const getDBRecord = id => ({
  id: id || faker.random.number(),
  username: faker.random.word(),
  email: faker.internet.email(),
  createdAt: moment.utc(faker.date.past()).format(),
  updatedAt: moment.utc(faker.date.past()).format(),
  identities: faker.random.objectElement(),
});

const getRequestBody = () => ({
  username: faker.random.word(),
  password: faker.random.word(),
});


module.exports = { getDBRecord, getRequestBody };
