import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./auth/AuthContext"; // Correct import path
import './login.css';
import { Link } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext); // Get login function from context
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(formData.email, formData.password);
      const user = response.user; // get user directly from backend response

      if (user.role === "employer") {
        navigate("/employer/dashboard");
      } else {
        navigate("/");
      }

    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      setError("Invalid email or password."); // Set error message for display
    }
  };

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
            value={formData.email} // Bind the value of the input to formData
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
              value={formData.password} // Bind the value of the input to formData
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full px-3 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <span
              className="absolute right-3 top-2 cursor-pointer text-gray-400"
              onClick={() => togglePassword()} // Make sure togglePassword is defined
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

        {/* Display error message */}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </form>

      {/* Signup */}
      <div className="mt-6 text-center text-white">
        <p>
          Don’t have an account?{" "}
          Sign up
          <br></br>
          <Link to="/register" className="text-yellow-400 hover:underline">
            1. As an Employer or
          </Link>
          <br />
          <Link to="/job-seeker-sign-up" className="text-yellow-400 hover:underline">
            2. As a Job seeker
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
