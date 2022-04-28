const {book_ticket} = require("../Models/book_ticket.models.js");

const book_tickets = async (req,res) => {
    console.log(req.body);
    const data = await book_ticket(
        req.body.train_no,
        req.body.journey_date,
        req.body.start_id,
        req.body.end_id,
        req.body.user_id,
    );
    return res.status(200).json(data);
}

module.exports = { book_tickets }














