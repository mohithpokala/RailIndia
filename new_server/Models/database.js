const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "Mohith@2002",  host: "localhost",
  port: 5432,
  database: "Railway"
});

module.exports = pool;