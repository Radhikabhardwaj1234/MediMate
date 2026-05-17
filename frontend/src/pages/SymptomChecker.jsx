import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheck = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const base = import.meta.env.VITE_BACKEND_URI;
      if (!base) throw new Error("Backend URL not configured.");

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
      setResult(response.data.result || null);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to analyze symptoms.");
    } finally {
      setLoading(false);
    }
  };

  const isEmergency = result?.isEmergency === "true";
  const isNA = result?.condition === "NA";

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#0f172a] flex items-center gap-2">
            <i className="bi bi-activity text-[#0d6efd]" />
            Symptom Checker
          </h1>
          <p className="text-[#64748b] mt-1">Describe your symptoms and get an AI-powered analysis.</p>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <form onSubmit={handleCheck} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="symptoms">Describe your symptoms</Label>
                <Textarea
                  id="symptoms"
                  rows={4}
                  placeholder="e.g. headache, fever, body pain for the last 2 days..."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  required
                  className="min-h-[120px]"
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                {loading ? (
                  <><span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />Analyzing...</>
                ) : (
                  <><i className="bi bi-search mr-2" />Check Symptoms</>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {result && isNA && (
          <Alert variant="warning">
            <i className="bi bi-question-circle" />
            <AlertTitle>Unable to understand symptoms</AlertTitle>
            <AlertDescription>Please try rephrasing or describing your symptoms more clearly.</AlertDescription>
          </Alert>
        )}

        {result && !isNA && typeof result === "object" && (
          <Card className={isEmergency ? "border-red-400" : ""}>
            <CardHeader className={`pb-3 rounded-t-xl ${isEmergency ? "bg-red-50" : "bg-[#e7f1ff]"}`}>
              <CardTitle className={`flex items-center gap-2 text-base ${isEmergency ? "text-red-700" : "text-[#0d6efd]"}`}>
                <i className={`bi ${isEmergency ? "bi-exclamation-triangle-fill" : "bi-robot"}`} />
                {isEmergency ? "Emergency Alert" : "AI Analysis"}
                {isEmergency && <Badge variant="destructive" className="ml-auto">Emergency</Badge>}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-3">
              {[
                { label: "Condition", value: result.condition, icon: "bi-clipboard2-pulse" },
                { label: "What To Do", value: result.whatToDo, icon: "bi-check2-circle" },
                { label: "Temporary Medicine", value: result.temporaryMedicineSuggestion, icon: "bi-capsule" },
                { label: "Type of Doctor", value: result.kindOfDoctor, icon: "bi-person-badge" },
              ].map(({ label, value, icon }) =>
                value ? (
                  <div key={label} className="flex gap-3">
                    <i className={`bi ${icon} text-[#0d6efd] mt-0.5 shrink-0`} />
                    <div>
                      <span className="font-semibold text-sm text-[#0f172a]">{label}: </span>
                      <span className="text-sm text-[#475569]">{value}</span>
                    </div>
                  </div>
                ) : null
              )}
            </CardContent>
          </Card>
        )}

        {result && typeof result === "string" && (
          <Alert variant="warning">
            <AlertDescription>{result}</AlertDescription>
          </Alert>
        )}
      </div>
    </>
  );
};

export default SymptomChecker;
