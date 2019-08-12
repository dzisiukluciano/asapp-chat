const sinon = require('sinon');
const chai = require('chai');
const faker = require('faker');
const chaiAsPromised = require('chai-as-promised');
require('../fixtures/envFixture').mockEnv();
const messageService = require('../../src/services/messageService');
const userRepository = require('../../src/repositories/userRepository');
const messageRepository = require('../../src/repositories/messageRepository');
const cache = require('../../src/utils/cache');
const { getDBRecord, getRequestBody } = require('../fixtures/messageFixture');
const { getDBRecord: getUserDBRecord } = require('../fixtures/userFixture');

chai.use(chaiAsPromised);

describe('MessageService test', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('expects sendMessage success', async () => {
    const requestBody = getRequestBody();
    const users = {
      [requestBody.sender]: getUserDBRecord(),
      [requestBody.recipient]: getUserDBRecord(),
    };
    sinon.stub(userRepository, 'findOneById').callsFake(id => users[id]);
    sinon.stub(messageRepository, 'saveMessage').resolves(getDBRecord());
    sinon.stub(cache, 'invalidateKeys').resolves({});

    const result = await messageService.sendMessage(requestBody);
    chai.expect(result).to.have.property('id');
    chai.expect(result).to.have.property('timestamp');
  });

  it('expects sendMessage fails sender not found', async () => {
    const requestBody = getRequestBody();
    const users = {
      [requestBody.sender]: undefined,
      [requestBody.recipient]: getUserDBRecord(),
    };
    sinon.stub(userRepository, 'findOneById').callsFake(id => users[id]);

    await chai.expect(messageService.sendMessage(requestBody)).to.be.rejectedWith(Error, /Sender not found/);
  });

  it('expects sendMessage fails recipient not found', async () => {
    const requestBody = getRequestBody();
    const users = {
      [requestBody.sender]: getUserDBRecord(),
      [requestBody.recipient]: undefined,
    };
    sinon.stub(userRepository, 'findOneById').callsFake(id => users[id]);

    await chai.expect(messageService.sendMessage(requestBody)).to.be.rejectedWith(Error, /Recipient not found/);
  });

  it('expects fetchMessages success', async () => {
    const params = { recipient: faker.random.number(), start: faker.random.number() };
    const resultQty = faker.random.number({ min: 1, max: 100 });
    const dbRecords = [...Array(resultQty).keys()].map(() => getDBRecord());
    sinon.stub(userRepository, 'findOneById').resolves(getUserDBRecord());
    sinon.stub(messageRepository, 'findMessages').resolves(dbRecords);
    sinon.stub(cache, 'get').resolves(undefined);
    sinon.stub(cache, 'set').resolves({});

    const result = await messageService.getMessages(params);
    chai.expect(Array.isArray(result)).to.be.equal(true);
    chai.expect(result.length).to.be.equal(resultQty);
  });

  it('expects fetchMessages fails recipient not found', async () => {
    const params = { recipient: faker.random.number(), start: faker.random.number() };
    sinon.stub(userRepository, 'findOneById').resolves(undefined);

    await chai.expect(messageService.getMessages(params)).to.be.rejectedWith(Error, /Recipient not found/);
  });
});
