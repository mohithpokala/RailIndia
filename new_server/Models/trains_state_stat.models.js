const pool = require("./database");

const state_stat = async() => {
    const query =
        `
            SELECT state, count(distinct train_no)
            FROM  (SELECT state,TRAIN.train_no as train_no
            FROM  PATHs
            JOIN TRAIN on TRAIN.train_no = PATHs.train_no
            JOIN STATION on STATION.station_id = PATHs.station_id)  as temp_zones
            GROUP BY state
     
        `;
    const res = await pool.query(query);
    return  res.rows;
}


module.exports = {state_stat};