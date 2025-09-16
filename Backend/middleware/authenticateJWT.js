
const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  console.log("In authenticateJWT middleware------------------->");
  const authHeader = req.headers.authorization;
  console.log("header", req.headers);
  console.log('Auth Header:', authHeader);
  


  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: 'Authorization token missing or invalid' });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Make sure the token contains user id
    if (!decoded.id) {
      return res.status(401).json({ message: 'Token does not contain user id' });
    }
    req.user = decoded; // decoded should have { id, email, ... }
    next();
  } catch (error) {
    console.error('JWT Error:', error.message);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticateJWT;
