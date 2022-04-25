const pool = require("./database");

const search_train_multipath = async(start_id,end_id) => {

    const query =
        `
            with f(train1,train2,d1,d2,total_dist,halt_station,deptime,arrtime) as (
            select  B.train_no,C.train_no ,B.Distance_from_source-A.Distance_from_source ,D.Distance_from_source-C.Distance_from_source,B.Distance_from_source-A.Distance_from_source +D.Distance_from_source-C.Distance_from_source as l,B.station_id,C.expected_departure_time,B.expected_arrival_time,  EXTRACT(EPOCH FROM (C.expected_departure_time - B.expected_arrival_time)) AS difference
            from paths as B ,paths as A,paths as C,paths as D
            where 
            B.train_no = A.train_no 
            and 
            A.path_id<B.path_id 
            and
            D.path_id>C.path_id
            and
            D.train_no = C.train_no
            and 
            C.station_id=B.station_id
            and 
            A.station_id=$1 and D.station_id=$2
            and
            C.train_no!=A.train_no
            and 
            C.expected_departure_time > B.expected_arrival_time
            and
            EXTRACT(EPOCH FROM (C.expected_departure_time - B.expected_arrival_time)) < 1200
            and
            EXTRACT(EPOCH FROM (C.expected_departure_time - B.expected_arrival_time)) > 300
            )
            select * from f 
            where 
            total_dist < (select min(total_dist) from f)*1.1
            order by total_dist desc limit 3    
        `;
    const res = await pool.query(query,[start_id,end_id]);
    return  res.rows;
}


module.exports={search_train_multipath};