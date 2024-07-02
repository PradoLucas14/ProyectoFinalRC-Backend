const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  guestName: {
    type: String,
    required: true,
  },
  reservationDate: {
    type: Date,
    required: true,
  },
  reservationTime: {
    type: String,
    required: true,
  },
  partySize: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
});

// Indexación para evitar reservas duplicadas en la misma fecha y hora
reservationSchema.index({ reservationDate: 1, reservationTime: 1 }, { unique: true });

module.exports = mongoose.model('Reservation', reservationSchema);
