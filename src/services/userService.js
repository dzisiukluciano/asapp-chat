const logger = require('../utils/logger').getLogger('UserService');
const authManager = require('../resources/authManager');
const userRepository = require('../repositories/userRepository');

const UserService = module.exports;

UserService.createUser = async (body) => {
  const registeredUser = await authManager.registerUser(body);
  logger.debug(`User ${body.username} registered: ${JSON.stringify(registeredUser)}`);
  const { id } = await userRepository.saveUser(registeredUser);

  return { id };
};

UserService.login = async (body) => {
  const { username, password } = body;
  const { id } = await userRepository.findByUsername(username.toLowerCase());
  let token;

  return { id, token };
};
