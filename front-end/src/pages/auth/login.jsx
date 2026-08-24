import React, { useState, useContext } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "./AuthContext";
import { toast } from "react-toastify";
import "./login.css";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await login(
        formData.email,
        formData.password
      );

      const user = data.user;

      toast.success("Login successful");

      if (user.role === "employer") {
        navigate("/employer/dashboard");
      } else {
        navigate("/");
      }

    } catch (err) {
      console.error(err);

      const message =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";

      toast.error(message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
        <div className="loginRightSide flex items-center justify-center bg-gray-900 p-6">
          <div className="mt-10 w-full max-w-md p-6 rounded-lg shadow-lg">
            {/* Logo */}

            {/* Welcome Title */}
            <h2 className="text-2xl font-bold italic text-white mb-6">
              Welcome back to Job
              <span className="text-yellow-400">Sphere</span>
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  <i className="fas fa-envelope mr-2"></i>Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  required
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-yellow-400 disabled:opacity-60"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  <i className="fas fa-lock mr-2"></i>Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading}
                    required
                    placeholder="Enter your password"
                    className="w-full px-3 py-2 pr-10 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-yellow-400 disabled:opacity-60"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              {/* Forgot password */}
              <div className="flex justify-end">
                <a href="#" className="text-sm text-yellow-400 hover:underline">
                  Forgot password?
                </a>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex items-center justify-center gap-2 font-bold py-2 rounded-lg transition ${loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
                  }`}
              >
                {loading && (
                  <span className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></span>
                )}
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            {/* Separator */}
            <div className="flex items-center my-6">
              <hr className="flex-grow border-gray-600" />
              <span className="px-3 text-gray-400">Or</span>
              <hr className="flex-grow border-gray-600" />
            </div>

            {/* Social Login */}
            {/* Social Login */}
            <div className="text-center space-y-3">
              <p className="text-white">Sign in with:</p>
              <div className="flex justify-center">
                <button className="flex items-center justify-center space-x-2 bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600 w-full">
                  <i className="fab fa-google"></i>
                  <span>Google</span>
                </button>
              </div>
            </div>

            {/* Signup */}
            <div className="mt-6 text-center text-white">
              <p>
                Don’t have an account?
                <br />
                <Link to="/register" className="text-yellow-400 hover:underline">
                  1. As an Employer
                </Link>
                <br />
                <Link to="/job-seeker-sign-up" className="text-yellow-400 hover:underline">
                  2. As a Job Seeker
                </Link>
              </p>
            </div>
          </div>

        </div>

        {/* Left Side */}
        <div className="loginLeftSide hidden md:block"></div>
        {/* Right Side */}
      </div>

    </>
  );
};

export default Login;
