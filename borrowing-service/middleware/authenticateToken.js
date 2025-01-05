const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1]; 

  if (!token) return res.status(401).send('Access Denied');
//   console.log('Received Token:', token);
  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY); // Verify token
    req.user = verified; // Add user data to request object
    next(); // Proceed to the next middleware or route
  } catch (err) {
    console.error('JWT Verification Error:', err.message);
    res.status(400).send('Invalid Token');
  }
};

module.exports = authenticateToken;
