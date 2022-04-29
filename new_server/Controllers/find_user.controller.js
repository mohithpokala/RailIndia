const { use } = require("bcrypt/promises");
const {get_user} = require("../Models/find_user.models.js");
jwt = require("jsonwebtoken");
const find_user = async (req,res) => {

    const { user_name, password } = req.body;

    const data = await get_user(
        user_name,
        password
    );
    console.log(data);
    return res.status(200).json(data);
}

module.exports = { find_user }














