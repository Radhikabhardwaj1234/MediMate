import React from "react";
import Navbar from "../components/Navbar";

const Emergency = () => {
  const contact = {
    name: "Dr. Riya Mehta",
    relationship: "Family Doctor",
    phone: "+91 9876543210",
    email: "riya.mehta@example.com",
    location: "Ludhiana, Punjab"
  };

  const handleCall = () => {
    window.location.href = `tel:${contact.phone}`;
  };

  const handleMail = () => {
    window.location.href = `mailto:${contact.email}`;
  };

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card card-custom p-4 shadow border-0 text-center">
              <i className="bi bi-exclamation-triangle-fill text-danger display-5 mb-3"></i>
              <h3 className="text-danger fw-bold">Emergency Contact</h3>
              <p className="text-muted mb-4">You can immediately call or email your emergency contact below:</p>

              <div className="bg-light rounded p-3 mb-4 text-start">
                <p className="mb-1"><strong>Name:</strong> {contact.name}</p>
                <p className="mb-1"><strong>Relationship:</strong> {contact.relationship}</p>
                <p className="mb-1"><strong>Phone:</strong> {contact.phone}</p>
                <p className="mb-1"><strong>Email:</strong> {contact.email}</p>
                <p className="mb-1"><strong>Location:</strong> {contact.location}</p>
              </div>

              <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                <button onClick={handleCall} className="btn btn-danger btn-rounded px-4">
                  <i className="bi bi-telephone-fill me-2"></i> Call Now
                </button>
                <button onClick={handleMail} className="btn btn-outline-danger btn-rounded px-4">
                  <i className="bi bi-envelope-fill me-2"></i> Email Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Emergency;
