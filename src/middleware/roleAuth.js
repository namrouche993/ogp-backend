const logger = require('../config/logger');

// Middleware to check if user has required role
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      logger.error('authorize middleware called before auth middleware');
      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      });
    }

    if (!roles.includes(req.user.role)) {
      logger.warn(`User ${req.user.username} (${req.user.role}) attempted to access ${req.originalUrl} requiring roles: ${roles.join(', ')}`);
      return res.status(403).json({
        success: false,
        message: `Role '${req.user.role}' is not authorized to access this resource`
      });
    }

    next();
  };
};

module.exports = { authorize };