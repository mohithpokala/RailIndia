const { view_tickets} = require('../Models/view_tickets.models.js');


const view_ticket = async (req,res) => {
    const data = await view_tickets(req.params.pnr);
    return res.status(200).json(data);
}

module.exports = { view_ticket }