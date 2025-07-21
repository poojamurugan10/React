import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { email, password };

    try {
      const res = await axios.post("https://node-task-1-yunj.onrender.com/api/auth/login", payload);
      toast.success(res.data.message);
      setToken(res.data.token);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4">L O G I N</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="mb-3 text-end">
            <Link to="/forgot-password" className="text-decoration-none">
              Forgot password?
            </Link>
          </div>

          <div className="d-grid mb-2">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>

          <p className="text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary text-decoration-none">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
