const { use } = require("bcrypt/promises");
const {adduser} = require("../Models/find_user.models.js");
jwt = require("jsonwebtoken");
const add_user = async (req,res) => {
 
    const { user_name,age,phone,email,sex, password } = req.body;

    const data = await adduser(
        user_name,
        age,
        phone,
        email,
        sex,
        password
    );
    return res.status(200).json(data);
}

module.exports = { add_user }