const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2");
const dotenv = require("dotenv");


dotenv.config();
const router = express.Router();

// 🔹 Connect to MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "jobsphere", // Make sure the database exists
});

// 🔹 User Registration (Signup)
router.post("/register", async (req, res) => {
  console.log("Received request headers:", req.headers);
  console.log("Received request body:", req.body); 
  
  const { username, email, password } = req.body;

  // ✅ Check if all fields are provided
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if user exists
  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    try {
      // ✅ Ensure password is defined before hashing
      const hashedPassword = await bcrypt.hash(password, 10);
      const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";

      db.query(sql, [username, email, hashedPassword], (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Error registering user" });
        }
        res.status(201).json({ message: "User registered successfully" });
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
});



// 🔹 User Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, user });
  });
});

// 🔹 Protected Route Example
router.get("/profile", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    db.query("SELECT * FROM users WHERE id = ?", [decoded.id], (err, results) => {
      if (err || results.length === 0) return res.status(404).json({ message: "User not found" });
      res.json({ user: results[0] });
    });
  });
});

module.exports = router;

