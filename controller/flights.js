const Flight = require('../models/flight')

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
    res.render('flights/show', { title: 'Flight Detail', flight })
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
        await Flight.create(req.body)
    } catch (err) {
        console.log(err)
        res.render('flights/new', { errorMsg: err.message })
    }
}

