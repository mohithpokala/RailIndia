
const pool = require("./database");

const get_user = async(user_name,password) => {
    const query =
        `
            SELECT is_admin FROM users WHERE name = $user_name AND password = $password;       
        `;
    const res = await pool.query(query,[user_name,password]);
    return  res.rows;
}

module.exports = { get_user };