// API Base URL
const API_BASE_URL = "http://localhost:5000/api";

// Login Form Submission
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem("token", data.token); // Save token to localStorage
            alert("Login successful!");
            window.location.href = "loan-form.html"; // Redirect to loan form
        } else {
            alert(data.message || "Login failed");
        }
    } catch (err) {
        console.error("Error:", err);
        alert("An error occurred. Please try again.");
    }
});

// Loan Form Submission
document.getElementById("loanForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const amount = document.getElementById("amount").value;
    const purpose = document.getElementById("purpose").value;
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login first.");
        window.location.href = "index.html";
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/loans`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": token, // Include JWT token in headers
            },
            body: JSON.stringify({ amount, purpose }),
        });

        const data = await response.json();
        if (response.ok) {
            alert("Loan application submitted successfully!");
            document.getElementById("loanForm").reset();
        } else {
            alert(data.message || "Loan submission failed");
        }
    } catch (err) {
        console.error("Error:", err);
        alert("An error occurred. Please try again.");
    }
});