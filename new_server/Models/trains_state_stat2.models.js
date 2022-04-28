const pool = require("./database");

const state_stat2 = async() => {
    console.log("hello babe ");
    const query =
        `
        SELECT state, count(distinct station_id)
        FROM STATION 
        GROUP BY state
        having state != ''
        `;
    const res = await pool.query(query);
    return  res.rows;
}


module.exports = {state_stat2};