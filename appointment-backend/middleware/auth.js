const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(403).send('A token is required for authentication');
  }

  try {
    
    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      return res.status(403).send('Invalid authorization header format. Expected: Bearer <token>');
    }

    const token = tokenParts[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error('Token verification error:', err.message);
        return res.status(401).send('Invalid Token');
      }
      req.user = decoded; 
      next();
    });
  } catch (err) {
    console.error('Token verification error:', err.message);
    return res.status(401).send('Invalid Token');
  }
};

module.exports = verifyToken;