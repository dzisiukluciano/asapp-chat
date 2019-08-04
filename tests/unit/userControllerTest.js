const sinon = require('sinon');
const chai = require('chai');
const faker = require('faker');
require('../fixtures/envFixture').mockEnv();
const userController = require('../../src/controllers/userController');
const userService = require('../../src/services/userService');


describe('UserController test', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('expects createUser returns 201', async () => {
    let status;
    const statusFunction = (st) => {
      status = st;

      return ({ json: () => {} });
    };
    const res = { status: statusFunction };
    const req = { body: {} };
    sinon.stub(userService, 'createUser').resolves(faker.random.objectElement());

    await userController.createUser(req, res);

    chai.expect(status).to.be.equals(201);
  });

  it('expects createUser returns 404 not found', async () => {
    let status;
    const statusFunction = (st) => {
      status = st;

      return ({ json: () => {} });
    };
    const res = { status: statusFunction };
    const req = { body: {} };
    sinon.stub(userService, 'createUser').rejects(new Error('User not found'));

    await userController.createUser(req, res);

    chai.expect(status).to.be.equals(404);
  });

  it('expects login returns 200', async () => {
    let status;
    const statusFunction = (st) => {
      status = st;

      return ({ json: () => {} });
    };
    const res = { status: statusFunction };
    const req = { body: {} };
    sinon.stub(userService, 'login').resolves(faker.random.objectElement());

    await userController.login(req, res);

    chai.expect(status).to.be.equals(200);
  });

  it('expects login returns 404 not found', async () => {
    let status;
    const statusFunction = (st) => {
      status = st;

      return ({ json: () => {} });
    };
    const res = { status: statusFunction };
    const req = { body: {} };
    sinon.stub(userService, 'login').rejects(new Error('User not found'));

    await userController.login(req, res);

    chai.expect(status).to.be.equals(404);
  });
});
