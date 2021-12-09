const configdb = require('./index')

const knex = require('knex')({
    client: 'mysql',
    connection: {
        ...configdb
    },
    pool: {min:0, max:10},
});

knex.schema.hasTable('products').then(function (exists) {
    if (!exists) {
      return knex.schema.createTable('products', (table) => {
        table.increments(); // Me va aumentando el id 
        table.text('title', 128).notNullable();
        table.string('description', 1000).notNullable();
        table.string('thumbnail', 1000).notNullable();
      });
    }
});

module.exports = knex;
