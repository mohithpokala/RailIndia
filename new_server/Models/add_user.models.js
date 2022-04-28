
const pool = require("./database");
const bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js")

const adduser = async(user_name,age,phone,email,sex,password) => {


    // var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123').toString();

    // // Decrypt
    // var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
    // var originalText = bytes.toString(CryptoJS.enc.Utf8);

    var bytes  = CryptoJS.AES.decrypt(password, "10");
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);

     console.log(decryptedString);
    const query =
        `
        INSERT INTO users(name,age,is_admin,phone,email,sex,password) VALUES ($1,$2,'FALSE',$3,$4,$5,$6);
        `;
    const res = await pool.query(query,[user_name,age,phone,email,sex,decryptedString]);
    //console.log(res['rows'][0]['password']);
    console.log(res);
    //return res;
    encryptedPassword = await bcrypt.hash(decryptedString, 10);
    //console.log(res['rows'][0]['password'],password);
    //if(encryptedPassword.slice(0,72)==password.slice(0,72)) return res['rows'][0]['is_admin'];


    
        const token = jwt.sign(
            { user_name:user_name },
            '}Z{C&dFwZ_ j9CI^Tp=-1I[|)]3|4a>7`$SSgNPe,5`b_1RjrB&+=erO@{t09RK:',
            {
              expiresIn: "2h",
            }
          );


            return {"token":token};


}

module.exports = { adduser };