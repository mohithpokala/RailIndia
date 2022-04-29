const pool = require("./database");

const get_station_inf = async(station)=>{
    const query=`
        SELECT station_name,city,state,station_id,ROUND(CAST(location[0] as numeric),3) as x,ROUND(CAST(location[1] as numeric),3) as y from station WHERE station_id = $1
    `;
    const res = await pool.query(query,[station]);

    return  res.rows
}

module.exports = {get_station_inf};