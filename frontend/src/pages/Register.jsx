import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "", email: "", password: "", age: "", gender: "", contactNumber: "",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password.includes(" ")) {
      setIsError(true);
      setMessage("Password cannot contain spaces.");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post(import.meta.env.VITE_BACKEND_URI + "/api/auth/register", formData);
      localStorage.setItem("token", res.data.token);
      setIsError(false);
      setMessage("Registration successful!");
      navigate("/dashboard");
    } catch (error) {
      setIsError(true);
      setMessage(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2 no-underline">
            <i className="bi bi-heart-pulse text-[#0d6efd] text-2xl" />
            <span className="font-extrabold text-xl text-[#0f172a]">MediMate</span>
          </Link>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Create an account</CardTitle>
            <CardDescription>Join MediMate to manage your health</CardDescription>
          </CardHeader>
          <CardContent>
            {message && (
              <Alert variant={isError ? "destructive" : "success"} className="mb-4">
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" placeholder="John Doe" required onChange={handleChange} autoComplete="name" />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email">Email address</Label>
                <Input id="email" type="email" name="email" placeholder="you@example.com" required onChange={handleChange} autoComplete="email" />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" name="password" placeholder="••••••••" required onChange={handleChange} autoComplete="new-password" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" type="number" name="age" placeholder="25" required onChange={handleChange} min="1" max="120" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="contactNumber">Contact</Label>
                  <Input id="contactNumber" name="contactNumber" placeholder="+91 98765 43210" required onChange={handleChange} autoComplete="tel" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="gender">Gender</Label>
                <select
                  id="gender"
                  name="gender"
                  required
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-lg border border-[#e2e8f0] bg-white px-3 py-2 text-sm text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#0d6efd] focus:border-transparent"
                >
                  <option value="">Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <><span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />Creating account...</>
                ) : (
                  "Create account"
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-[#64748b] mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-[#0d6efd] font-semibold no-underline hover:underline">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
