'use strict';

const knex = require('knex'),
  Environment = require('../environment');

module.exports.NAME = 'pgClient';
module.exports.build = function() {
  return knex(({
    client: 'pg',
    connection: Environment.POSTGRES_CONFIG
  }));
};
