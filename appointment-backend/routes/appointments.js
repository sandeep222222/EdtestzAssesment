const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment');
const verifyToken = require('../middleware/auth');

router.get('/', verifyToken, async (req, res) => {
  try {
    const appointments = await Appointment.findAllByUserId(req.user.id);
    res.json(appointments);
  } catch (err) {
    res.status(500).send('Failed to fetch appointments');
  }
});

router.post('/', verifyToken, async (req, res) => {
  const { date } = req.body;
  try {
    const appointment = await Appointment.create(date, req.user.id);
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).send('Failed to create appointment');
  }
});

module.exports = router;