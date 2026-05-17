import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const FEATURES = [
  { title: "Symptom Checker", icon: "bi-activity", desc: "Analyze your symptoms with AI support.", btn: "Check Symptoms", route: "/symptoms", color: "#0d6efd" },
  { title: "Medicine Reminders", icon: "bi-alarm", desc: "Manage your daily medicine alerts.", btn: "View Reminders", route: "/reminders", color: "#16a34a" },
  { title: "Medical Reports", icon: "bi-file-earmark-medical", desc: "Upload and view your health reports.", btn: "Upload Reports", route: "/reports", color: "#0891b2" },
  { title: "Nearby Clinics", icon: "bi-geo-alt", desc: "Find hospitals and pharmacies nearby.", btn: "Find Clinics", route: "/clinics", color: "#0d6efd" },
  { title: "Emergency Info", icon: "bi-exclamation-triangle", desc: "Quick access to emergency numbers.", btn: "Emergency Help", route: "/emergency", color: "#dc2626" },
  { title: "Medicine Lookup", icon: "bi-capsule", desc: "Search and learn about medicines.", btn: "Search Medicines", route: "/medicines", color: "#7c3aed" },
];

const Dashboard = () => {
  let user = "";
  const stored = localStorage.getItem("medimateUser");
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed?.name) user = parsed.name;
    } catch {}
  }

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#0f172a]">
            Welcome back{user ? `, ${user}` : ""}
          </h1>
          <p className="text-[#64748b] mt-1">What would you like to do today?</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <Card key={f.route} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${f.color}18` }}
                >
                  <i className={`bi ${f.icon} text-xl`} style={{ color: f.color }} />
                </div>
                <h3 className="font-bold text-[#0f172a] mb-1">{f.title}</h3>
                <p className="text-sm text-[#64748b] mb-4">{f.desc}</p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to={f.route}>{f.btn}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
