const pool = require("./database");

const big_cities2 = async() => {
    console.log("here");
    const query =
        `select station_name,station_id,location[0] as a,location[1] as b,city,state
        from station 
        where station_id in ('SC','SBC','NDLS','VSKP','MAS','HWH','ALD','BZA','JP','LKO','LTT','CBE','ST','TVC','CDG','CTC','PNBE','ADI','PUNE','CNB')
        `;
    const res = await pool.query(query);
    return  res.rows;
}


module.exports = {big_cities2};