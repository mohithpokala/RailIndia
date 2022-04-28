const pool = require("./database");

const get_station_id = async(station)=>{
    const query=`
        SELECT station_id from station WHERE station_name = $1
    `;
    const res = await pool.query(query,[station]);

    return  res.rows
}

module.exports = {get_station_id};