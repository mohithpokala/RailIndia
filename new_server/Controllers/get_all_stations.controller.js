const {get_stations} = require("../Models/get_all_stations.models.js");

const get_all_stations = async (req,res) => {
    const data = await get_stations();
    return res.status(200).json(data);
}

module.exports = {get_all_stations}