const pool = require("./database");

const get_trains = async() => {
    const query =
        `
            select distinct train_no, train_name from train
            order by train_name asc
        `;
    const res = await pool.query(query);
    return  res.rows;
}

module.exports = {get_trains};