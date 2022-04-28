const {state_stat} = require("../Models/trains_state_stat.models.js");

const trains_state_stat = async (req,res) => {
    const data = await state_stat();
    return res.status(200).json(data);
}

module.exports = {trains_state_stat}