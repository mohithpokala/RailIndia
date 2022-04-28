const {big_cities} = require("../Models/big_cities.models.js");

const big_city = async (req,res) => {
    const data = await big_cities();
    return res.status(200).json(data);
}

module.exports = {big_city}