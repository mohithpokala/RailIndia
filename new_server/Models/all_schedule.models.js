const pool = require("./database");

const all_schedule = async()=>{
  const query=`
  select source_id,train_no,round(cast(location[0] as numeric),3) as lat,round(cast(location[1] as numeric),3) as long,train_no from train natural join paths natural join station
  where
  source_id in ('SC','SBC','NGC','NDLS','VSKP','MAS','HWH','ALD','BZA','JP','LKO','CBE','TVC','ADI','ST','LTT','CDG','CTC','PNBE','PUNE','CNB')
  and
  dest_id in   ('SC','SBC','NGC','NDLS','VSKP','MAS','HWH','ALD','BZA','JP','LKO','LTT','ADI','CBE','ST','TVC','CDG','CTC','PNBE','PUNE','CNB')
and source_id<dest_id	 
    `;
    const res = await pool.query(query);

    return  res.rows
}

module.exports = {all_schedule};