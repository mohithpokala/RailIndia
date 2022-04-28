const pool = require("./database");

const get_station_inf = async(station)=>{
    const query=`
        SELECT * from station WHERE station_id = $1
    `;
    const res = await pool.query(query,[station]);

    return  res.rows
}

module.exports = {get_station_inf};