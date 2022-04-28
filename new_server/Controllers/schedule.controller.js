const {get_schedule} = require('../Models/schedule.models.js');

var jwt = require("jsonwebtoken");

const schedule = async (req,res) => {

    const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

    

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {

    console.log(token,"N");
    const decoded = jwt.verify(token, '}Z{C&dFwZ_ j9CI^Tp=-1I[|)]3|4a>7`$SSgNPe,5`b_1RjrB&+=erO@{t09RK:');
    console.log(decoded);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }

 




    const data = await get_schedule(req.params.train_no);
    console.log(req.params.train_no);
    return res.status(200).json(data);
}

module.exports= {schedule}