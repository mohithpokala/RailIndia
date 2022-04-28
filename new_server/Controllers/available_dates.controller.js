const { available_date } = require("../Models/available_date.models.js");

const available_dates = async (req,res) => {
    const data = await available_date(
        req.params.train_no
    );
    return res.status(200).json(data);
}

module.exports = { available_dates }