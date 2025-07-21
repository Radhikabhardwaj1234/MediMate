const express = require("express");
const router = express.Router();
const { uploadMedicalReport, getMyReports } = require("../controller/reportController");
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// @route   POST /api/reports/upload
router.post("/upload", protect, upload.single("report"), uploadMedicalReport);

// @route   GET /api/reports/history
// @desc    Get all reports uploaded by the logged-in user
// @access  Private
router.get("/history", protect, getMyReports);

module.exports = router;
