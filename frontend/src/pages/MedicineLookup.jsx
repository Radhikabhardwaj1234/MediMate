import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const MedicineLookup = () => {
  const [query, setQuery] = useState("");
  const [medicineInfo, setMedicineInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMedicineInfo(null);
    setError("");

    try {
      const mockData = {
        name: query,
        usage: "Used to relieve mild to moderate pain and reduce fever.",
        dosage: "500mg twice daily after meals.",
        sideEffects: ["Nausea", "Drowsiness", "Stomach upset"],
        brand: "MediCare",
      };
      await new Promise((res) => setTimeout(res, 1000));
      setMedicineInfo(mockData);
    } catch {
      setError("Unable to fetch medicine details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#0f172a] flex items-center gap-2">
            <i className="bi bi-capsule text-[#0d6efd]" />
            Medicine Lookup
          </h1>
          <p className="text-[#64748b] mt-1">Search any medicine to see its uses, dosage, and side effects.</p>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="search">Medicine name</Label>
                <div className="flex gap-2">
                  <Input
                    id="search"
                    placeholder="e.g. Paracetamol, Aspirin..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    required
                  />
                  <Button type="submit" disabled={loading} className="shrink-0">
                    {loading ? (
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <><i className="bi bi-search mr-1" />Search</>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {medicineInfo && (
          <Card>
            <CardHeader className="pb-3 bg-[#e7f1ff] rounded-t-xl">
              <CardTitle className="flex items-center gap-2 text-[#0d6efd]">
                <i className="bi bi-capsule-pill" />
                {medicineInfo.name}
                <Badge variant="secondary" className="ml-auto">{medicineInfo.brand}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <p className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wider mb-1">Usage</p>
                <p className="text-sm text-[#475569]">{medicineInfo.usage}</p>
              </div>
              <Separator />
              <div>
                <p className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wider mb-1">Dosage</p>
                <p className="text-sm text-[#475569]">{medicineInfo.dosage}</p>
              </div>
              <Separator />
              <div>
                <p className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wider mb-2">Side Effects</p>
                <div className="flex flex-wrap gap-2">
                  {medicineInfo.sideEffects.map((effect) => (
                    <Badge key={effect} variant="outline">{effect}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default MedicineLookup;
