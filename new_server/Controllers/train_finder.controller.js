const { search_train} = require('../Models/train_finder.models.js');


const train_finder = async (req,res) => {
    const data = await search_train(req.params.start_id,req.params.end_id);
    return res.status(200).json(data);
}

module.exports= {train_finder}