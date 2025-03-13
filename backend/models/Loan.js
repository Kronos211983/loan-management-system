const mongoose = require("mongoose");

// Define the Loan schema
const LoanSchema = new mongoose.Schema(
    {
        // Reference to the user who created the loan
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Reference to the User model
            required: true,
        },
        // Loan amount (required)
        amount: {
            type: Number,
            required: true,
        },
        // Purpose of the loan (required)
        purpose: {
            type: String,
            required: true,
        },
        // Status of the loan (default: "Pending")
        status: {
            type: String,
            enum: ["Pending", "Approved", "Rejected"], // Allowed values
            default: "Pending",
        },
        // Timestamp for when the loan was created
        createdAt: {
            type: Date,
            default: Date.now,
        },
        // Timestamp for when the loan was last updated
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        // Enable automatic timestamps for createdAt and updatedAt
        timestamps: true,
    }
);

// Create the Loan model
const Loan = mongoose.model("Loan", LoanSchema);

// Export the Loan model
module.exports = Loan;