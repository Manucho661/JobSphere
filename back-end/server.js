const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth.js"); // ✅ Importing routes
const jobsRoutes = require('./routes/jobs');
const adsRoutes = require('./routes/ads');



dotenv.config();
const app = express();

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use((req, res, next) => {
  console.log(`Global log: ${req.method} ${req.url}`);
  next();
});

// ✅ Middleware
app.use(cors()); 
app.use(express.json()); 
app.use('/jobs', jobsRoutes); // Use jobs routes
app.use('/ads', adsRoutes); //use ads route
// ✅ MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "jobsphere",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL");
  }
});

// ✅ Register Routes
app.use("/api/auth", authRoutes);  

// ✅ Test Route for Root URL "/"
app.get("/", (req, res) => {
  res.send("Server is running! 🎉");
});

// ✅ Start the Server
const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

module.exports = db; 