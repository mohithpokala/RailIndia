const { get_passengers} = require('../Models/get_passengers.models.js');


const get_passenger = async (req,res) => {
    const data = await get_passengers(req.params.pnr);
    return res.status(200).json(data);
}

module.exports = { get_passenger }