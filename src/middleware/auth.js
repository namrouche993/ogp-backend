const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../config/logger');

const protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    logger.warn(`Unauthorized access attempt from IP: ${req.ip}`);
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from token
    req.user = await User.findById(decoded.id).select('-password');
    
    if (!req.user) {
      logger.warn(`Token valid but user not found: ${decoded.id}`);
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    if (!req.user.isActive) {
      logger.warn(`Inactive user attempted access: ${req.user.username}`);
      return res.status(403).json({
        success: false,
        message: 'Account is inactive'
      });
    }

    next();
  } catch (error) {
    logger.error('Token verification error:', error);
    return res.status(401).json({
      success: false,
      message: 'Token is invalid or expired'
    });
  }
};

module.exports = { protect };