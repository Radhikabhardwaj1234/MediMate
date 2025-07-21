// @created on  4-7-25
const express = require("express");
const router = express.Router();
const { analyzeSymptoms } = require("../controller/symptomController");
const protect = require("../middleware/authMiddleware");

// @route   POST /api/symptoms/analyze
router.post("/analyze",protect, analyzeSymptoms);

module.exports = router;
