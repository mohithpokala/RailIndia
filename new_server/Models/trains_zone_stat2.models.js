const pool = require("./database");

const zone_stat2 = async() => {
    const query =
        `
        SELECT zone, count(distinct station_id) as x
        FROM STATION 
        where zone != 'None' and zone !='?'
        GROUP BY zone
        order by x desc
        `;
    const res = await pool.query(query);
    return  res.rows;
}


module.exports = {zone_stat2};