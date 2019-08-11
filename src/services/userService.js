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
  const user = await userRepository.findOneByUsername(username.toLowerCase());
  if (!user) {
    throw Error('User not found');
  }
  const { id } = user;
  const token = await authManager.login(username, password);

  return { id, token };
};
