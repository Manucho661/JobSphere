
import { useState, useEffect } from "react";
import apiClient from "../api/apiClient";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const JobSeekerSignUp = () => {
      const API_URL = import.meta.env.VITE_API_URL;


    const navigate = useNavigate(); // ✅ initialize navigate here
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
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
            const res = await apiClient.post(`${API_URL}/register`, formData); // POST → Laravel
            alert(res.data.message || "User saved!");
            setFormData(/* reset fields */);
            navigate("/login");
        }
        catch (error) {
            console.error(error.response?.data || error.message);
            alert("Error submitting form");
        }

    }
    const togglePassword = () => {
        // Optional password toggle logic (you can implement this later)

    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-white mb-1"
                    >
                        <i className="fas fa-user mr-2"></i> Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Full Name"
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                </div>

                {/* Email */}
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-white mb-1"
                    >
                        <i className="fas fa-envelope mr-2"></i> Email
                    </label>
                    <input
                        type="email"
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
                            placeholder="Create a password"
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

                {/* Confirm Password */}
                <div>
                    <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-white mb-1"
                    >
                        <i className="fas fa-lock mr-2"></i> Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        required
                        className="w-full px-3 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-yellow-400 text-gray-900 font-bold py-2 rounded-lg hover:bg-yellow-500 transition"
                >
                    Create Account
                </button>

                {/* Already have an account */}
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

export default JobSeekerSignUp;
