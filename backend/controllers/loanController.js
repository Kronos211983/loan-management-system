const Loan = require("../models/Loan");
const User = require("../models/User");

// @desc    Create a new loan
// @route   POST /api/loans
// @access  Private
exports.createLoan = async (req, res) => {
    const { amount, purpose } = req.body;
    const userId = req.user.id; // Extracted from JWT token

    try {
        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Create a new loan
        const loan = new Loan({
            user: userId,
            amount,
            purpose,
        });

        // Save the loan to the database
        await loan.save();

        res.status(201).json({ message: "Loan created successfully", loan });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc    Get all loans for the logged-in user
// @route   GET /api/loans
// @access  Private
exports.getLoans = async (req, res) => {
    const userId = req.user.id; // Extracted from JWT token

    try {
        // Find all loans for the user
        const loans = await Loan.find({ user: userId });
        res.json(loans);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc    Get a single loan by ID
// @route   GET /api/loans/:id
// @access  Private
exports.getLoanById = async (req, res) => {
    const loanId = req.params.id;
    const userId = req.user.id; // Extracted from JWT token

    try {
        // Find the loan by ID and ensure it belongs to the user
        const loan = await Loan.findOne({ _id: loanId, user: userId });
        if (!loan) {
            return res.status(404).json({ message: "Loan not found" });
        }

        res.json(loan);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc    Update a loan
// @route   PUT /api/loans/:id
// @access  Private
exports.updateLoan = async (req, res) => {
    const loanId = req.params.id;
    const userId = req.user.id; // Extracted from JWT token
    const { amount, purpose } = req.body;

    try {
        // Find the loan by ID and ensure it belongs to the user
        let loan = await Loan.findOne({ _id: loanId, user: userId });
        if (!loan) {
            return res.status(404).json({ message: "Loan not found" });
        }

        // Update the loan
        loan.amount = amount || loan.amount;
        loan.purpose = purpose || loan.purpose;

        // Save the updated loan
        await loan.save();

        res.json({ message: "Loan updated successfully", loan });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc    Delete a loan
// @route   DELETE /api/loans/:id
// @access  Private
exports.deleteLoan = async (req, res) => {
    const loanId = req.params.id;
    const userId = req.user.id; // Extracted from JWT token

    try {
        // Find the loan by ID and ensure it belongs to the user
        const loan = await Loan.findOne({ _id: loanId, user: userId });
        if (!loan) {
            return res.status(404).json({ message: "Loan not found" });
        }

        // Delete the loan
        await loan.remove();

        res.json({ message: "Loan deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};