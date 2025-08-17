const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { 
  signupValidation, 
  signinValidation, 
  handleValidationErrors 
} = require('../middleware/validation');
const {
  signup,
  signin,
  getMe,
  updateProfile,
  changePassword
} = require('../controllers/authController');

// Public routes
router.post('/signup', signupValidation, handleValidationErrors, signup);
router.post('/signin', signinValidation, handleValidationErrors, signin);

// Protected routes
router.get('/me', protect, getMe);
router.put('/update-profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);

module.exports = router;
