const {all_schedule} = require('../Models/all_schedule.models.js');

var jwt = require("jsonwebtoken");

const all_schedules = async (req,res) => {

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

 




    const data = await all_schedule();
    return res.status(200).json(data);
}

module.exports= {all_schedules}