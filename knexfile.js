const assert = require('assert');
const serializeData = require('./src/utils/serializeData');

const DBConfig = require('./src/configs/DBConfig');

assert(DBConfig.CONNECTION);

module.exports = {
  dbRead: {
    client: 'pg',
    connection: DBConfig.CONNECTION,
    pool: {
      min: 1,
      max: DBConfig.READ_CONNECTION_POOL_SIZE,
    },
    migrations: {
      tableName: DBConfig.MIGRATIONS_TABLE,
    },
    debug: DBConfig.DEBUG,
  },
  dbWrite: {
    client: 'pg',
    connection: DBConfig.CONNECTION,
    pool: {
      min: 3,
      max: DBConfig.WRITE_CONNECTION_POOL_SIZE,
      propagateCreateError: false,
    },
    migrations: {
      tableName: DBConfig.MIGRATIONS_TABLE,
    },
    seeds: {
      directory: './seeds',
    },
    postProcessResponse: result => serializeData.fromPostgres(result),
    wrapIdentifier: (value, origImpl) => origImpl(serializeData.toSnakeCase(value)),
    debug: DBConfig.DEBUG,
  },
};
