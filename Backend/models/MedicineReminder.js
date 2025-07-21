// @created on 9-7-25
const mongoose = require("mongoose");

const MedicineReminderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  medicineName: {
    type: String,
    required: true
  },

  dosage: {
    type: String,
    required: true
  },

  instructions: {
    type: String
  },


  times: {
    type: String, // e.g., ["08:00"]
    required: true
  },

  startDate: {
    type: Date,
    required: true
  },

  endDate: {
    type: Date,
    required: true
  },

  reminderType: {
    type: String,
    enum: ["Email", "Notification"],
    default: "Notification"
  },

  isActive: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

module.exports = mongoose.model("MedicineReminder", MedicineReminderSchema);
