const Flight = require('../models/flight')
const Ticket = require('../models/ticket')

module.exports = {
    index,
    show,
    new: newFlight,
    create,

}

async function index(res, res) {
    const flights = await Flight.find({})
    res.render('flights/index', { flights })
}

async function show(req, res) {
    const flight = await Flight.findById(req.params.id)
    const tickets = await Ticket.find({})
    res.render('flights/show', { title: 'Flight Detail', flight, tickets })
}

function newFlight(req, res) {
    // We'll want to be able to render an  
    // errorMsg if the create action fails
    res.render('flights/new', { errorMsg: '' })
}

async function create(req, res) {
    // Remove empty properties so that defaults will be applied
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key]
    }

    try {
        const ticket = await Flight.create(req.body)
        res.redirect(`/tickets/${ticket._id}`)
    } catch (err) {
        console.log(err)
        res.render('flights/new', { errorMsg: err.message })
    }
}

