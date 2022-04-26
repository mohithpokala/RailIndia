const pool = require("./database");

const get_passengers = async(pnr) => {
    const query =
        `
            SELECT * from passengers where booking_id = $1
        `;
    const res = await pool.query(query,[pnr]);
    return  res.rows;
}


module.exports = {get_passengers};