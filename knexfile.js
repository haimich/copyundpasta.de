require("dotenv").config();
const _ = require("lodash");

const defaultConfig = {
  client:      "mysql",
  connection: {
    database:  "haimich",
    user:      "haimich",
    password:  "haimich",
    host:      "localhost",
    port:      3306,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: "knex_migrations",
  },
  seeds: {
    // directory: "knex_seeds",
    directory: "knex_seeds/tsc-compiled/knex_seeds",
  },
};

let production = _.clone(defaultConfig);
production.connection = {
  database: process.env.DB_DATABASE,
  user:     process.env.DB_USER,
  password: process.env.DB_PW,
},

module.exports = {
  development: defaultConfig,
  test: defaultConfig,
  production,
};
