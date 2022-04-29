const pool = require("./database");

const view_bookings = async(user_id) => {
    const query =
        `
            SELECT * from booking where user_id = $1
        `;

    const res = await pool.query(query,[user_id]);
    // console.log(res.rows);
    // console.log(user_id);
    return  res.rows;
}


module.exports = {view_bookings};