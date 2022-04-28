const pool = require("./database");

const inflow_top5 = async() => {
    const query =
        `
            select station_id,count(passenger) as x
            from 
            booking 
            natural join 
            passenger 
            natural join 
            paths 
            where 
            paths.path_id = start_station 
            group by paths.station_id 
            order by x desc 
            limit 5     
        `;
    const res = await pool.query(query);
    return  res.rows;
}


module.exports = {inflow_top5};