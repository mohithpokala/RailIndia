const pool = require("./database");

const add_passenger = async(bid, name,age,sex) => {
    const query =
        `
            select min(available_seats) as x from train_instance natural join booking where
            booking.booking_id = $1 and path_id>= start_station and path_id <= end_station
        `
    ;
    const res = await pool.query(query,[bid]);
    if(res.length==0) return res;
    const query2 =
            `
            INSERT INTO Passenger(booking_id,name,seat_no,age,sex,waiting_pref_no) 
            VALUES ( $1,$2,$3,$4,$5,$6);
        `;
    const res2 = await pool.query(query2,[bid, name,res.rows[0]['x'],age, sex, res.rows[0]['x']]);
    return  res2.rows;
}
module.exports = { add_passenger };