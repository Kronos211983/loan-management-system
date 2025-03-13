const Loan = require("../models/Loan");
const User = require("../models/User");

// Create a new loan
exports.createLoan = async (req, res) => {
    const { amount, purpose } = req.body;
    const userId = req.user.id; // Extracted from JWT token

    console.log("Request body:", req.body); // Debugging
    console.log("User ID:", userId); // Debugging

    try {
        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            console.error("User not found"); // Debugging
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

        console.log("Loan created:", loan); // Debugging
        res.status(201).json({ message: "Loan created successfully", loan });
    } catch (err) {
        console.error("Error creating loan:", err); // Debugging
        res.status(500).json({ message: "Server error" });
    }
};