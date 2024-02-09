const mongoose = require('mongoose'); //.set('debug', true);
const TripModel = mongoose.model('trips');

// GET: /trips - lists all the trips
const tripsList = async (req, res) => {
    try {
        const trips = await TripModel.find({}).exec();

        if (!trips) {
            return res.status(404).json({ "message": "No trips found" });
        } else {
            return res.status(200).json(trips);
        }
    } catch (err) {
        return res.status(500).json({ "error": err.message });
    }
};



// GET: /trips/:tripCode - return a single trip
const tripsFindByCode = async (req, res) => {
    try {
        const trip = await TripModel.findOne({ 'code': req.params.tripCode }).exec();

        if (!trip) {
            return res.status(404).json({ "message": "Trip not found" });
        }

        return res.status(200).json(trip);
    } catch (err) {
        return res.status(500).json({ "error": err.message });
    }
};


module.exports = {
    tripsList,
    tripsFindByCode
};