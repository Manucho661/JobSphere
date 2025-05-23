const express = require('express');
const router = express.Router(); // This line is missing in your code
const { Job } = require('../models');
const db = require("../db"); 
const { authenticateUser, authorizeEmployer } = require('../middleware/authMiddleware');

// 🔒 Admins only - Create a Job category
router.post("/", async (req, res) => {
    console.log("Received Request Body:", req.body); // 🛠 Log input data

    // ✅ Ensure employerId is included
    const { title, description, salary, location, employerId } = req.body;

    if (!title || !description || !salary || !location || !employerId) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const sql = "INSERT INTO jobs (title, description, salary, location, employerId) VALUES (?, ?, ?, ?, ?)";
    
    // ✅ Correct order of parameters
    db.query(sql, [title, description, salary, location, employerId], (err, result) => {
        if (err) {
            console.error("Database Insert Error:", err);
            return res.status(500).json({ message: "Error creating job" });
        }
        res.status(201).json({ message: "Job created successfully", jobId: result.insertId });
    });
});


