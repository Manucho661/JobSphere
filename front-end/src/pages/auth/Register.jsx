import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import apiClient from "../../api/apiClient";

const Register = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "employer",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await apiClient.post(`${API_URL}/register`, formData);

      toast.success(res.data.message || "Account created successfully 🎉");

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "employer",
      });

      navigate("/login");
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            <i className="fas fa-user mr-2"></i>Company / Institution Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
            required
            placeholder="Full Name"
            className="w-full px-3 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-yellow-400 disabled:opacity-60"
          />
        </div>

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
              placeholder="Create a password"
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

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            <i className="fas fa-lock mr-2"></i>Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={loading}
              required
              placeholder="Confirm your password"
              className="w-full px-3 py-2 pr-10 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-yellow-400 disabled:opacity-60"
            />
            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-3 top-2 text-gray-400 hover:text-white"
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {/* Hidden role */}
        <input type="hidden" name="role" value="employer" />

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 font-bold py-2 rounded-lg transition ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
          }`}
        >
          {loading && (
            <span className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></span>
          )}
          {loading ? "Creating account..." : "Create Account"}
        </button>

        {/* Login link */}
        <p className="text-center text-sm text-white mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-400 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </>
  );
};

export default Register;
