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
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
  {/* Left Side */}
  <div className="hidden md:block bg-gray-800"></div>

  {/* Right Side */}
  <div className="flex items-center justify-center bg-gray-900 p-6">
    <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
      <p className="text-white">yoyo</p>

      {/* Logo */}
      <div className="flex justify-center mb-4">
        <img
          src="logosp.jpg"
          alt="JengoPay Logo"
          className="w-20 h-20 object-contain"
        />
      </div>

      {/* Welcome Title */}
      <h2 className="text-2xl font-bold italic text-white mb-6">
        Welcome back to Job
        <span className="text-yellow-400">Sphere</span>
      </h2>

      {/* Form */}
      <form method="POST" action="#" className="space-y-4">
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

      {/* Separator */}
      <div className="flex items-center my-6">
        <hr className="flex-grow border-gray-600" />
        <span className="px-3 text-gray-400">Or</span>
        <hr className="flex-grow border-gray-600" />
      </div>

      {/* Social Login */}
      <div className="text-center space-y-3">
        <p className="text-white">Sign in with:</p>
        <div className="flex justify-center space-x-3">
          <button className="flex items-center space-x-2 bg-blue-600 px-4 py-2 rounded-lg text-white hover:bg-blue-700">
            <i className="fab fa-facebook-f"></i>
            <span>Facebook</span>
          </button>
          <button className="flex items-center space-x-2 bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600">
            <i className="fab fa-google"></i>
            <span>Google</span>
          </button>
          <button className="flex items-center space-x-2 bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600">
            <i className="fab fa-linkedin-in"></i>
            <span>LinkedIn</span>
          </button>
        </div>
      </div>

      {/* Signup */}
      <div className="mt-6 text-center text-white">
        Don’t have an account?{" "}
        <a href="#" className="text-yellow-400 hover:underline">
          Sign Up
        </a>
      </div>
    </div>
  </div>
</div>

  );
};

export default Login;
