const { get_station_id} = require('../Models/get_station_id.models.js');


const get_id = async (req,res) => {
    const data = await get_station_id(req.params.station);
    return res.status(200).json(data);
}

module.exports = { get_id }