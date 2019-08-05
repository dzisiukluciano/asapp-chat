const Router = require('express').Router();
const UserController = require('./controllers/userController');
const schemaValidator = require('./middlewares/schemaValidator');
const { schema: userSchema } = require('./schemas/userSchema');

Router.get('/health', (req, res) => res.send());

Router.post('/users',
  schemaValidator.validateIncomingData(userSchema),
  UserController.createUser);

Router.post('/login',
  schemaValidator.validateIncomingData(userSchema),
  UserController.login);

module.exports = Router;
