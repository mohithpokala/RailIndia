
const pool = require("./database");

const available_date = async(train_no) => {
    const query =
        `
            select journey_date
            from train_instance
            where train_no = $1
        `;
    const res = await pool.query(query,[train_no]);
    return  res.rows;
}


module.exports = { available_date };