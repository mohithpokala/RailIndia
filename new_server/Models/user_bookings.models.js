
const pool = require("./database");

const user_booking = async(user_id) => {
    // console.log("Here", user_id);
    const query =
        `
           select booking_id from booking where user_id = $1
        `;
    const res = await pool.query(query, [user_id]);
    // console.log(res.rows);
    return  res.rows;
}


module.exports = { user_booking };
