// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use the connection string from the .env file
    const MONGO_URI = process.env.MONGO_URI;

    // Log the connection string for debugging (optional)
    console.log('Connecting to MongoDB with URI:', MONGO_URI);

    // Connect to MongoDB
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;