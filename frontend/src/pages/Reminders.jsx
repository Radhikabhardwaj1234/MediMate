import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Reminders = () => {
  const [form, setForm] = useState({
    medicineName: "",
    dosage: "",
    instructions : "",
    times: "",
    startDate : "",
    endDate : "",
    reminderType : ""

  });
  const [reminders, setReminders] = useState([]);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  // Fetch reminders on load
  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_BACKEND_URI + "/api/reminders", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReminders(res.data.reminders);
    } catch {
      setMessage("Failed to load reminders.");
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setMessage("");
    const { startDate, endDate } = form;
    if (new Date(startDate) >= new Date(endDate)) {
    setMessage(" End date must be after Start date and cannot be the same.");
    return;
  }

    try {
      const res = await axios.post(process.env.REACT_APP_BACKEND_URI + "/api/reminders", form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(res)
      setReminders([...reminders, res.data.Reminders]);
      setForm({ medicineName: "", dosage: "", time: "", instructions:"", startDate:"", endDate:"", reminderType:""});
      setMessage("✅ Reminder added successfully.");
      console.log(reminders);
    } catch {
      setMessage("❌ Failed to add reminder.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URI}/api/reminders/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setReminders(reminders.filter((r) => r._id !== id));
    } catch {
      setMessage("❌ Failed to delete reminder.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <h3 className="text-success fw-bold mb-4">
          <i className="bi bi-alarm me-2"></i>Medicine Reminders
        </h3>

        <div className="card card-custom shadow p-4 border-0 mb-4">
          {message && <div className="alert alert-info">{message}</div>}

         
        <form onSubmit={handleAdd}>
          <div className="row g-3">

            <div className="col-md-4">
              <label className="form-label fw-semibold">Medicine Name</label>
              <input
                type="text"
                className="form-control rounded-pill"
                placeholder="Enter medicine name"
                name="medicineName"
                value={form.medicineName}
                onChange={(e) => setForm({ ...form, medicineName: e.target.value })}
                required
              />
            </div>

          
            <div className="col-md-3">
              <label className="form-label fw-semibold">Dosage</label>
              <input
                type="text"
                className="form-control rounded-pill"
                placeholder="e.g. 1 tablet"
                name="dosage"
                value={form.dosage}
                onChange={(e) => setForm({ ...form, dosage: e.target.value })}
                required
              />
            </div>

        
            <div className="col-md-3">
              <label className="form-label fw-semibold">Time</label>
              <input
                type="time"
                name="times"
                className="form-control rounded-pill"
                value={form.times}
                onChange={(e) => setForm({ ...form, times: e.target.value })}
                required
              />
            </div>

          
            <div className="col-md-3">
              <label className="form-label fw-semibold">Start Date</label>
              <input
                type="date"
                name="startDate"
                className="form-control rounded-pill"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                required
              />
            </div>

            <div className="col-md-3">
              <label className="form-label fw-semibold">End Date</label>
              <input
                type="date"
                name="endDate"
                className="form-control rounded-pill"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                required
              />
            </div>

            
                  
                  <div className="col-md-3">
                    <label className="form-label fw-semibold">Reminder Type</label>
                    <select
                      className="form-select rounded-pill"
                      value={form.reminderType}
                      name="reminderType"
                      onChange={(e) => setForm({ ...form, reminderType: e.target.value })}
                    >
                      <option value="">Select</option>
                      <option value="Email">Email</option>
                      <option value="Notification">Notification</option>
                    </select>
                  </div>
          </div> 

          
          <div className="text-end mt-4">
            <button type="submit" className="btn btn-success btn-rounded px-4">
              <i className="bi bi-plus-circle me-2"></i>Add Reminder
            </button>
          </div>
        </form>        
        </div>

        <div className="row">
          {reminders.map((reminder) => (
            <div className="col-md-6 col-lg-4" key={reminder._id}>
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                  <h5 className="text-success fw-bold">
                    <i className="bi bi-capsule me-2"></i>{reminder.medicineName}
                  </h5>
                  <p className="mb-1"><strong>Dosage:</strong> {reminder.dosage}</p>
                  <p className="mb-1"><strong>Time:</strong> {reminder.times}</p>
                  <div className="text-end">
                    <button
                      className="btn btn-sm btn-outline-danger rounded-pill"
                      onClick={() => handleDelete(reminder._id)}
                    >
                      <i className="bi bi-trash3"></i> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Reminders;
