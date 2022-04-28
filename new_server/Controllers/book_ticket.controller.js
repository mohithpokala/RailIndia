const {book_ticket} = require("../Models/book_ticket.models.js");
jwt = require("jsonwebtoken");
const book_tickets = async (req,res) => {

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


    const data = await book_ticket(
        req.params.train_no,
        req.params.journey_date,
        req.params.start_id,
        req.params.end_id,
        req.params.user_id,
        req.params.num_seats
    );
    return res.status(200).json(data);
}

module.exports = { book_tickets }














