const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  let user = await User.findOne({ username });
  if (user) return res.status(400).json({ message: 'User already exists' });
  user = new User({ username, password });
  await user.save();
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, username: user.username });
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
 if (!user) {
  return res.status(400).json({ message: 'User not registered. Please register first.' });
}
if (!(await user.matchPassword(password))) {
  return res.status(400).json({ message: 'Invalid password.' });
}
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, username: user.username });
});
// Get total users count
router.get('/count', async (req, res) => {
  try {
    const User = require('../models/User'); // Only if not at the top!
    const count = await User.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user count.' });
  }
});
module.exports = router;