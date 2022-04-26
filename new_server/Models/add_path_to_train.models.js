
const pool = require("./database");

const path2train = async(train_no,station_id,distance_from_source,price,expected_arrival_time,expected_departure_time) => {
    const query =
        `
            INSERT INTO paths(train_no,station_id,distance_from_source,price,expected_arrival_time,expected_departure_time)
            VALUES($1,$2,$3,$4,$5,$6);       
        `;
    const res = await pool.query(query,[train_no,station_id,distance_from_source,price,expected_arrival_time,expected_departure_time]);
    return  res.rows;
}


module.exports = { path2train };