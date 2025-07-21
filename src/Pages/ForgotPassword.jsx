import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://node-task-1-yunj.onrender.com/api/auth/forgot-password", { email });
      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h4 className="text-center mb-4">Forgot Password</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="d-grid mb-2">
            <button type="submit" className="btn btn-primary">Send Reset Link</button>
          </div>

          <p className="text-center mt-3">
            Remember your password?{" "}
            <Link to="/login" className="text-primary text-decoration-none">
              Go to Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
