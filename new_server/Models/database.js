const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
<<<<<<< HEAD
  password: "Mohith@2002",  host: "localhost",
  port: 5432,
  database: "Railway"
=======
  password: "Watermelon 1",  host: "localhost",
  port: 5432,
  database: "Database2"
>>>>>>> 92caa5d215de3de0b79397697949074a4e9d587f
});

module.exports = pool;