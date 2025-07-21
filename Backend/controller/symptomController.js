

// @created on  4-7-25

const SymptomAnalysis = require("../models/SymptomAnalysis");
const {analyzeAI} = require("../API/gemini");

const analyzeSymptoms = async (req, res) => {
  try {
    const { symptomsText } = req.body;
    // const userId = req.userId; // Comes from JWT middleware

    if (!symptomsText) {
      return res.status(400).json({ message: "Symptoms are required." });
    }

    // Simulate AI response for now/
    const arr = await analyzeAI(symptomsText);
    console.log(arr[0]);
    const aiResponse = (arr[0]);

    // If AI is ready, replace with actual Gemini call
    // const aiResponse = await callGemini(symptomsText);

    // const analysis = new SymptomAnalysis({
    //   userId:userId,
    //   symptomsText,
    //   aiResponse
    // });

    // await analysis.save();

    res.status(200).json({
      message: "Symptom analysis complete.",
      result: aiResponse
    });

  } catch (error) {
    console.error("Symptom analysis error:", error);
    res.status(500).json({ message: "Server error during analysis." });
  }
};



module.exports = { analyzeSymptoms };


