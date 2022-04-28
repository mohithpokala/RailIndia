
const pool = require("./database");

const book_ticket = async(train_no, journey_date, start_id, end_id, user_id) => {
    const query =
        `
            INSERT INTO BOOKING (train_no, journey_date, start_station, end_station, user_id) 
            VALUES ($1, $2, $3, $4, $5) returning booking_id;
        `;
    const res = await pool.query(query,[train_no,journey_date,start_id,end_id,user_id]);
    var a;
    if(res.length==0) { a=-1; return -1;}
    else  a = res.rows[0]['booking_id'];
    return {'booking_id' : a};
}


module.exports = { book_ticket };