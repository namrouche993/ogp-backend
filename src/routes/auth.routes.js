const express = require('express');
const router = express.Router();
const { 
  login, 
  refreshToken, 
  logout, 
  getMe, 
  createUser 
} = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roleAuth');
const { authLimiter } = require('../config/rateLimiter');

router.post('/login', authLimiter, login);
router.post('/refresh', refreshToken);
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);
router.post('/users', protect, authorize('admin'), createUser);

module.exports = router;