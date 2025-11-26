const mongoose = require('mongoose');
const User = require('../models/User');
const logger = require('../config/logger');
require('dotenv').config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    logger.info('MongoDB Connected');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ username: 'admin' });
    
    if (existingAdmin) {
      logger.info('Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create({
      username: 'admin',
      password: 'admin123', // Change this!
      role: 'admin',
      isActive: true
    });

    logger.info(`Admin user created successfully: ${admin.username}`);
    logger.warn('⚠️  Remember to change the default admin password!');
    
    process.exit(0);
  } catch (error) {
    logger.error('Error creating admin user:', error);
    process.exit(1);
  }
};

createAdmin();