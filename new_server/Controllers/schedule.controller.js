const {get_schedule} = require('../Models/schedule.models.js');

var jwt = require("jsonwebtoken");

const schedule = async (req,res) => {

    const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

    

  if (!token) {
    return res.status(403).send({token:"No token"});
  }
  try {

    const decoded = jwt.verify(token, '}Z{C&dFwZ_ j9CI^Tp=-1I[|)]3|4a>7`$SSgNPe,5`b_1RjrB&+=erO@{t09RK:');
    req.user = decoded;
  } catch (err) {
    return res.status(401).send({token:"Invalid token"});
  }

 




    const data = await get_schedule(req.params.train_no);
    return res.status(200).json(data);
}

module.exports= {schedule}