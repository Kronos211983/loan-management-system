// models/Loan.js
const mongoose = require('mongoose');

// Define the Loan schema
const loanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
    ref: 'User', // Refers to the 'User' model
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'], // Allowed values for status
    default: 'pending', // Default status is 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set to the current date and time
  },
});

// Export the Loan model
module.exports = mongoose.model('Loan', loanSchema);