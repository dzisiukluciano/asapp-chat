const faker = require('faker');
const moment = require('moment');

const getDBRecord = id => ({
  id: id || faker.random.number(),
  sender: faker.random.number(),
  recipient: faker.random.number(),
  createdAt: moment.utc(faker.date.past()).format(),
  ...faker.random.arrayElement([
    {
      type: 'text',
      content: { text: faker.random.words() },
    },
    {
      type: 'image',
      content: {
        url: faker.image.imageUrl(),
        width: faker.random.number(),
        height: faker.random.number(),
      },
    },
    {
      type: 'video',
      content: {
        url: faker.image.imageUrl(),
        source: faker.random.arrayElement(['vimeo', 'youtube']),
      },
    },
  ]),
});

const getRequestBody = () => ({
  sender: faker.random.number(),
  recipient: faker.random.number(),
  ...faker.random.arrayElement([
    {
      content: { type: 'text', text: faker.random.words() },
    },
    {
      content: {
        type: 'image',
        url: faker.image.imageUrl(),
        width: faker.random.number(),
        height: faker.random.number(),
      },
    },
    {
      content: {
        type: 'video',
        url: faker.image.imageUrl(),
        source: faker.random.arrayElement(['vimeo', 'youtube']),
      },
    },
  ]),
});


module.exports = { getDBRecord, getRequestBody };
