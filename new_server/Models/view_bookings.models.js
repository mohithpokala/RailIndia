const pool = require("./database");

const view_bookings = async(user_id) => {
    const query =
        `
        SELECT 
        booking.train_no ,train_name,C.station_name as a,D.station_name as b,CAST (journey_date as varchar) as journey_date,
        booking_id

        from booking,paths as A,paths as B,station as C,station as D,train
        where user_id = $1
        and A.train_no = booking.train_no
        and B.train_no = booking.train_no
        and A.station_id = C.station_id
        and B.station_id = D.station_id
        and A.path_id=booking.start_station
        and B.path_id = booking.end_station
        and train.train_no = booking.train_no
        `;

    const res = await pool.query(query,[user_id]);
    return  res.rows;
}


module.exports = {view_bookings};