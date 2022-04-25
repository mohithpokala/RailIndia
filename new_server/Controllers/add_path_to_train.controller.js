const {path2train} = require("../Models/add_path_to_train.models.js");

const add_path_to_train = async (req,res) => {
    const data = await path2train(
        req.params.train_no,
        req.params.station_code,
        req.params.distance,
        req.params.price_from_source,
        req.params.eat,
        req.params.edt
    );
    return res.status(200).json(data);
}

module.exports = { add_path_to_train }