const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "Watermelon 1",  host: "localhost",
  port: 5432,
  database: "Project"
});

module.exports = pool;