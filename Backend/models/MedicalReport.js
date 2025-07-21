
// @created on 7-7-25

const mongoose = require("mongoose");

const MedicalReportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  reportTitle: {
    type: String,
    required: true
  },

  fileUrl: {
    type: String,
    required: true
  },

  fileType: {
    type: String, // 'pdf', 'image', etc.
    required: true
  },

  aiSummary: {
    interpretation: String,
    flaggedIssues: [String],
    recommendation: String
  },

  status: {
    type: String,
    enum: ["Pending", "Processed", "Error"],
    default: "Pending"
  },

  uploadedAt: {
    type: Date,
    default: Date.now
  }

}, { timestamps: true });

module.exports = mongoose.model("MedicalReport", MedicalReportSchema);
