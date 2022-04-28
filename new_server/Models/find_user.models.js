
const pool = require("./database");
const bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");

const get_user = async(user_name,password) => {

  console.log(user_name);
    const query =
        `
            SELECT is_admin,password FROM users WHERE name = $1;       
        `;
    const res = await pool.query(query,[user_name]);
    if(res['rowCount']==0) return "INVALID USERID";

    //console.log(res['rows'][0]['password']);
    //return res;
    encryptedPassword = await bcrypt.hash(res['rows'][0]['password'], 10);
    //console.log(res['rows'][0]['password'],password);
    //if(encryptedPassword.slice(0,72)==password.slice(0,72)) return res['rows'][0]['is_admin'];

    check=await bcrypt.compareSync(res['rows'][0]['password'], password);

    

    if (check) {
        const token = jwt.sign(
            { foo:'bar' },
            '}Z{C&dFwZ_ j9CI^Tp=-1I[|)]3|4a>7`$SSgNPe,5`b_1RjrB&+=erO@{t09RK:',
            {
              expiresIn: "2h",
            }
          );


            return {"check":check,"token":token};
        }
    else return "INVALID PASSWORD";

    const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
    

}

module.exports = { get_user };