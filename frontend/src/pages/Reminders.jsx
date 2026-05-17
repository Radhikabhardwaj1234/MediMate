import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

const Reminders = () => {
  const [form, setForm] = useState({
    medicineName: "", dosage: "", instructions: "", times: "",
    startDate: "", endDate: "", reminderType: "",
  });
  const [reminders, setReminders] = useState([]);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => { fetchReminders(); }, []);

  const fetchReminders = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_BACKEND_URI + "/api/reminders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReminders(res.data.reminders);
    } catch {
      setIsError(true);
      setMessage("Failed to load reminders.");
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setMessage("");
    if (new Date(form.startDate) >= new Date(form.endDate)) {
      setIsError(true);
      setMessage("End date must be after start date.");
      return;
    }
    try {
      const res = await axios.post(import.meta.env.VITE_BACKEND_URI + "/api/reminders", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReminders([...reminders, res.data.Reminders]);
      setForm({ medicineName: "", dosage: "", instructions: "", times: "", startDate: "", endDate: "", reminderType: "" });
      setIsError(false);
      setMessage("Reminder added successfully.");
    } catch {
      setIsError(true);
      setMessage("Failed to add reminder.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URI}/api/reminders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReminders(reminders.filter((r) => r._id !== id));
    } catch {
      setIsError(true);
      setMessage("Failed to delete reminder.");
    }
  };

  const Field = ({ label, children }) => (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#0f172a] flex items-center gap-2">
            <i className="bi bi-alarm text-[#0d6efd]" />
            Medicine Reminders
          </h1>
          <p className="text-[#64748b] mt-1">Add medicines with dosages and times to get email notifications.</p>
        </div>

        <Card className="mb-8">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Add a Reminder</CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-2">
            {message && (
              <Alert variant={isError ? "destructive" : "success"} className="mb-4">
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Field label="Medicine Name">
                  <Input
                    placeholder="e.g. Paracetamol"
                    value={form.medicineName}
                    onChange={(e) => setForm({ ...form, medicineName: e.target.value })}
                    required
                  />
                </Field>
                <Field label="Dosage">
                  <Input
                    placeholder="e.g. 1 tablet"
                    value={form.dosage}
                    onChange={(e) => setForm({ ...form, dosage: e.target.value })}
                    required
                  />
                </Field>
                <Field label="Time">
                  <Input
                    type="time"
                    value={form.times}
                    onChange={(e) => setForm({ ...form, times: e.target.value })}
                    required
                  />
                </Field>
                <Field label="Start Date">
                  <Input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    required
                  />
                </Field>
                <Field label="End Date">
                  <Input
                    type="date"
                    value={form.endDate}
                    onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                    required
                  />
                </Field>
                <Field label="Reminder Type">
                  <select
                    value={form.reminderType}
                    onChange={(e) => setForm({ ...form, reminderType: e.target.value })}
                    className="flex h-10 w-full rounded-lg border border-[#e2e8f0] bg-white px-3 py-2 text-sm text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#0d6efd] focus:border-transparent"
                  >
                    <option value="">Select type</option>
                    <option value="Email">Email</option>
                    <option value="Notification">Notification</option>
                  </select>
                </Field>
              </div>
              <div className="flex justify-end">
                <Button type="submit">
                  <i className="bi bi-plus-circle mr-2" />Add Reminder
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {reminders.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-[#64748b] uppercase tracking-wider mb-3">
              Active Reminders ({reminders.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {reminders.map((r) => (
                <Card key={r._id}>
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#e7f1ff] flex items-center justify-center">
                          <i className="bi bi-capsule text-[#0d6efd] text-sm" />
                        </div>
                        <span className="font-bold text-[#0f172a] text-sm">{r.medicineName}</span>
                      </div>
                      <button
                        onClick={() => handleDelete(r._id)}
                        className="text-[#94a3b8] hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        <i className="bi bi-trash3 text-sm" />
                      </button>
                    </div>
                    <div className="space-y-1 text-sm text-[#64748b]">
                      <p><span className="font-medium text-[#0f172a]">Dosage:</span> {r.dosage}</p>
                      <p><span className="font-medium text-[#0f172a]">Time:</span> {r.times}</p>
                      {r.reminderType && (
                        <Badge variant="secondary" className="mt-2">{r.reminderType}</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {reminders.length === 0 && !message && (
          <div className="text-center py-16 text-[#94a3b8]">
            <i className="bi bi-alarm text-4xl block mb-3" />
            <p className="font-medium">No reminders yet</p>
            <p className="text-sm">Add your first medicine reminder above.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Reminders;
