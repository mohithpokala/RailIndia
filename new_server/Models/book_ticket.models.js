
const pool = require("./database");

const book_ticket = async(train_no,journey_date,start_id,end_id,user_id,num_seats) => {
    const query =
        `
            INSERT INTO BOOKING (train_no,journey_date,start_station,end_station,user_id) 
            VALUES ($1,$2,$3,$4,$5) returning booking_id;
        `;
    const res = await pool.query(query,[train_no,journey_date,start_id,end_id,user_id]);
    var a;
    if(res.length==0) { a=-1;return -1;}
    else  a = res.rows[0]['booking_id'];
    console.log(a);
    const query2 = 
    `
        UPDATE TRAIN_INSTANCE
        SET
        available_seats = available_seats - $5
        WHERE
        train_no=$1 and journey_date = $2 and path_id>=$3 and path_id<=$4 ;
    `;
    const res2 = await pool.query(query2,[train_no,journey_date,start_id,end_id,num_seats]);
    return  res2.rows;
}


module.exports = { book_ticket };