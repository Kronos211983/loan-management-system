const express = require("express");
const router = express.Router();
const loanController = require("../controllers/loanController");
const authMiddleware = require("../middleware/authMiddleware");

// Apply authentication middleware to all loan routes
router.use(authMiddleware);

// @route   POST /api/loans
// @desc    Create a new loan
// @access  Private
router.post("/", loanController.createLoan);

// @route   GET /api/loans
// @desc    Get all loans for the logged-in user
// @access  Private
router.get("/", loanController.getLoans);

// @route   GET /api/loans/:id
// @desc    Get a single loan by ID
// @access  Private
router.get("/:id", loanController.getLoanById);

// @route   PUT /api/loans/:id
// @desc    Update a loan
// @access  Private
router.put("/:id", loanController.updateLoan);

// @route   DELETE /api/loans/:id
// @desc    Delete a loan
// @access  Private
router.delete("/:id", loanController.deleteLoan);

module.exports = router;