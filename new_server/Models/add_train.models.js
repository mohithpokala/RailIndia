
const pool = require("./database");

const add_train = async(train_no,train_name,capcity,num_stations,source_id,dest_id) => {
    const query =
        `
            INSERT INTO TRAIN (train_no,train_name,capcity,num_stations,source_id,dest_id)
            VALUE
            ($train_no, $train_name, $capcity, $num_stations, $source_id, $dest_id)
        `;
    const res = await pool.query(query,[train_no,train_name,capcity,num_stations,source_id,dest_id]);
    return  res.rows;
}


module.exports = { add_train };