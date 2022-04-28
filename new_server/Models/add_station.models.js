const pool = require("./database");

const add_station = async(station_id, name,lat,long, city, state, zone) => {
    const query =
            `
            INSERT INTO STATION ( station_id, station_name,location, city, state, zone) 
            VALUES ( $1, $2, POINT($3, $4), $5, $6, $7);
        `;
    const res = await pool.query(query,[station_id, name,lat,long, city, state, zone]);
    return  res.rows;
}


module.exports = { add_station };
