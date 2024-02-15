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

const tripsAddTrip = async (req, res) => {
    try {
        const trip = await TripModel.create({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });
        return res.status(201).json(trip);
    } catch (err) {
        return res.status(400).json(err);
    }
};


const tripsUpdateTrip = async (req, res) => {
    console.log(req.body);

    try {
        const updatedTrip = await TripModel.findOneAndUpdate(
            { 'code': req.params.tripCode },
            {
                $set: {
                    code: req.body.code,
                    name: req.body.name,
                    length: req.body.length,
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description
                }
            },
            { new: true }
        );

        if (!updatedTrip) {
            return res.status(404).send({
                message: "Trip not found with code " + req.params.tripCode
            });
        }

        res.send(updatedTrip);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Trip not found with code " + req.params.tripCode
            });
        }
        return res.status(500).json(err);
    }
};


module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};

