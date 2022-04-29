const pool = require("./database");

const search_train = async(start_id,end_id) => {

    const query =
        `
        with f(i) as (select station_id from station where station_name = $1 limit 1 ),
        g(i) as (select station_id from station where station_name = $2 limit 1 )
        SELECT 
        A.train_no ,Train_name,source_id,dest_id,B.distance_from_source-A.distance_from_source as dist,B.expected_arrival_time,A.expected_departure_time
        FROM
        paths as A,train as C,f,g,
        paths as B where A.train_no=B.train_no and A.station_id = f.i and B.station_id = g.i and
         A.train_no=C.train_no     and A.path_id < B.path_id
        `;
    const res = await pool.query(query,[start_id,end_id]);
    return  res.rows;
}


module.exports={search_train};