import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Dashboard = () => {
  let user = ""; // Replace with real user name if needed
  
  let stored = localStorage.getItem("medimateUser");
  if (stored) {
    const parsed = JSON.parse(stored);
    if (parsed?.name) user = parsed.name;
  }
  
  const features = [
    {
      title: "Symptom Checker",
      icon: "bi-thermometer-half",
      text: "Analyze your symptoms with AI support.",
      btnText: "Check Symptoms",
      color: "danger",
       route: "/symptoms",
    },
    {
      title: "Medicine Reminders",
      icon: "bi-alarm",
      text: "Manage your daily medicine alerts.",
      btnText: "View Reminders",
      color: "success",
      route: "/reminders"
    },
    {
      title: "Medical Reports",
      icon: "bi-file-earmark-medical-fill",
      text: "Upload and view your health reports.",
      btnText: "Upload Reports",
      color: "info",
       route: "/reports"
    },
    {
      title: "Nearby Clinics",
      icon: "bi-geo-alt-fill",
      text: "Find hospitals and pharmacies nearby.",
      btnText: "Find Clinics",
      color: "primary",
      route: "/clinics"
    },
    {
      title: "Emergency Contact",
      icon: "bi-phone-fill",
      text: "Quickly alert your emergency contacts.",
      btnText: "Emergency Help",
      color: "warning",
      route: "/emergency"
    },
    {
    title: "Medicine Lookup",
    icon: "bi-capsule-pill",
    text: "Search and learn about medicines with detailed info.",
    btnText: "Search Medicines",
    color: "secondary",
     route: "/medicines"
    },

  ];

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <h3 className="text-medimate fw-semibold mb-4">Welcome, {user} </h3>

        <div className="row g-4">
          {features.map((feature, index) => (
            <div className="col-md-4" key={index}>
              <div className="card card-custom text-center p-4 border-0 h-100">
                <i className={`bi ${feature.icon} display-4 text-${feature.color} mb-3`}></i>
                <h5 className={`text-${feature.color} fw-bold`}>{feature.title}</h5>
                <p className="text-muted small">{feature.text}</p>
                <Link to={feature.route} className={`btn btn-outline-${feature.color} btn-rounded w-100`}>
                    {feature.btnText}
                </Link>

              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
