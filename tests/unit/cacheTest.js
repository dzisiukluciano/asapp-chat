const _ = require('lodash');
const sinon = require('sinon');
const chai = require('chai');
const faker = require('faker');
const cache = require('../../src/utils/cache');


describe('Cache test', () => {
  let keyMap;
  before(() => {
    sinon.stub(cache, 'set').callsFake((key, value) => {
      keyMap[key] = _.isObject(value) ? JSON.stringify(value) : value;
    });
    sinon.stub(cache, 'get').callsFake(key => keyMap[key]);
  });

  beforeEach(() => {
    keyMap = {};
  });

  after(() => {
    sinon.restore();
  });

  it('Expects remember cache hit', async () => {
    const randomKey = faker.random.word();
    const randomObject = { [faker.random.word()]: faker.random.words() };
    let called = false;
    const resolver = () => {
      called = true;

      return randomObject;
    };

    cache.set(randomKey, randomObject);

    const result = await cache.remember(randomKey, resolver);

    chai.expect(called).to.be.equal(false);
    chai.expect(result).to.deep.equals(randomObject);
  });

  it('Expects remember calls resolver', async () => {
    const randomKey = faker.random.word();
    const randomObject = { [faker.random.word()]: faker.random.words() };
    let called = false;
    const resolver = () => {
      called = true;

      return randomObject;
    };

    const result = await cache.remember(randomKey, resolver);

    chai.expect(called).to.be.equal(true);
    chai.expect(result).to.deep.equals(randomObject);
  });
});
