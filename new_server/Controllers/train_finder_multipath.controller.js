const { search_train_multipath} = require('../Models/train_finder_multipath.models.js');


const train_finder_multipath = async (req,res) => {
    console.log(req.params);
    const data = await search_train_multipath(req.params.start_station,req.params.end_station);
    console.log(data);
    return res.status(200).json(data);
}

module.exports= {train_finder_multipath}