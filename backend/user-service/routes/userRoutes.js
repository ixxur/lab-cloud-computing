const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();
const SALT_ROUNDS = 10;

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create the user with the hashed password
    const user = await User.create({ name, email, password: hashedPassword, role: 'user' });

    res.status(201).json({
      message: 'User created successfully',
      user: { id: user._id, email: user.email, name: user.name, role: user.role }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
      }
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }
  
      // Compare the password with the hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.SECRET_KEY, // Secret key from environment variable
        { expiresIn: '1h' } // Token expiration time
      );
  
      res.status(200).json({
        message: 'Login successful',
        token,
        user: { id: user._id, email: user.email, name: user.name, role: user.role }
      });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'An error occurred during login.' });
    }
  });

module.exports = router;
