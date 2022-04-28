const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "pandu@123",  host: "localhost",
  port: 5432,
  database: "railindia"
});

module.exports = pool;