const express = require("express");
const router = express.Router();
const loanController = require("../controllers/loanController");
const authMiddleware = require("../middleware/authMiddleware");

// Apply authentication middleware to all loan routes
router.use(authMiddleware);

// POST /api/loans - Create a new loan
router.post("/", loanController.createLoan);

// GET /api/loans - Get all loans for the logged-in user
router.get("/", loanController.getLoans);

// GET /api/loans/:id - Get a single loan by ID
router.get("/:id", loanController.getLoanById);

// PUT /api/loans/:id - Update a loan
router.put("/:id", loanController.updateLoan);

// DELETE /api/loans/:id - Delete a loan
router.delete("/:id", loanController.deleteLoan);

module.exports = router;