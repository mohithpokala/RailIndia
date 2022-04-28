const pool = require("./database");

const get_station_schedule = async(station_id)=>{
  const query=`
  SELECT train_no, train_name ,expected_arrival_time,expected_departure_time
  FROM PATHS
  JOIN  STATION on STATION.station_id = PATHs.station_id natural join train
  where STATION.station_id = $1
  order by expected_arrival_time asc   
    `;
    const res = await pool.query(query,[station_id]);

    return  res.rows
}

module.exports = {get_station_schedule};