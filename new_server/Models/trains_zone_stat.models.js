const pool = require("./database");

const zone_stat = async() => {
    const query =
        `
            SELECT zone, count(train_no)
            FROM
            (SELECT TRAIN.train_no as train_no,zone
            FROM  Paths
            JOIN TRAIN on TRAIN.train_no = Paths.train_no
            JOIN STATION on STATION.station_id = Paths.station_id) as temp
            GROUP BY zone
        `;
    const res = await pool.query(query);
    return  res.rows;
}


module.exports = {zone_stat};