import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/apiClient"; // <-- Optional if you're using Axios
import './login.css';

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Replace with your API call
      // const response = await api.post("/auth/login", form);
      // localStorage.setItem("token", response.data.token);
      // navigate("/employer/dashboard");

      console.log("Logging in with:", form);
      navigate("/employer/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="container-fluid login_container">
      <div className="login left-side">

      </div>
      <div className="login right-side">
        <div className="login-box">
          <p className="text-white">yoyo</p>
          <div className="logo-container login">
            <img src="logosp.jpg" alt="JengoPay Logo" className="logo-img login" />
          </div>
          <div style={{
            fontSize: '22px',
            fontWeight: 'bold',
            fontStyle: 'italic',
            color: '#FFC107',
            letterSpacing: '1px'
            }}>
            <h2 className="text-white">Welcome back to Job<span style={{ color: '#FFC107' }}>Sphere</span></h2>
            <form method="POST" action="#">
              <div className="form-group login">
                <label className="label login text-white" htmlFor="email">
                  <i className="fas fa-envelope"></i> Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-group login password-wrapper">
                <label className="label login text-white" htmlFor="password">
                  <i className="fas fa-lock"></i> Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <span className="toggle-password" onclick="togglePassword()">👁</span>
              <div className="forgot">
                <a href="#">Forgot password?</a>
              </div>
              <input type="submit" value="Sign In" />
            </form>
            <div className="center-separator">Or</div>
            <div className="social-login">
              <p className="social-text text-white">Sign in with:</p>
              <div className="social-buttons">
                <button className="social-btn facebook">
                  <i className="fab fa-facebook-f"></i> Facebook
                </button>
                <button className="social-btn google">
                  <i className="fab fa-google"></i> Google
                </button>
                <button className="social-btn linkedin">
                  <i className="fab fa-linkedin-in"></i> LinkedIn
                </button>
              </div>
              <div className="signup text-white">
                Don’t have an account? <a href="#" className="text-warning">Sign Up</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Login;
