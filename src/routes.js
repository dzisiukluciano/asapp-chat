const Router = require('express').Router();
const userController = require('./controllers/userController');
const messageController = require('./controllers/messageController');
const schemaValidator = require('./middlewares/schemaValidator');
const { checkJwt } = require('./middlewares/apiAuth');
const { schema: userSchema } = require('./schemas/userSchema');
const { postSchema: postMessageSchema, getSchema: getMessageSchema } = require('./schemas/messageSchema');

Router.get('/health', (req, res) => res.send());

Router.post('/users',
  schemaValidator.validateBody(userSchema),
  userController.createUser);

Router.post('/login',
  schemaValidator.validateBody(userSchema),
  userController.login);

Router.get('/messages',
  checkJwt,
  schemaValidator.validateQueryParams(getMessageSchema),
  messageController.getMessages);

Router.post('/messages',
  checkJwt,
  schemaValidator.validateBody(postMessageSchema),
  messageController.sendMessage);

module.exports = Router;
