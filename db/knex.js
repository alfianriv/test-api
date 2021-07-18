const db = require('knex')({
    client: 'pg',
    connection: process.env.PG_CONNECTION,
    searchPath: ['knex', 'public'],
})

module.exports = db