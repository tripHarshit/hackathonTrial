const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d' // Token expires in 30 days
  });
};

// Generate refresh token (optional, for enhanced security)
const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d' // Refresh token expires in 7 days
  });
};

// Create token and send response
const createSendToken = (user, statusCode, res) => {
  const token = generateToken(user._id);
  
  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    success: true,
    token,
    data: {
      user
    }
  });
};

module.exports = {
  generateToken,
  generateRefreshToken,
  createSendToken
};
