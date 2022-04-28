const pool = require("./database");

const LongestTrains = async() => {
    const query =
        `
        with f(stat1,stat2,dist,train_no,train_name) as
        (select 
        A.station_name,B.station_name,max(distance_from_source) as x,train_no,train_name
        from train natural join paths,station as A , station as B
        where
        A.station_id = source_id
        and 
        B.station_id = dest_id
        and 
         A.station_id<B.station_id
        group by A.station_name,B.station_name,train_no,train_name,A.station_name,B.station_name
        order by x desc),
        g(stat1,stat2,dist,train_no,train_name,x) as (
        select stat1,stat2,dist,train_no,train_name,
        rank() over(partition by stat1,stat2 order by dist desc,train_no asc) as x from f
        )
        select *
        from g
        where x=1
        order by dist desc
        limit 5
        `;
    const res = await pool.query(query);
    return  res.rows;
}


module.exports = {LongestTrains};