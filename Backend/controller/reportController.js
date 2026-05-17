const { analyzeReportAI } = require("../API/geminiReport");
const MedicalReport = require("../models/MedicalReport");
const path = require("path");

const uploadMedicalReport = async (req, res) => {
  try {
    const userId = req.userId;
    const { reportTitle } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const fileUrl = `./uploads/${req.file.filename}`;
    const fileType = path.extname(req.file.originalname).substring(1);

    let aiResult = null;
    let status = "Processed";

    try {
      aiResult = await analyzeReportAI(fileUrl);
    } catch (aiErr) {
      console.error("AI analysis failed:", aiErr.message);
      status = "Error";
    }

    const report = await MedicalReport.create({
      userId,
      reportTitle,
      fileUrl,
      fileType,
      aiSummary: aiResult,
      status,
    });

    res.status(201).json({
      message: "Report uploaded and analyzed.",
      report,
    });

  } catch (error) {
    console.error("Upload report error:", error);
    res.status(500).json({ message: "Server error while uploading report." });
  }
};

const getMyReports = async (req, res) => {
  try {
    const userId = req.userId;
    const reports = await MedicalReport.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ message: "Reports fetched successfully.", reports });
  } catch (error) {
    console.error("Get reports error:", error);
    res.status(500).json({ message: "Server error while fetching reports." });
  }
};

module.exports = { uploadMedicalReport, getMyReports };
