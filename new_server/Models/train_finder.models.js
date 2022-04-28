const pool = require("./database");

const search_train = async(start_id,end_id) => {
    console.log(start_id)
    console.log(end_id);
    const query =
        `
        SELECT 
        A.train_no ,Train_name,source_id,dest_id,B.distance_from_source-A.distance_from_source as dist,B.expected_arrival_time,A.expected_departure_time
        FROM
        paths as A,train as C,
        paths as B where A.train_no=B.train_no and A.station_id = $1 and B.station_id = $2
        and A.train_no=C.train_no     and A.path_id < B.path_id
        `;
    const res = await pool.query(query,[start_id,end_id]);
    return  res.rows;
}


module.exports={search_train};