const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// List of required environment variables
const requiredEnvVars = [
    "PORT",
    "MONGO_URI",
    "JWT_SECRET",
];

// Validate required environment variables
const validateEnvVars = () => {
    const missingVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

    if (missingVars.length > 0) {
        console.error(`Missing required environment variables: ${missingVars.join(", ")}`);
        process.exit(1); // Exit the application if any required variable is missing
    }

    console.log("All required environment variables are set.");
};

module.exports = validateEnvVars;