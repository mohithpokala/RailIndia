
const pool = require("./database");
const bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");
const cryptr = require('cryptr');

const get_user = async(user_name,age,phone,email,sex,password) => {


   //  const encryptedString = cryptr.encrypt('bacon');
    const decryptedString = cryptr.decrypt(password);
     
    const query =
        `
        INSERT INTO users(name,age,is_admin,phone,email,sex,password) VALUES ($1,$2,'FALSE',$3,$4,$5,$6);
        `;
    const res = await pool.query(query,[user_name,age,phone,email,sex,decryptedString]);
    //console.log(res['rows'][0]['password']);
    //return res;
    encryptedPassword = await bcrypt.hash(decryptedString, 10);
    //console.log(res['rows'][0]['password'],password);
    //if(encryptedPassword.slice(0,72)==password.slice(0,72)) return res['rows'][0]['is_admin'];

    check=await bcrypt.compareSync(res['rows'][0]['password'], password);

    
        const token = jwt.sign(
            { foo:'bar' },
            '}Z{C&dFwZ_ j9CI^Tp=-1I[|)]3|4a>7`$SSgNPe,5`b_1RjrB&+=erO@{t09RK:',
            {
              expiresIn: "2h",
            }
          );


            return {"token":token};


}

module.exports = { adduser };