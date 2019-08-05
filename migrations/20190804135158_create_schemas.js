const { USER_TABLE } = require('../src/configs/DBConfig');

exports.up = knex => Promise.all([
  knex.schema.createTable(USER_TABLE, (table) => {
    table.increments('id').primary();
    table.string('username', 50).notNullable();
    table.string('email', 255).notNullable();
    table.timestamp('created_at', true).defaultTo(knex.fn.now());
    table.timestamp('updated_at', true).defaultTo(knex.fn.now());
    table.jsonb('identities');
  }),
  knex.schema.alterTable(USER_TABLE, (table) => {
    table.index('username');
  }),
]);

exports.down = knex => Promise.all([
  knex.schema.dropTable(USER_TABLE),
]);
