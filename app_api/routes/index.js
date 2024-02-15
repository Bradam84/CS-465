const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

// Route for listing all trips
router.route('/trips')
    .get(tripsController.tripsList)
    .post(tripsController.tripsAddTrip);

// Route for fetching a single trip by code
router.route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(tripsController.tripsUpdateTrip);

module.exports = router;