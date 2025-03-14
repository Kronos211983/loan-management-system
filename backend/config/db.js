const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        // Log the MONGO_URI for debugging
        console.log("MONGO_URI:", process.env.MONGO_URI);

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1); // Exit the process if the connection fails
    }
};

module.exports = connectDB;