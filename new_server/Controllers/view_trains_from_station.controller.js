const { view_trains_from_stations} = require('../Models/view_train_from_station.models.js');


const view_trains_from_station = async (req,res) => {
    const data = await view_trains_from_stations(req.params.station);
    return res.status(200).json(data);
}

module.exports = { view_trains_from_station }










































