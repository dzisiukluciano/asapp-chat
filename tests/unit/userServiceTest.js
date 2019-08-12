const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const faker = require('faker');
require('../fixtures/envFixture').mockEnv();
const userService = require('../../src/services/userService');
const authManager = require('../../src/resources/authManager');
const userRepository = require('../../src/repositories/userRepository');
const { getDBRecord, getRequestBody } = require('../fixtures/userFixture');

chai.use(chaiAsPromised);

describe('UserService test', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('expects createUser success', async () => {
    const userRecord = getDBRecord();
    sinon.stub(authManager, 'registerUser').resolves(faker.random.objectElement());
    sinon.stub(userRepository, 'saveUser').resolves(userRecord);

    const result = await userService.createUser(getRequestBody());

    chai.expect(result).to.have.property('id');
    chai.expect(result.id).to.be.equals(userRecord.id);
  });

  it('expects login success', async () => {
    const userRecord = getDBRecord();
    const token = faker.random.words();
    sinon.stub(userRepository, 'findOneByUsername').resolves(userRecord);
    sinon.stub(authManager, 'login').resolves(token);

    const result = await userService.login(getRequestBody());

    chai.expect(result).to.have.property('id');
    chai.expect(result).to.have.property('token');
    chai.expect(result.token).to.be.equals(token);
  });

  it('expects login fails', async () => {
    sinon.stub(userRepository, 'findOneByUsername').resolves(undefined);

    await chai.expect(userService.login(getRequestBody())).to.be.rejectedWith(Error, /User not found/);
  });
});
