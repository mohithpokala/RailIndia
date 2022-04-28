const {cancel_ticket} = require("../Models/cancel_ticket.models.js");
const cancel_tickets = async (req,res) => {
    const data = await cancel_ticket(
        req.params.bid
    );
    return res.status(200).json(data);
}

module.exports = { cancel_tickets }