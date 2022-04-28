const {path2train} = require("../Models/add_path_to_train.models.js");

const add_path_to_train = async (req,res) => {

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