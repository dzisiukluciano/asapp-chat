const sinon = require('sinon');
const faker = require('faker');
const SimpleCrypto = require('simple-crypto-js').default;
const appConfig = require('../../src/configs/appConfig');

module.exports.mockEnv = () => {
  const sandbox = sinon.createSandbox();
  const authSecKey = faker.random.word();
  const crypto = new SimpleCrypto(authSecKey);
  sandbox.stub(appConfig, 'AUTH_SEC_KEY').value(authSecKey);
  sandbox.stub(appConfig, 'AUTH_SECRET').value(crypto.encrypt(faker.random.words()));
};
