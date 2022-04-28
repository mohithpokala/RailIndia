const pool = require("./database");

const view_trains_from_stations = async(station)=>{
    const query=`
        SELECT train.train_no,train_name,source_id,dest_id FROM PATHs,train WHERE station_id = $1 and paths.train_no=train.train_no
    `;
    const res = await pool.query(query,[station]);

    return  res.rows
}

module.exports = {view_trains_from_stations};