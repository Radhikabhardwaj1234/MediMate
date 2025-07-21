import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SymptomChecker from "./pages/SymptomChecker";
import Reminders from "./pages/Reminders";
import Reports from "./pages/Reports";
import Clinics from "./pages/Clinics";
import Emergency from "./pages/Emergency";
import MedicineLookup from "./pages/MedicineLookup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/symptoms" element={<SymptomChecker />} />
        <Route path="/reminders" element={<Reminders />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/clinics" element={<Clinics />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/medicines" element={<MedicineLookup />} />
      </Routes>
    </Router>
  );
}

export default App;
