const Reservation = require('../models/reservation');

// Controlador para crear una nueva reserva
exports.createReservation = async (req, res) => {
  try {
    const { guestName, reservationDate, reservationTime, partySize, phoneNumber } = req.body;
    
    // Verificar si ya existe una reserva para la misma fecha y hora
    const existingReservation = await Reservation.findOne({
      reservationDate,
      reservationTime,
    });

    if (existingReservation) {
      return res.status(400).json({ error: 'Ya existe una reserva para esta fecha y hora.' });
    }

    // Crear nueva reserva
    const reservation = new Reservation({
      guestName,
      reservationDate,
      reservationTime,
      partySize,
      phoneNumber,
    });
    await reservation.save();
    res.status(201).json({ message: 'Reserva creada exitosamente', reservation });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
