


const pool = require("./database");

const cancel_ticket = async(bid) => {
    const query =
        `
            select * from train_instance where booking_id = $1
        `;
    const res = await pool.query(query,[bid]);
    if(res.rows.length==0) return -1;
    else{
        const train_no = res.rows[0]['train_no'];
        const journey_date = res.rows[0]['journey_date'];
        const start_station = res.rows[0]['start_station'];
        const end_station = res.rows[0]['end_station'];

        const seats_query = 
        `
            select count(*) as cnt from passenger where booking_id = $1
        `;

        const seats_res = await pool.query(seats_query, [bid]);
        const query2 = `
            update Train_instance
            set 
            available_seats = available_seats + $5
            where
            train_no = $1 and journey_date = $2 and path_id>=$3 and path_id<=$4;
        `;

        const query3 = `
            DELETE FROM booking where booking_id=$1;
        `;

        const query4 = `
            DELETE FROM passenger where booking_id=$1;
        `;

        const res2 = await pool.query(query2,[train_no, journey_date, start_station, end_station, seats_res[0]['cnt']]);

        const query5 = `
        -- someone cancelled, and we need to update all waiting lists
        with bids as (
            select booking_id from booking where train_no = $1
        )
        update passenger
        set waiting_pref_no = case 
            when waiting_pref_no <= $2 then 0
            when waiting_pref_no > $2 then waiting_pref_no - $2
            end
        `;
        const res5 = await pool.query(query5,[train_no, seats_res[0]['cnt']]);
        const res3 = await pool.query(query3,[bid]);
        const res4 = await pool.query(query4,[bid]);
    }
    return  res.rows;
}


module.exports = { cancel_ticket };

