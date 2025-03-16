const express = require('express');
const multer = require('multer');
const { Application } = require('../models');
const router = express.Router();

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Upload Resume
router.post('/:user_id/:job_id', upload.single('resume'), async (req, res) => {
  try {
    const { user_id, job_id } = req.params;
    if (!req.file) return res.status(400).json({ error: 'Resume file required' });

    const application = await Application.create({
      user_id,
      job_id,
      resume: req.file.path
    });

    res.json({ message: 'Application submitted', application });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Applications
router.get('/', async (req, res) => {
  try {
    const applications = await Application.findAll();
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
