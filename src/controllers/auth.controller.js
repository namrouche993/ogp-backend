const User = require('../models/User');
const jwt = require('jsonwebtoken');
const logger = require('../config/logger');

// Generate Access Token (15 minutes)
const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '15m'
  });
};

// Generate Refresh Token (7 days)
const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Veuillez fournir un nom d\'utilisateur et un mot de passe'
      });
    }

    const user = await User.findOne({ username }).select('+password');

    if (!user) {
      logger.warn(`Failed login attempt for username: ${username} from IP: ${req.ip}`);
      return res.status(401).json({
        success: false,
        message: 'Identifiants invalides'
      });
    }

    if (!user.isActive) {
      logger.warn(`Login attempt for inactive account: ${username}`);
      return res.status(403).json({
        success: false,
        message: 'Compte inactif'
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      logger.warn(`Failed login attempt for username: ${username} from IP: ${req.ip}`);
      return res.status(401).json({
        success: false,
        message: 'Identifiants invalides'
      });
    }

    // Update last login
    user.lastLogin = Date.now();
    await user.save();

    // Generate tokens (NO DATABASE STORAGE)
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    logger.info(`User logged in: ${username} (${user.role})`);

    res.status(200).json({
      success: true,
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Refresh access token
// @route   POST /api/auth/refresh
// @access  Public
exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token manquant'
      });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET);

    // Check if user still exists and is active
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Utilisateur introuvable'
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Compte inactif'
      });
    }

    // Generate new access token
    const newAccessToken = generateAccessToken(user._id);

    logger.info(`Access token refreshed for user: ${user.username}`);

    res.status(200).json({
      success: true,
      accessToken: newAccessToken
    });
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Refresh token invalide ou expiré'
      });
    }
    next(error);
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
exports.logout = async (req, res, next) => {
  try {
    // With stateless tokens, just return success
    // Frontend will remove tokens from localStorage
    logger.info(`User logged out: ${req.user.username}`);

    res.status(200).json({
      success: true,
      message: 'Déconnecté avec succès'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create user (admin only)
// @route   POST /api/auth/users
// @access  Private/Admin
exports.createUser = async (req, res, next) => {
  try {
    const { username, password, role } = req.body;

    const user = await User.create({
      username,
      password,
      role,
      createdBy: req.user.id
    });

    logger.info(`New user created: ${username} (${role}) by ${req.user.username}`);

    res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};