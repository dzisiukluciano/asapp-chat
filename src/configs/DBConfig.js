const pg = require('pg');

const DBConfig = module.exports;

const environment = process.env;

DBConfig.CONNECTION = environment.PG_CONNECTION;
DBConfig.TIMEOUT = parseInt(environment.DB_TIMEOUT || 200, 10);
DBConfig.READ_CONNECTION_POOL_SIZE = parseInt(environment.READ_CONNECTION_POOL_SIZE || 10, 10);
DBConfig.WRITE_CONNECTION_POOL_SIZE = parseInt(environment.WRITE_CONNECTION_POOL_SIZE || 20, 10);
DBConfig.DEBUG = environment.DB_DEBUG === 'true';
DBConfig.MIGRATIONS_TABLE = 'asapp_knex_migrations';

DBConfig.USER_TABLE = 'user';

pg.types.setTypeParser(20, 'text', parseInt);
pg.types.setTypeParser(1700, 'text', parseFloat);
