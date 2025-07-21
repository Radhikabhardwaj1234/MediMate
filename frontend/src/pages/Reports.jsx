import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Reports = () => {
  const [reportTitle, setReportTitle] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [aiSummary, setAiSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    setMessage("");
    setAiSummary(null);
    setLoading(true);

    if (!file || !reportTitle) {
      setMessage("⚠ Please enter a title and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("reportTitle", reportTitle);
    formData.append("report", file);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(process.env.REACT_APP_BACKEND_URI + "/api/reports/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("✅ Report uploaded and analyzed successfully.");
      // setAiSummary(response.data.report.aiSummary);
      console(response);
    } catch (err) {
      setMessage("❌ Upload failed. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card card-custom shadow p-4 border-0">
              <h4 className="text-info fw-bold mb-4">
                <i className="bi bi-file-earmark-medical-fill me-2"></i>Upload Medical Report
              </h4>

              {message && <div className="alert alert-info">{message}</div>}

              <form onSubmit={handleUpload}>
                <div className="mb-3">
                  <label className="form-label">Report Title</label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    placeholder="e.g. Blood Test - July"
                    value={reportTitle}
                    onChange={(e) => setReportTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Choose Report File (PDF, JPG, PNG)</label>
                  <input
                    type="file"
                    className="form-control rounded"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => setFile(e.target.files[0])}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-info btn-rounded w-100">
                  <i className="bi bi-cloud-arrow-up me-2"></i>Upload & Analyze
                </button>
              </form>

              {aiSummary && (
                <div className="mt-4 alert alert-light border-start border-4 border-info shadow-sm">
                  <h6 className="fw-semibold text-info">
                    <i className="bi bi-robot me-2"></i>AI Summary:
                  </h6>
                  <ul className="mb-0">
                    <li><strong>Interpretation:</strong> {aiSummary.interpretation}</li>
                    <li><strong>Flagged Issues:</strong> {aiSummary.flaggedIssues.join(", ")}</li>
                    <li><strong>Recommendation:</strong> {aiSummary.recommendation}</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;