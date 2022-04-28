const {book_ticket} = require("../Models/book_ticket.models.js");

const book_tickets = async (req,res) => {
    const data = await book_ticket(
        req.params.train_no,
        req.params.journey_date,
        req.params.start_id,
        req.params.end_id,
        req.params.user_id,
    );
    return res.status(200).json(data);
}

module.exports = { book_tickets }














