const { search_train_multipath} = require('../Models/train_finder_multipath.models.js');


const train_finder_multipath = async (req,res) => {
    const data = await search_train_multipath(req.params.start_id,req.params.end_id);
    return res.status(200).json(data);
}

module.exports= {train_finder_multipath}