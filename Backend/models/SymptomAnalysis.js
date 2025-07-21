// @created on  4-7-25

const mongoose = require("mongoose");

const SymptomAnalysisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  symptomsText: {
    type: String,
    required: true
  },

  aiResponse: {
    condition: { type: String },         
    whatToDo: { type: String },    
    temporaryMedicineSuggestion: { type: String },
    kindOfDoctor: { type: String },
    isEmergency: { type: String },
  },

  analyzedAt: {
    type: Date,
    default: Date.now
  }
}, 
{ timestamps: true });


module.exports = mongoose.model("SymptomAnalysis", SymptomAnalysisSchema);
