const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
<<<<<<< HEAD
  password: "Mohith@2002",  host: "localhost",
  port: 5432,
  database: "Railway"
=======
  password: "pandu@123",  host: "localhost",
  port: 5432,
  database: "railindia"
>>>>>>> 9b13cef6b3a24b645204cb0d1a324ac7a06394c7
});

module.exports = pool;