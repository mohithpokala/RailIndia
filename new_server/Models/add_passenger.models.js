const pool = require("./database");

const add_passenger = async(bid, name, age, sex) => {
    const bid_query = 
    `
        -- We get a booking, and we need to add passengers and update available seats
        select train_no as tn, journey_date as d, start_id as s, end_id as e
        from booking 
        where booking_id = $1
    `;

    const res1 = await pool.query(bid_query, [bid]);

    const query0 = 
    `
        -- We get a booking, and we need to add passengers and update available seats
        update train_instance
        set available_seats = available_seats - 1
        where train_no = $1 and journey_date = $2
            and path_id >= $3 and path_id <= $4
    `;
    const res0 = await pool.query(query2, [res1.rows[0]['tn'], res1.rows[0]['d'], res1.rows[0]['s'], res1.rows[0]['e']]);

    if (res0.length == 0)
    {
        return -1;
    }

    const query =
        `
            select case 
                when min(available_seats) <= 0 then - min(available_seats) + 1
                when min(available_seats) > 0 then 0
            end as x
            from train_instance 
            where train_no = $1 and journey_date = $2
                and path_id >= $3 and path_id <= $4
        
        `
    ;

    const res = await pool.query(query, [res1.rows[0]['tn'], res1.rows[0]['d'], res1.rows[0]['s'], res1.rows[0]['e']]);
    
    const query2 =
            `
            INSERT INTO Passenger(booking_id, name, age, sex, waiting_pref_no) 
            VALUES ($1, $2, $3, $4, $5, $6);
        `;
    const res2 = await pool.query(query2,[bid, name, age, sex, res.rows[0]['x']]);
    return  res2.rows;
}
module.exports = { add_passenger };