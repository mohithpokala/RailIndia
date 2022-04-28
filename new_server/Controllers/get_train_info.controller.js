const { get_train_inf} = require('../Models/get_train_info.models.js');

jwt = require("jsonwebtoken");
const get_train_info = async (req,res) => {
    const data = await get_train_inf(req.params.train);
    return res.status(200).json(data);
}

module.exports = { get_train_info }