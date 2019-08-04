const _ = require('lodash');
const { dbWrite, dbRead } = require('../utils/DB');
const { USER_TABLE } = require('../configs/DBConfig');
const serializeData = require('../utils/serializeData');
const cache = require('../utils/cache');

const UserRepository = module.exports;

UserRepository.saveUser = async (userData) => {
  const [identitiesObject] = userData.identities;
  const { username } = userData;
  const data = _.pick(
    { ...userData, identities: identitiesObject, username: username.toLowerCase() },
    ['username', 'email', 'created_at', 'updated_at', 'identities'],
  );
  const serializedData = serializeData.toPostgres(data);

  const [result] = await dbWrite.insert(serializedData).into(USER_TABLE).returning(['id', 'username']);

  return result;
};

UserRepository.findOneByUsername = async (username) => {
  const resolver = () => dbRead.select('*').from(USER_TABLE).where({ username }).first();

  return cache.remember(`user-username:${username}`, resolver, 3600 * 24);
};

UserRepository.findOneById = async (id) => {
  const resolver = () => dbRead.select('*').from(USER_TABLE).where({ id }).first();

  return cache.remember(`user-id:${id}`, resolver, 3600 * 24);
};
