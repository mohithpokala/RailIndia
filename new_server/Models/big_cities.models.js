const pool = require("./database");

const big_cities = async() => {
    const query =
        `select station_name,station_id,count(distinct train_no)   as x,location[0] as a,location[1] as b,city,state
        from station natural join paths 
        group by station_name,station_id
        order by x desc
        limit 50 
        `;
    const res = await pool.query(query);
    return  res.rows;
}


module.exports = {big_cities};