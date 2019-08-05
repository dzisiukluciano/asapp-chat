const _ = require('lodash');
const { dbWrite, dbRead } = require('../utils/DB');
const { USER_TABLE } = require('../configs/DBConfig');
const serializeData = require('../utils/serializeData');

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

UserRepository.findByUsername = async username => dbRead.select('*').from(USER_TABLE).where({ username }).first();
