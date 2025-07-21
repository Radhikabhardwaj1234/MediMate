const mongoose = require("mongoose");

// Main User schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true
  },

  age: Number,

  gender: {
    type: String,
    enum: ["Male", "Female", "Other"]
  },

  contactNumber: String ,

    notificationPreferences: {
    email: { type: Boolean, default: true },
    sms: { type: Boolean, default: false }
  }
}, 
{ timestamps: true }); // Automatically adds createdAt and updatedAt

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
