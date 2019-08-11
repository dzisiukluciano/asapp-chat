const assert = require('assert');
const serializeData = require('./src/utils/serializeData');

const DBConfig = require('./src/configs/DBConfig');

assert(DBConfig.CONNECTION);

const defaultDBConfig = {
  client: 'pg',
  connection: DBConfig.CONNECTION,
  migrations: {
    tableName: DBConfig.MIGRATIONS_TABLE,
  },
  postProcessResponse: result => serializeData.fromPostgres(result),
  wrapIdentifier: (value, origImpl) => origImpl(serializeData.toSnakeCase(value)),
  debug: DBConfig.DEBUG,
};

module.exports = {
  dbRead: {
    ...defaultDBConfig,
    pool: {
      min: 1,
      max: DBConfig.READ_CONNECTION_POOL_SIZE,
      afterCreate: (connection, callback) => {
        connection.query('SET TIME ZONE UTC;', (err) => {
          callback(err, connection);
        });
      },
    },
  },
  dbWrite: {
    ...defaultDBConfig,
    pool: {
      min: 3,
      max: DBConfig.WRITE_CONNECTION_POOL_SIZE,
      propagateCreateError: false,
      afterCreate: (connection, callback) => {
        connection.query('SET TIME ZONE UTC;', (err) => {
          callback(err, connection);
        });
      },
    },
  },
};
