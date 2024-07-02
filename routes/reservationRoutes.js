const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// POST /reservations
router.post('/reservations', reservationController.createReservation);

module.exports = router;
