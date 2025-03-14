// routes/loanRoutes.js
const express = require('express');
const loanController = require('../controllers/loanController');
const { authenticate, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/apply', authenticate, loanController.applyForLoan);
router.get('/loans', authenticate, isAdmin, loanController.getAllLoans);

module.exports = router;