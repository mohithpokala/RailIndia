const pool = require("./database");

const get_schedule = async(train_no)=>{
  const query=`
      SELECT train_no, path_id,STATION.station_id,location[0] as lat,location[1] as long, STATION.station_name ,expected_arrival_time,expected_departure_time,distance_from_source
      FROM PATHS
      JOIN STATION on STATION.station_id = PATHs.station_id
      and train_no=$1
      order by path_id asc   
    `;
    const res = await pool.query(query,[train_no]);

    return  res.rows
}

module.exports = {get_schedule};