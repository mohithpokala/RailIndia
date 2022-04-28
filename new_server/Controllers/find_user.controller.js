const { use } = require("bcrypt/promises");
const {get_user} = require("../Models/find_user.models.js");
jwt = require("jsonwebtoken");
const find_user = async (req,res) => {
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
    const { user_name, password } = req.body;

    const data = await get_user(
        user_name,
        password
    );
    return res.status(200).json(data);
}

module.exports = { find_user }














