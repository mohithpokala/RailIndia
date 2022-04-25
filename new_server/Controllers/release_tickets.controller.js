const { rel_tckt } = require("../Models/release_tickets.models.js");

const release_tickets = async (req,res) => {
    const data = await cancel_ticket(
        req.params.date,
        req.params.seats,
        req.params.train_no
    );
    return res.status(200).json(data);
}

module.exports = { release_tickets }
