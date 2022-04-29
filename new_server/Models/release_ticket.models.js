const pool = require("./database");

const rel_tckt = async(user_name,date, train_no) => {
    console.log(user_name);
    const query0=
    `
    SELECT * from users where name=$1 and is_admin='true';
    `;
    const res0 = await pool.query(query0,[user_name]);
    
    if(res0['rowCount']==0) return {check:"NOT ADMIN"};
    const query1=
    `
    SELECT num_stations from train where train_no=$1 ;
    `;
    const res1 = await pool.query(query1,[train_no]);
    console.log(res1.rows[0].num_stations);
    const query2=
    `
    select capacity from train where train_no = $1 ;
    `;
    const res2 = await pool.query(query2,[train_no]);
    const capacity = res2.rows[0].capacity;
    var act_date = new Date(date);
    console.log(act_date);
    console.log(capacity);

    for ( let i = 1; i < res1.rows[0].num_stations+1; i++) {
        
        const query3 =
        `
            INSERT into 
            Train_instance(
                journey_date,
                available_seats,
                path_id,
            train_no) 
            VALUES ( $1,$2,$3,$4);
        `;
    const res = await pool.query(query3,[date,capacity,i,train_no]);
    }
    
    return  res1.rows;
}
module.exports = { rel_tckt };