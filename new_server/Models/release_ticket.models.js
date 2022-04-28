const pool = require("./database");

const rel_tckt = async(date, seats,train_no) => {
    const query =
        `
            INSERT into 
            Train_instance(
                journey_date,
                available_seats,
                cumulative_seats,
                path_id,
            train_no) 
            SELECT 
                $1,
                $2,
                $2,
                path_id,
                $3
            FROM
            paths
            where train_no = $3
        `
    ;
    const res = await pool.query(query,[date,seats,train_no]);
    return  res.rows;
}
module.exports = { rel_tckt };