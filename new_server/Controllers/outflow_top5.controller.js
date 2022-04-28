const {outflow_top5} = require("../Models/outflow_top5.models.js");

const top5_outflow = async (req,res) => {
    const data = await outflow_top5();
    return res.status(200).json(data);
}

module.exports = {top5_outflow}