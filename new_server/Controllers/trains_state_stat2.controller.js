const {state_stat2} = require("../Models/trains_state_stat2.models.js");

const trains_state_stat2 = async (req,res) => {
    const data = await state_stat2();
    console.log(data);
    return res.status(200).json(data);
}

module.exports = {trains_state_stat2}