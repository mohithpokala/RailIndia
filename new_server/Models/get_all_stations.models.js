const pool = require("./database");

const get_stations = async() => {
    const query =
        `
            select * from station order by station_name
        `;
    const res = await pool.query(query);
    return  res.rows;
}


module.exports = {get_stations};