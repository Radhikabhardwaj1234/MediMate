import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const token = localStorage.getItem("token");
      const base = process.env.REACT_APP_BACKEND_URI; // sanity check
      if (!base) {
        throw new Error("Backend URL not configured (REACT_APP_BACKEND_URI).");
      }

      const response = await axios.post(
        `${base}/api/symptoms/analyze`,
        { symptomsText: symptoms.trim() },
        {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      setResult(response.data.result || "No result.");
    } catch (error) {
      console.error("Symptom analysis error:", error);
      const msg =
        error.response?.data?.message ||
        error.message ||
        "❌ Failed to analyze symptoms.";
      setResult(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <h3 className="text-medimate fw-bold mb-4">Symptom Checker</h3>
        <form onSubmit={handleCheck}>
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Describe your symptoms
            </label>
            <textarea
              className="form-control"
              rows="4"
              name="symptomsText"
              placeholder="e.g. headache, fever, body pain..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-rounded"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Check Symptoms"}
          </button>
        </form>

        {/* {result && (
          <div className="alert alert-info mt-4">
            <strong>AI Analysis:</strong> {JSON.stringify(result)}
          </div>
        )} */}

        {result && typeof result === "object" ? (
        <>
        {result.condition === "NA" ? (
      <div className="alert alert-warning mt-4">
        <strong> Unable to understand the symptoms.</strong>
        <div>Please try rephrasing or describing your symptoms more clearly.</div>
      </div>
    ) :(
        <div
          className={`alert mt-4 ${
            result.isEmergency == "true"? "alert-danger" : "alert-info"
          }`}
        >
          <h5 className="fw-bold">
            {result.isEmergency == "true" ? "🚨 Emergency Alert:" : "AI Analysis:"}
          </h5>
          <ul className="list-unstyled">
            <li>
              <span className="fw-bold">Condition:</span>{" "}
              {result.condition || "N/A"}
            </li>
            <li>
              <span className="fw-bold">What To Do:</span>{" "}
              {result.whatToDo || "N/A"}
            </li>
            <li>
              <span className="fw-bold">Temporary Medicine Suggestion:</span>{" "}
              {result.temporaryMedicineSuggestion || "N/A"}
            </li>
            <li>
              <span className="fw-bold">Kind Of Doctor:</span>{" "}
              {result.kindOfDoctor || "N/A"}
            </li>
            <li>
              <span className="fw-bold">Is Emergency:</span>{" "}
              {result.isEmergency == "true" ? (
                <span className="text-danger fw-bold">Yes</span>
              ) : (
                "No"
              )}
            </li>
          </ul>
        </div>)}
        </>
      ) : (
        result && (
          <div className="alert alert-warning mt-4">
            <strong>{result}</strong>
          </div>
        )
      )}

      </div>
    </>
  );
};

export default SymptomChecker;
