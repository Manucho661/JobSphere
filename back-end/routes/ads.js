const express = require('express');
const router = express.Router();
const db = require("../db");  // Raw MySQL connection
const { Ad } = require('../models'); // Sequelize model (corrected casing)
const { authenticateUser, authorizeEmployer } = require('../middleware/authMiddleware');

// ✅ Create Ad using Sequelize
router.post('/', async (req, res) => {
  const { title, description, company, url } = req.body;

  if (!title || !description || !company || !url) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newAd = await Ad.create({ title, description, company, url });
    console.log("✅ Ad created using Sequelize:", newAd.dataValues);

    // Example: optional logging using raw db connection
    db.query("INSERT INTO ad_logs (ad_id, action) VALUES (?, ?)", [newAd.id, 'created'], (err) => {
      if (err) console.warn("Logging failed:", err.message);
    });

    res.status(201).json({ message: 'Ad created successfully!', ad: newAd });
  } catch (error) {
    console.error('Error creating ad:', error);
    res.status(500).json({ message: 'Failed to create ad.' });
  }
});

// ✅ Get all ads using Sequelize
router.get('/', async (req, res) => {
    console.log('📥 GET /ads triggered');
  try {
    const ads = await Ad.findAll({ order: [['createdAt', 'DESC']] });
    res.json(ads);
  } catch (error) {
    console.error('Error fetching ads:', error);
    res.status(500).json({ message: 'Failed to fetch ads.' });
  }
});

module.exports = router;
