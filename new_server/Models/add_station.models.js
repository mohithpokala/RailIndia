const pool = require("./database");

const add_station = async(user_name,station_id, name,lat,long, city, state, zone) => {
    const query0=
    `
    SELECT * from users where name=$1 and is_admin='true';
    `;
    const res0 = await pool.query(query0,[user_name]);
    
    if(res0['rowCount']==0) return {check:"NOT ADMIN"};



    const query =
            `
            INSERT INTO STATION ( station_id, station_name,location, city, state, zone) 
            VALUES ( $1, $2, POINT($3, $4), $5, $6, $7);
        `;
    const res = await pool.query(query,[station_id, name,lat,long, city, state, zone]);
    console.log(res);
    return  res.rows;
}


module.exports = { add_station };
