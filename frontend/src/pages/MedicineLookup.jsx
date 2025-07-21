import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const MedicineLookup = () => {
  const [query, setQuery] = useState("");
  const [medicineInfo, setMedicineInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMedicineInfo(null);
    setMessage("");

    try {
      // MOCK RESPONSE (replace with real API if needed)
      const mockData = {
        name: query,
        usage: "Used to relieve mild to moderate pain.",
        dosage: "500mg twice daily after meals.",
        sideEffects: ["Nausea", "Drowsiness", "Stomach upset"],
        brand: "MediCare"
      };

      // Simulate delay (mimic real fetch)
      await new Promise((res) => setTimeout(res, 1000));

      setMedicineInfo(mockData);
    } catch {
      setMessage("❌ Unable to fetch medicine details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card card-custom p-4 shadow border-0">
              <h4 className="text-secondary fw-bold mb-4">
                <i className="bi bi-capsule-pill me-2"></i>Medicine Lookup
              </h4>

              <form onSubmit={handleSearch}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control rounded-start-pill"
                    placeholder="Enter medicine name..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    required
                  />
                  <button className="btn btn-secondary rounded-end-pill" type="submit" disabled={loading}>
                    {loading ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      <>
                        <i className="bi bi-search me-1"></i>Search
                      </>
                    )}
                  </button>
                </div>
              </form>

              {message && <div className="alert alert-warning">{message}</div>}

              {medicineInfo && (
                <div className="alert alert-light border-start border-4 border-secondary mt-4 shadow-sm">
                  <h5 className="fw-semibold text-secondary">{medicineInfo.name}</h5>
                  <p><strong>Usage:</strong> {medicineInfo.usage}</p>
                  <p><strong>Dosage:</strong> {medicineInfo.dosage}</p>
                  <p><strong>Side Effects:</strong> {medicineInfo.sideEffects.join(", ")}</p>
                  <p><strong>Brand:</strong> {medicineInfo.brand}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MedicineLookup;
