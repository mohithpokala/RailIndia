const pool = require("./database");

const view_ticket = async(pnr) => {
    const query =
        `
            SELECT * from booking where booking_id = $1
        `;
    const res = await pool.query(query,[pnr]);
    return  res.rows;
}


module.exports = {view_ticket};