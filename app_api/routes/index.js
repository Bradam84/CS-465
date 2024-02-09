const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

// Route for listing all trips
router.route('/trips')
    .get(tripsController.tripsList);

// Route for fetching a single trip by code
router.route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode);

module.exports = router;