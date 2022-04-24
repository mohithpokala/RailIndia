const {get_schedule} = require('../Models/schedule.models.js');


const schedule = async (req,res) => {
    const data = await get_schedule(req.params.train_no);
    console.log(req.params.train_no);
    return res.status(200).json(data);
}

module.exports= {schedule}