const pool = require("./database");

const get_num_seats = async(train_no, sid,eid,date) => {
    const query =
        `
            select min(available_seats) as x from train_instance
            path_id>= $1 and path_id <= $2 and train_no = $3 and journey_date = $4
        `
    ;
    const res = await pool.query(query,[sid,eid,train_no,date]);
    return  res.rows;
}
module.exports = { get_num_seats };