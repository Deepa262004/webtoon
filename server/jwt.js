 // middleware/auth.js
import jwt from 'jsonwebtoken';

export const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Assuming the token is sent in the Authorization header
  if (!token) return res.status(403).send('Access denied.');

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attach user info to the request
    next();
  } catch (error) {
    res.status(400).send('Invalid token.');
  }
};
