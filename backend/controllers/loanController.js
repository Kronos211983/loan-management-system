// controllers/loanController.js
const Loan = require('../models/Loan');

// Apply for a loan
exports.applyForLoan = async (req, res) => {
  try {
    const { amount } = req.body;
    const loan = new Loan({ userId: req.user.userId, amount });
    await loan.save();
    res.status(201).json({ message: 'Loan application submitted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all loans (for admin)
exports.getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.find().populate('userId', 'username');
    res.json(loans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};