const chai = require('chai');
const faker = require('faker');
const Joi = require('joi');
const { schema: userSchema } = require('../../src/schemas/userSchema');
const { postSchema: postMessageSchema } = require('../../src/schemas/messageSchema');
const { getRequestBody: getMessageRequestBody } = require('../fixtures/messageFixture');
const { getRequestBody: getUserRequestBody } = require('../fixtures/userFixture');


describe('SchemaValidator', () => {
  it('post message validations success', async () => {
    const message = getMessageRequestBody();

    const validation = Joi.validate(message, postMessageSchema);

    chai.expect(validation.error).to.be.equal(null);
  });

  it('post user validations success', async () => {
    const user = getUserRequestBody();

    const validation = Joi.validate(user, userSchema);

    chai.expect(validation.error).to.be.equal(null);
  });

  it('post message validations fails random type', async () => {
    const message = {
      ...getMessageRequestBody(),
      content: {
        type: 'invalid',
        text: faker.random.words(),
      },
    };

    const validation = Joi.validate(message, postMessageSchema);

    chai.expect(validation.error).to.not.be.equal(null);
  });

  it('post message validations fails random fields', async () => {
    const message = {
      ...getMessageRequestBody(),
      content: {
        type: 'text',
        [faker.random.word()]: faker.random.words(),
      },
    };

    const validation = Joi.validate(message, postMessageSchema);

    chai.expect(validation.error).to.not.be.equal(null);
  });

  it('post message validations fails required fields', async () => {
    const message = {
      ...getMessageRequestBody(),
      content: {
        type: 'text',
      },
    };

    const validation = Joi.validate(message, postMessageSchema);

    chai.expect(validation.error).to.not.be.equal(null);
  });
});
