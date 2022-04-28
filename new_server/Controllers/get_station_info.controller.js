const { get_station_inf} = require('../Models/get_station_info.models.js');


const get_station_info = async (req,res) => {
    const data = await get_station_inf(req.params.station);
    return res.status(200).json(data);
}

module.exports = { get_station_info }