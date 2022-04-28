const pool = require("./database");

const get_train_inf = async(train)=>{
    const query=`
        SELECT * from train WHERE train_no = $1
    `;
    const res = await pool.query(query,[train]);

    return  res.rows
}

module.exports = {get_train_inf};