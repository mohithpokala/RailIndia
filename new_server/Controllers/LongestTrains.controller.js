const {LongestTrains} = require("../Models/LongestTrains.models.js");

const top5_trains = async (req,res) => {
    const data = await LongestTrains();
    return res.status(200).json(data);
}

module.exports = {top5_trains}