const pool = require("./database");

const outflow_top5 = async() => {
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
            stations
            where 
            paths.path_id = end_station 
            group by paths.station_id 
            order by x desc 
            limit 5     
        `;
    const res = await pool.query(query);
    return  res.rows;
}


module.exports = {outflow_top5};