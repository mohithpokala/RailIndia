const pool = require("./database");

const view_trains_from_stations = async(station)=>{
  console.log(train_no)
    const query=`
        SELECT train_no FROM PATHs WHERE station_id = $1
    `;
    const res = await pool.query(query,[station]);

    return  res.rows
}

module.exports = {view_trains_from_stations};