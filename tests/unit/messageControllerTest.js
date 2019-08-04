const sinon = require('sinon');
const chai = require('chai');
const faker = require('faker');
const messageController = require('../../src/controllers/messageController');
const messageService = require('../../src/services/messageService');


describe('MessageController test', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('expects sendMessage returns 201', async () => {
    let status;
    const statusFunction = (st) => {
      status = st;

      return ({ json: () => {} });
    };
    const res = { status: statusFunction };
    const req = { body: {} };
    sinon.stub(messageService, 'sendMessage').resolves(faker.random.objectElement());

    await messageController.sendMessage(req, res);

    chai.expect(status).to.be.equals(201);
  });

  it('expects sendMessage returns 404 not found', async () => {
    let status;
    const statusFunction = (st) => {
      status = st;

      return ({ json: () => {} });
    };
    const res = { status: statusFunction };
    const req = { body: {} };
    sinon.stub(messageService, 'sendMessage').rejects(new Error('User not found'));

    await messageController.sendMessage(req, res);

    chai.expect(status).to.be.equals(404);
  });

  it('expects getMessages returns 200', async () => {
    let status;
    const statusFunction = (st) => {
      status = st;

      return ({ json: () => {} });
    };
    const res = { status: statusFunction };
    const req = { query: {} };
    sinon.stub(messageService, 'getMessages').resolves(faker.random.arrayElement());

    await messageController.getMessages(req, res);

    chai.expect(status).to.be.equals(200);
  });

  it('expects getMessages returns 404 not found', async () => {
    let status;
    const statusFunction = (st) => {
      status = st;

      return ({ json: () => {} });
    };
    const res = { status: statusFunction };
    const req = { body: {} };
    sinon.stub(messageService, 'getMessages').rejects(new Error('Recipient not found'));

    await messageController.getMessages(req, res);

    chai.expect(status).to.be.equals(404);
  });
});
