const {zone_stat} = require("../Models/trains_zone_stat.models.js");

const trains_zone_stat = async (req,res) => {
    const data = await zone_stat();
    return res.status(200).json(data);
}

module.exports = {trains_zone_stat}