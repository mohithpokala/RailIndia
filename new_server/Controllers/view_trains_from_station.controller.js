const { view_trains_from_stations} = require('../Models/view_train_from_station.models.js');


const view_trains_from_station = async (req,res) => {

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


    const data = await view_trains_from_stations(req.params.station);
    return res.status(200).json(data);
}

module.exports = { view_trains_from_station }










































