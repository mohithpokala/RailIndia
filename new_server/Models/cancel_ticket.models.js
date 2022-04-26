


const pool = require("./database");

const cancel_ticket = async(bid) => {
    const query =
        `
            select * from train_instance where booking_id = $1
        `;
    const res = await pool.query(query,[bid]);
    if(res.length==0) return -1;
    else{
        const train_no = res.rows[0]['train_no'];
        const journey_date = res.rows[0]['journey_date'];
        const start_station = res.rows[0]['start_station'];
        const end_station = res.rows[0]['end_station'];

        const query2 = `
            update Train_instance
            set 
            available_seats = available_seats + (select count(*) from passenger where booking_id=$5)
            where
            train_no = $1 and journey_date = $2 and path_id>=$3 and path_id<=$4;
        `;

        const query3 = `
            DELETE FROM booking where booking_id=$1;
        `;

        const query4 = `
            DELETE FROM passenger where booking_id=$1;
        `;

        const query5 = `
            with A(pid,r,t) as (
                select passenger_id,rank() over (partition by journey_date,train_no order by waiting_pref_no asc)
                ,booking.train_no from booking , passenger
            where 
            booking.booking_id=passenger.booking_id
            and  booking.start_station >= $s and booking.end_station<=$e and booking.train_no=$t
            )
            update passenger
            set seat_no = -A.r + (select capacity from train where train.train_no=$t),
            waiting_pref_no  = A.r - (select capacity from train where train.train_no=$t)
            
            FROM booking,A
            where 
            A.pid=passenger.passenger_id;
        `;
        const res2 = await pool.query(query2,[train_no,journey_date,start_station,end_station,bid]);
        const res3 = await pool.query(query3,[bid]);
        const res4 = await pool.query(query4,[bid]);
        const res5 = await pool.query(query5,[start_station,end_station,train_no]);
    }
    return  res.rows;
}


module.exports = { cancel_ticket };

