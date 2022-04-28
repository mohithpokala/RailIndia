const {add_train} = require("../Models/add_train.models.js");
jwt = require("jsonwebtoken");
const add_trains = async (req,res) => {

    const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

    

  if (!token) {
    return res.status(403).send({"token":"No Token"});
  }
  try {
    const decoded = jwt.verify(token, '}Z{C&dFwZ_ j9CI^Tp=-1I[|)]3|4a>7`$SSgNPe,5`b_1RjrB&+=erO@{t09RK:');
    req.user = decoded;
  } catch (err) {
    return res.status(401).send({"token":"Invalid Token"});
  }


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