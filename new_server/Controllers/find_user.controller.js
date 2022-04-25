const {get_user} = require("../Models/find_user.models.js");

const find_user = async (req,res) => {
    const data = await get_user(
        req.params.user_name,
        req.params.password
    );
    return res.status(200).json(data);
}

module.exports = { find_user }














