import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate  } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (password.includes(" ")) {
      setMessage("❌ Password cannot contain spaces.");
      return;
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URI}/api/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("medimateUser", JSON.stringify(res.data.user));
      setMessage("Login successful ✅");
      navigate("/dashboard");

    } catch (error) {
      console.log(process.env.REACT_APP_BACKEND_URI);
      setMessage(error.response?.data?.message || "Login failed ❌");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
        <div className="card card-custom p-4 shadow border-0" style={{ maxWidth: 400, width: "100%" }}>
          <div className="text-center mb-4">
            <i className="bi bi-person-circle text-primary display-6"></i>
            <h3 className="text-primary fw-bold">Welcome Back</h3>
            <p className="text-muted small">Login to your MediMate account</p>
          </div>

          {message && <div className="alert alert-info text-center">{message}</div>}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control rounded-pill"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control rounded-pill"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 btn-rounded">
              <i className="bi bi-box-arrow-in-right me-2"></i> Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
