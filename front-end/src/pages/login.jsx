import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/apiClient"; // <-- Optional if you're using Axios
import './login.css';
import { Link } from "react-router-dom";
import apiClient from "../api/apiClient";


const Login = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate(); // ✅ initialize navigate here

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await apiClient.post(`${API_URL}/login`, formData);
      const user = res.data.user; // assuming Laravel returns user info

      // Save token or user data
      const token = res.data.token; // <- get token from response

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect based on role
      if (user.role === "employer") {
        navigate("/employer/dashboard");
      } else {
        navigate("/");
      }

      console.log(token);
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Invalid email or password.");
    }

  }
  return (

    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-white mb-1"
          >
            <i className="fas fa-envelope mr-2"></i> Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="w-full px-3 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-white mb-1"
          >
            <i className="fas fa-lock mr-2"></i> Password
          </label>
          <div className="relative">
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full px-3 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <span
              className="absolute right-3 top-2 cursor-pointer text-gray-400"
              onClick={() => togglePassword()}
            >
              👁
            </span>
          </div>
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end">
          <a href="#" className="text-sm text-yellow-400 hover:underline">
            Forgot password?
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-yellow-400 text-gray-900 font-bold py-2 rounded-lg hover:bg-yellow-500 transition"
        >
          Sign In
        </button>
      </form>

      {/* Signup */}
      <div className="mt-6 text-center text-white">
        <p>
          Don’t have an account?{" "}
          <Link to="/register" className="text-yellow-400 hover:underline"> Sign up</Link>
        </p>
      </div>
    </>
  );
};

export default Login;
