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
        req.body.train_no,
        req.body.journey_date,
        req.body.start_id,
        req.body.end_id,
        req.body.user_id,
        req.body.num_seats
    );
    return res.status(200).json(data);
}

module.exports = { book_tickets }














