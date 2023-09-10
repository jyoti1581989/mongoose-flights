const Ticket = require('../models/ticket')
const Flight = require('../models/flight')

module.exports = {
    new: newTicket,
    create,
    addToTickets
}

async function addToTickets(req, res) {
    const flight = await Flight.findById(req.params.id)
    // // The cast array holds the performer's ObjectId (referencing)
    // flight.tickets(req.body.ticketId)
    const ticket = await Ticket.findById(req.body.ticketId)
    ticket.flight = flight._id
    ticket.populate('flight')
    await ticket.save()
    res.redirect(`/flights/${flight._id}`)
}

async function newTicket(req, res) {
    const tickets = await Ticket.find({})
    res.render('tickets/new', { title: 'Add Ticket', tickets })
}
async function create(req, res) {
    try {
        await Ticket.create(req.body)
    } catch (err) {
        console.log(err)
    }
    res.redirect('/tickets/new')
}