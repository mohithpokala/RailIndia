const { view_bookings} = require('../Models/view_bookings.models.js');
jwt = require("jsonwebtoken");

const view_booking = async (req,res) => {
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
    // console.log("backend");
    // console.log(req);
    const data = await view_bookings(req.body.user_id);
    return res.status(200).json(data);
}

module.exports = { view_booking }