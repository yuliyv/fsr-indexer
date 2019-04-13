'use strict';

module.exports = {
  SWIFTYPE_HOST: process.env.SWIFTYPE_HOST,
  SWIFTYPE_KEY: process.env.SWIFTYPE_KEY,
  POSTGRES_CONFIG: {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_NAME,
    user: process.env.PG_USER,
    password: process.env.PG_PASS
  }
};
