const { seats } = require("../Models/get_seat_availability.models.js");

const get_num_seats = async (req,res) => {
    const data = await seats(
        req.params.train,
        req.params.start_index,
        req.params.end_index,
        req.params.date
    );
    return res.status(200).json(data);
}

module.exports = { get_num_seats }
