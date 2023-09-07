const mongoose = require('mongoose')
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema

const destinationSchema = new Schema({
    airport: {
        type: String,
        enum: ["AUS", "DEF", "LAX", "SAN", "ATL"]
    },
    arrival: {
        type: Date,
    }
}, {
    timestamps: true
})

const flightSchema = new Schema({
    airline: String,
    airport: {
        type: String,
        enum: ["AUS", "DEF", "LAX", "SAN", "ATL"]
    },
    flightNo: {
        type: Number,
        min: 10,
        max: 9999
    },
    departs: {
        type: Date
    },
    destinations: [destinationSchema]
}, {
    timestamps: true
})

// Compile the schema into a model and export it
module.exports = mongoose.model('Flight', flightSchema)