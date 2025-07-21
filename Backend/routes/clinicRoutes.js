const express = require("express");
const router = express.Router();
const { findNearbyClinics } = require("../controllers/clinicController");
const protect = require("../middleware/authMiddleware");

// @route   POST /api/clinics/nearby
// @desc    Find and return nearby clinics (mocked)
// @access  Private
router.post("/nearby", protect, findNearbyClinics);

module.exports = router;
