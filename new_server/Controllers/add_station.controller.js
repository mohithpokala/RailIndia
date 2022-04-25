const {add_station} = require("../Models/add_station.models.js");
const add_stations = async (req,res) => {
    const data = await add_station(
        req.params.sid,
        req.params.sname,
        req.params.lat,
        req.params.long,
        req.params.city,
        req.params.state,
        req.params.zone
    );
    return res.status(200).json(data);
}

module.exports = { add_stations }