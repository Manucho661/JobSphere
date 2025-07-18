const express = require('express');
const router = express.Router(); // This line is missing in your code
const { Job } = require('../models');
const {Employer} = require('../models');
const db = require("../db"); 
const { authenticateUser, authorizeEmployer } = require('../middleware/authMiddleware');


router.use((req, res, next) => {
  console.log("Middleware log - Incoming request:", req.method, req.url);
  next();
});

// 🔒 Employers only - Create Job
router.post("/", async (req, res) => {
    console.log("🔥 POST / route triggered")
    console.log("Received Request Body:", req.body); // 🛠 Log input data

    // ✅ Ensure employerId is included
    const { title, description, salary, location, employerId } = req.body;

     if (!title || !description || !salary || !location || !employerId) {
         return res.status(400).json({ 
        message: "All fields are required",
        receivedBody: req.body // send back what was received
      });
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

// Public - Get All Jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.findAll({
      include: [
        {
          model: Employer,
          as: 'employer',
          attributes: ['companyName', 'companyDescription'], // Only what you need
          required: true // Optional: ensures only jobs with employers are fetched
        }
      ]

    });
    // console.dir(jobs, { depth: null }); // This logs deeply nested employer info
     res.json(jobs);
    
  } catch (err) {
    console.error("Error fetching jobs:", err);  // Logs the error
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
});

// 🔒 Employers only - Update Job
router.put('/:id', authenticateUser, authorizeEmployer, async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });

    if (job.employer_id !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized: You can only update your own jobs' });
    }

    await job.update(req.body);
    res.json({ message: 'Job updated successfully', job });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 🔒 Employers only - Delete Job
router.delete('/:id', authenticateUser, authorizeEmployer, async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });

    if (job.employer_id !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized: You can only delete your own jobs' });
    }

    await job.destroy();
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
