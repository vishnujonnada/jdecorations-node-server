const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config');
const authMiddleware = require('../middleware/authMiddleware');


const router = express.Router();

router.post('/signup', async (req, res) => {
  const { name, mobile, password } = req.body;
  try {
    const user = new User({ name, mobile, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { mobile, password } = req.body;
  try {
    const user = await User.findOne({ mobile });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ error: 'Invalid mobile or password' });
    }
    const token = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Profile route
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
