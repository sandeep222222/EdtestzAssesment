const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create(username, hashedPassword); 
    res.status(201).send('User created successfully');
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(400).send('Username is already taken or invalid input');
  }
});

router.post('/signin', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send('Invalid credentials');
    }
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error('Error signing in:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;