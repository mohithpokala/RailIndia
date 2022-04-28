const { search_train} = require('../Models/train_finder.models.js');


const train_finder = async (req,res) => {
    console.log(req.params);
    const data = await search_train(req.params.start_station,req.params.end_station);
    return res.status(200).json(data);
}

module.exports= {train_finder}