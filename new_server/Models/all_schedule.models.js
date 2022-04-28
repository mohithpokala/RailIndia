const pool = require("./database");

const all_schedule = async()=>{
  const query=`
  select location[0] as lat,location[1] as long,train_no from train natural join paths natural join station
  where
  source_id in ('SC','SBC','NDLS','VSKP','MAS','HWH','ALD','BZA','JP','LKO','CBE','TVC','ST','LTT','CDG','PNBE','ADIJ','PUNE','CNB')
  and
  dest_id in   ('SC','SBC','NDLS','VSKP','MAS','HWH','ALD','BZA','JP','LKO','LTT','CBE','ST','TVC','CDG','PNBE','ADIJ','PUNE','CNB')
  and source_id<dest_id	  order by train_no asc
    `;
    const res = await pool.query(query);

    return  res.rows
}

module.exports = {all_schedule};