const {zone_stat2} = require("../Models/trains_zone_stat2.models.js");
jwt = require("jsonwebtoken");
const trains_zone_stat2 = async (req,res) => {
    const data = await zone_stat2();
    return res.status(200).json(data);
}

module.exports = {trains_zone_stat2}