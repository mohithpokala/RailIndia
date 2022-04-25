const {add_train} = require("../Models/add_train.models.js");

const add_trains = async (req,res) => {
    const data = await add_train(
        req.params.train_no,
        req.params.train_name,
        req.params.capcity,
        req.params.num_stations,
        req.params.source_id,
        req.params.dest_id
    );
    return res.status(200).json(data);
}

module.exports = { add_trains }