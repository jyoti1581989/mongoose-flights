const express = require('express')
const router = express.Router()
const destinationsCtrl = require('../controller/destinations')

// POST /flights/:id/destinations (create destination for a flight)
router.post('/flights/:id/destinations', destinationsCtrl.create)

module.exports = router