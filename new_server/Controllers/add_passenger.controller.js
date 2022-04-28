const {add_passenger} = require("../Models/add_passenger.models.js");

const Passenger_entry = async (req,res) => {
    const data = await add_passenger(
        req.params.bid,
        req.params.name,
        req.params.age,
        req.params.sex
    );
    return res.status(200).json(data);
}

module.exports = { Passenger_entry }