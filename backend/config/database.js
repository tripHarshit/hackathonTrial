const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('MONGODB_URI is not defined in environment variables');
      console.log('Please set up your MongoDB connection string in the .env file');
      console.log('You can use MongoDB Atlas (free) or install MongoDB locally');
      process.exit(1);
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    console.log('Please check your MongoDB connection string in the .env file');
    process.exit(1);
  }
};

module.exports = connectDB;
