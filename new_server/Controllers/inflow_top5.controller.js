const {inflow_top5} = require("../Models/inflow_top5.models.js");

const top5_inflow = async (req,res) => {
    const data = await inflow_top5();
    return res.status(200).json(data);
}

module.exports = {top5_inflow}