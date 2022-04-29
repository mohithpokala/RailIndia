const pool = require("./database");

const add_passenger = async(req) => {
    let bid = req.bid;
    let list = req.vals;

    const bid_query = 
    `
        -- We get a booking, and we need to add passengers and update available seats
        select train_no as tn, journey_date as d, start_station as s, end_station as e
        from booking 
        where booking_id = $1
    `;

    const query =
        `
            select case 
                when min(available_seats) < 0 then - min(available_seats) - 1
                when min(available_seats) >= 0 then 0
            end as x
            from train_instance 
            where train_no = $1 and journey_date = $2
                and path_id >= $3 and path_id <= $4
        
        `
    ;

    const av_q = 
    `
        select available_seats
        from train_instance
        where train_no = $1 and journey_date = $2
            and path_id >= $3 and path_id <= $4
    `
    ;
    const query0 = 
    `
        -- We get a booking, and we need to add passengers and update available seats
        update train_instance
        set available_seats = available_seats - $5
        where train_no = $1 and journey_date = $2
            and path_id >= $3 and path_id <= $4
    `;

    const query2 =
            `
            INSERT INTO Passenger(booking_id, name, age, sex, waiting_pref_no) 
            VALUES ($1, $2, $3, $4, $5);
        `
    ;

    const res1 = await pool.query(bid_query, [bid]);
    const res0 = await pool.query(query0, [res1.rows[0]['tn'], res1.rows[0]['d'], res1.rows[0]['s'], res1.rows[0]['e'], list.length])
    .then(
        (res) => {
            const res3 = pool.query(av_q, [res1.rows[0]['tn'], res1.rows[0]['d'], res1.rows[0]['s'], res1.rows[0]['e']])
            .then((seats) => {
                var seats = seats.rows[0]['available_seats'];
                var promises = [];
                for (var i = list.length - 1; i >= 0; i--) {
                    let seat = 0;
                    if (seats + list.length - i <= 0) seat = i - list.length - seats + 1;
                    promises.push(
                        pool.query(query2, [bid, list[i].name, list[i].age, list[i].sex, seat])
                    )}
                return Promise.all(promises);
            });
    });
}
module.exports = { add_passenger };