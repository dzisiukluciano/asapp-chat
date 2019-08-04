const { USER_TABLE, MESSAGE_TABLE } = require('../src/configs/DBConfig');

exports.up = knex => Promise.all([
  knex.schema.createTable(USER_TABLE, (table) => {
    table.increments('id').primary();
    table.string('username', 50).notNullable();
    table.string('email', 255).notNullable();
    table.timestamp('created_at', true).defaultTo(knex.fn.now());
    table.timestamp('updated_at', true).defaultTo(knex.fn.now());
    table.jsonb('identities');
    table.index('username');
  }),
  knex.schema.createTable(MESSAGE_TABLE, (table) => {
    table.increments('id').primary();
    table.integer('sender').unsigned().notNullable().references(`${USER_TABLE}.id`);
    table.integer('recipient').unsigned().notNullable().references(`${USER_TABLE}.id`);
    table.string('type', 50).notNullable();
    table.jsonb('content').notNullable();
    table.timestamp('created_at', true).defaultTo(knex.fn.now());
    table.index('recipient');
  }),
]);

exports.down = knex => Promise.all([
  knex.schema.dropTable(USER_TABLE),
]);
