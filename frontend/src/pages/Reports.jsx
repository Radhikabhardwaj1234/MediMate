import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const Reports = () => {
  const [reportTitle, setReportTitle] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [aiSummary, setAiSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    setMessage("");
    setAiSummary(null);
    setLoading(true);

    if (!file || !reportTitle) {
      setIsError(true);
      setMessage("Please enter a title and select a file.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("reportTitle", reportTitle);
    formData.append("report", file);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URI + "/api/reports/upload",
        formData,
        {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
          timeout: 120000,
        }
      );
      setIsError(false);
      setMessage("Report uploaded and analyzed successfully.");
      setAiSummary(response.data.report.aiSummary);
    } catch {
      setIsError(true);
      setMessage("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const riskVariant = (level) =>
    level === "High" ? "destructive" : level === "Medium" ? "warning" : "success";

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#0f172a] flex items-center gap-2">
            <i className="bi bi-file-earmark-medical text-[#0d6efd]" />
            Medical Reports
          </h1>
          <p className="text-[#64748b] mt-1">Upload a report and get an AI-generated plain-language summary.</p>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            {message && (
              <Alert variant={isError ? "destructive" : "success"} className="mb-4">
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleUpload} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="title">Report Title</Label>
                <Input
                  id="title"
                  placeholder="e.g. Blood Test – July 2025"
                  value={reportTitle}
                  onChange={(e) => setReportTitle(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="file">Report File (PDF, JPG, PNG)</Label>
                <Input
                  id="file"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => setFile(e.target.files[0])}
                  required
                  className="cursor-pointer"
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <><span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />Analyzing report...</>
                ) : (
                  <><i className="bi bi-cloud-arrow-up mr-2" />Upload & Analyze</>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {aiSummary && aiSummary.summary !== "NA" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge variant={riskVariant(aiSummary.riskLevel)}>
                Risk: {aiSummary.riskLevel}
              </Badge>
            </div>

            <Card>
              <CardHeader className="pb-2 bg-[#e7f1ff] rounded-t-xl">
                <CardTitle className="text-sm text-[#0d6efd] flex items-center gap-2">
                  <i className="bi bi-robot" />Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <p className="text-sm text-[#475569] leading-relaxed">{aiSummary.summary}</p>
              </CardContent>
            </Card>

            {aiSummary.keyFindings?.length > 0 && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-[#0f172a]">Key Findings</CardTitle>
                </CardHeader>
                <CardContent className="p-5 pt-0 space-y-3">
                  {aiSummary.keyFindings.map((finding, idx) => (
                    <div key={idx}>
                      {idx > 0 && <Separator className="mb-3" />}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-sm text-[#0f172a]">{finding.title}</span>
                            <Badge variant={finding.status === "Normal" ? "success" : "destructive"} className="text-xs">
                              {finding.status}
                            </Badge>
                          </div>
                          {finding.titleExplaination && (
                            <p className="text-xs text-[#94a3b8] mb-1">{finding.titleExplaination}</p>
                          )}
                          <p className="text-xs text-[#64748b]">
                            <span className="font-medium">Value:</span> {finding.value} &nbsp;
                            <span className="font-medium">Normal:</span> {finding.normalRange}
                          </p>
                          {finding.laymanExplanation && (
                            <p className="text-xs text-[#475569] mt-1">{finding.laymanExplanation}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {aiSummary.recommendations?.length > 0 && (
              <Card className="border-green-200">
                <CardHeader className="pb-2 bg-green-50 rounded-t-xl">
                  <CardTitle className="text-sm text-green-700 flex items-center gap-2">
                    <i className="bi bi-check2-circle" />Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5">
                  <ul className="space-y-2">
                    {aiSummary.recommendations.map((r, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-[#475569]">
                        <i className="bi bi-dot text-green-600 mt-0.5 shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Reports;
