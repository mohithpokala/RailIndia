const {get_station_schedule} = require('../Models/station_schedule.models.js');


const station_schedule = async (req,res) => {
    const data = await get_station_schedule(req.params.station_name);
    console.log(req.params.train_no);
    return res.status(200).json(data);
}

module.exports= {station_schedule}