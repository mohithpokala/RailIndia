const {get_trains} = require("../Models/get_all_trains.models.js");

const get_all_trains = async (req,res) => {
    const data = await get_trains();
    return res.status(200).json(data);
}

module.exports = {get_all_trains}