const pool = require("./database");

const inflow_top5 = async() => {
    const query =
        `
            select station_id,station_name,count(passenger) as x
            from 
            booking 
            natural join 
            passenger 
            natural join 
            paths 
            natural join
            station
            where 
            paths.path_id = start_station 
            group by paths.station_id ,station_name
            order by x desc 
            limit 5     
        `;
    const res = await pool.query(query);
    return  res.rows;
}


module.exports = {inflow_top5};