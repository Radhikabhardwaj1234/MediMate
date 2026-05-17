import React from "react";
import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const EMERGENCY_NUMBERS = [
  { label: "Ambulance", number: "102", icon: "bi-heart-pulse", color: "#dc2626" },
  { label: "Police", number: "100", icon: "bi-shield", color: "#0d6efd" },
  { label: "Fire", number: "101", icon: "bi-fire", color: "#ea580c" },
  { label: "Disaster", number: "108", icon: "bi-exclamation-octagon", color: "#7c3aed" },
];

const FIRST_AID = [
  { step: "Stay calm and assess the situation before acting.", icon: "bi-1-circle" },
  { step: "Call emergency services immediately if life is at risk.", icon: "bi-2-circle" },
  { step: "Do not move an injured person unless there is immediate danger.", icon: "bi-3-circle" },
  { step: "Apply pressure to wounds using a clean cloth to control bleeding.", icon: "bi-4-circle" },
  { step: "If unconscious and not breathing, begin CPR if trained.", icon: "bi-5-circle" },
  { step: "Keep the person warm and still until help arrives.", icon: "bi-6-circle" },
];

const contact = {
  name: "Dr. Riya Mehta",
  relationship: "Family Doctor",
  phone: "+91 9876543210",
  email: "riya.mehta@example.com",
  location: "Ludhiana, Punjab",
};

const Emergency = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#0f172a] flex items-center gap-2">
            <i className="bi bi-exclamation-triangle text-red-500" />
            Emergency Information
          </h1>
          <p className="text-[#64748b] mt-1">Quick access to emergency numbers and first-aid guidance.</p>
        </div>

        {/* Emergency numbers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {EMERGENCY_NUMBERS.map(({ label, number, icon, color }) => (
            <a key={label} href={`tel:${number}`} className="no-underline">
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `${color}18` }}>
                    <i className={`bi ${icon} text-xl`} style={{ color }} />
                  </div>
                  <div>
                    <p className="font-extrabold text-xl text-[#0f172a]">{number}</p>
                    <p className="text-xs text-[#64748b]">{label}</p>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        {/* Emergency contact */}
        <Card className="mb-6 border-red-200">
          <CardContent className="p-6">
            <h2 className="font-bold text-[#0f172a] mb-4 flex items-center gap-2">
              <i className="bi bi-person-badge text-red-500" />Emergency Contact
            </h2>
            <div className="space-y-2 text-sm text-[#475569] mb-5">
              {[
                { label: "Name", value: contact.name, icon: "bi-person" },
                { label: "Relationship", value: contact.relationship, icon: "bi-people" },
                { label: "Phone", value: contact.phone, icon: "bi-telephone" },
                { label: "Email", value: contact.email, icon: "bi-envelope" },
                { label: "Location", value: contact.location, icon: "bi-geo-alt" },
              ].map(({ label, value, icon }) => (
                <div key={label} className="flex items-center gap-2">
                  <i className={`bi ${icon} text-[#0d6efd] w-4`} />
                  <span className="font-medium text-[#0f172a]">{label}:</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3 flex-wrap">
              <Button onClick={() => (window.location.href = `tel:${contact.phone}`)} variant="destructive">
                <i className="bi bi-telephone-fill mr-2" />Call Now
              </Button>
              <Button onClick={() => (window.location.href = `mailto:${contact.email}`)} variant="outline">
                <i className="bi bi-envelope-fill mr-2" />Send Email
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* First aid steps */}
        <Card>
          <CardContent className="p-6">
            <h2 className="font-bold text-[#0f172a] mb-4 flex items-center gap-2">
              <i className="bi bi-bandaid text-[#0d6efd]" />First Aid — Basic Steps
            </h2>
            <div className="space-y-3">
              {FIRST_AID.map(({ step, icon }, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <i className={`bi ${icon} text-[#0d6efd] text-lg shrink-0 mt-0.5`} />
                  <p className="text-sm text-[#475569]">{step}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Emergency;
