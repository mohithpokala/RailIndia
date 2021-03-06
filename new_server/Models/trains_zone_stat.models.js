const pool = require("./database");

const zone_stat = async() => {
    const query =
        `
            SELECT zone, count(distinct train_no) as x
            FROM
            (SELECT TRAIN.train_no as train_no,zone
            FROM  Paths
            JOIN TRAIN on TRAIN.train_no = Paths.train_no
            JOIN STATION on STATION.station_id = Paths.station_id) as temp
            where zone != 'None' and zone !='?'
            GROUP BY zone
            order by x desc
        `;
    const res = await pool.query(query);
    return  res.rows;
}


module.exports = {zone_stat};