
const pool = require("./database");

const user_booking = async(user_id) => {
    const query =
        `
            from booking select booking_id where user_id = $1
        `;
    const res = await pool.query(query, [user_id]);
    return  res.rows;
}


module.exports = { user_booking };