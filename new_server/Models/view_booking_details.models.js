const pool = require("./database");

const view_booking_details = async(station)=>{
    const query=`
        SELECT * FROM PATHs,train WHERE station_id = $1 and paths.train_no=train.train_no
    `;
    const res = await pool.query(query,[station]);

    return  res.rows
}

module.exports = {view_booking_details};