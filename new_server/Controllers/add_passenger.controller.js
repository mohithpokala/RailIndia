const {add_passenger} = require("../Models/add_passenger.models.js");

const Passenger_entry = async (req,res) => {
    // console.log(req.body)
    const data = await add_passenger(
        req.body
    );
    return res.status(200).json(data);
}

module.exports = { Passenger_entry }