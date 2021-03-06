const pool = require("./database");

const get_schedule = async(train_no)=>{
  const query=`
      SELECT train_no as x, path_id,STATION.station_id,location[0] as a,location[1] as b, STATION.station_name ,expected_arrival_time,expected_departure_time,distance_from_source,city,state
      FROM PATHS
      JOIN STATION on STATION.station_id = PATHs.station_id
      and train_no=$1
      order by path_id asc   
    `;
    const res = await pool.query(query,[train_no]);

    return  res.rows
}

module.exports = {get_schedule};