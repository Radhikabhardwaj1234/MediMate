import React, { useState  } from "react";
import { useNavigate  } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    contactNumber : ""
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (formData.password.includes(" ")) {
        setMessage("Password cannot contain spaces.");
        return;
    }
    try {
      const res = await axios.post(process.env.REACT_APP_BACKEND_URI+"/api/auth/register", formData);
      console.log(res);
      setMessage("Registration successful");
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard")
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
        <div className="card card-custom p-4 shadow border-0" style={{ maxWidth: 500, width: "100%" }}>
          <div className="text-center mb-4">
            <i className="bi bi-person-plus-fill text-primary display-6"></i>
            <h3 className="text-primary fw-bold">Create an Account</h3>
            <p className="text-muted small">Join MediMate to manage your health better</p>
          </div>

          {message && <div className="alert alert-info text-center">{message}</div>}

          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input type="text" name="name" className="form-control rounded-pill" required onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input type="email" name="email" className="form-control rounded-pill" required onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" name="password" className="form-control rounded-pill" required onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label className="form-label">Age</label>
              <input type="number" name="age" className="form-control rounded-pill" required onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label className="form-label">Contact</label>
              <input type="text" name="contactNumber" className="form-control rounded-pill" required onChange={handleChange} />
            </div>

            <div className="mb-4">
              <label className="form-label">Gender</label>
              <select className="form-select rounded-pill" name="gender" required onChange={handleChange}>
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary w-100 btn-rounded">
              <i className="bi bi-person-check-fill me-2"></i>Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
