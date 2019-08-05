const knex = require('knex');
const knexConfig = require('../../knexfile');

const DBConnection = module.exports;

DBConnection.dbWrite = knex(knexConfig.dbWrite);
DBConnection.dbRead = knex(knexConfig.dbRead);
