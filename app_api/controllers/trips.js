const mongoose = require('mongoose'); //.set('debug', true);
const TripModel = mongoose.model('trips');
const User = mongoose.model('users');

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
        getUser(req, res, async (req, res, userName) => {
            // Ensure that the user is authenticated and authorized before proceeding
            if (!userName) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            // Assuming TripModel is a Mongoose model for trips
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
        });
    } catch (err) {
        return res.status(400).json(err);
    }
};


const tripsUpdateTrip = async (req, res) => {
    console.log(req.body);

    try {
        getUser(req, res, async (req, res, userName) => {
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
    });
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Trip not found with code " + req.params.tripCode
            });
        }
        return res.status(500).json(err);
    }
};

const getUser = (req, res, callback) => {
    if (req.payload && req.payload.email) {
        User.findOne({ email: req.payload.email }).exec((err, user) => {
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        } else if (err) {
            console.log(err);
            return res.status(404).json(err);
        }
        callback(req, res, user.name);
        });
    } else {
        return res.status(404).json({ message: "User not found" });
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};

