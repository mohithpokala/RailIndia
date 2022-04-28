const pool = require("./database");

const zone_stat2 = async() => {
    const query =
        `
        SELECT zone, count(distinct station_id)
        FROM STATION 
        GROUP BY zone
        having zone != ''
        `;
    const res = await pool.query(query);
    return  res.rows;
}


module.exports = {zone_stat2};