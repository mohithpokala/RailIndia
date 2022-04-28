const { get_train_inf} = require('../Models/get_train_info.models.js');

jwt = require("jsonwebtoken");
const get_train_info = async (req,res) => {
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

    const data = await get_train_inf(req.params.train);
    return res.status(200).json(data);
}

module.exports = { get_train_info }