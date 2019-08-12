const chai = require('chai');
const faker = require('faker');
const _ = require('lodash');
const serializeData = require('../../src/utils/serializeData');

chai.should();

describe('Parse Data', () => {
  it('Object keys from DB must be in snake_case', () => {
    const obj = {
      [_.camelCase(faker.random.words())]: faker.random.word(),
      [_.camelCase(faker.random.words())]: faker.random.word(),
      [_.camelCase(faker.random.words())]: faker.random.word(),
    };

    const newObj = serializeData.toPostgres(obj);

    Object.keys(newObj).forEach((key, idx) => {
      key.should.be.equal(_.snakeCase(Object.keys(obj)[idx]));
    });
  });

  it('Object keys must be in camelCase', () => {
    const obj = {
      [_.snakeCase(faker.random.words())]: faker.random.word(),
      [_.snakeCase(faker.random.words())]: faker.random.word(),
      [_.snakeCase(faker.random.words())]: faker.random.word(),
    };

    const newObj = serializeData.fromPostgres(obj);

    Object.keys(newObj).forEach((key, idx) => {
      key.should.be.equal(_.camelCase(Object.keys(obj)[idx]));
    });
  });

  it('Object keys must be in camelCase in a list of Objects with 1 item', () => {
    const list = [
      {
        [_.snakeCase(faker.random.words())]: faker.random.word(),
        [_.snakeCase(faker.random.words())]: faker.random.word(),
        [_.snakeCase(faker.random.words())]: faker.random.word(),
      },
    ];

    const listParsed = serializeData.fromPostgres(list);

    listParsed.forEach((newObj, idx) => {
      const obj = list[idx];
      Object.keys(newObj).forEach((key, index) => {
        key.should.be.equal(_.camelCase(Object.keys(obj)[index]));
      });
    });
  });

  it('Object keys must be in camelCase in a list of Objects with more than 1 item', () => {
    const list = [
      {
        [_.snakeCase(faker.random.words())]: faker.random.word(),
        [_.snakeCase(faker.random.words())]: faker.random.word(),
        [_.snakeCase(faker.random.words())]: faker.random.word(),
      },
      {
        [_.snakeCase(faker.random.words())]: faker.random.word(),
        [_.snakeCase(faker.random.words())]: faker.random.word(),
        [_.snakeCase(faker.random.words())]: faker.random.word(),
      },
    ];

    const listParsed = serializeData.fromPostgres(list);

    listParsed.forEach((newObj, idx) => {
      const obj = list[idx];
      Object.keys(newObj).forEach((key, index) => {
        key.should.be.equal(_.camelCase(Object.keys(obj)[index]));
      });
    });
  });
});
