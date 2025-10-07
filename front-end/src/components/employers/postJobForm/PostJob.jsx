import React, { useState } from "react";
import { Link } from 'react-router-dom';

const PostJob = () => {
    console.log("PostJob component rendered");

    // Step 1: Manage form state
    const [formData, setFormData] = useState({
        description: "",
        requirements: "",
    });

    // Step 2: Update state on input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>
            <div>
                <div className="col-span-12 mb-2 flex justify-between items-center m-2">
                    {/* Left section: Home */}
                    <div>
                        <h3 className="text-2xl font-semibold text-gray-800">Jobs</h3>
                    </div>

                    {/* Right section: Buttons */}
                    <div className="flex space-x-2">
                        <button
                            className="btn btn-sm"
                            style={{
                                backgroundColor: "#6c757d",
                                color: "#fff",
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                padding: "6px 12px",
                                borderRadius: "4px",
                                fontWeight: "500",
                            }}
                            title="Load Account"
                        >
                            <i className="fas fa-question-circle"></i>
                            Load Account
                        </button>

                        <button
                            className="btn btn-sm"
                            style={{
                                backgroundColor: "#6c757d",
                                color: "#fff",
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                padding: "6px 12px",
                                borderRadius: "4px",
                                fontWeight: "500",
                            }}
                            title="Help"
                        >
                            <i className="fas fa-question-circle"></i>
                            Help
                        </button>
                    </div>
                </div>
                <div>

                </div>
                <nav className="m-2 flex border-b border-gray-200">
                    <ul className="flex gap-[15px]">
                        <li>
                            <Link
                                to="/"
                                className="hover:text-yellow-600 transition duration-200"
                            >
                                Jobs
                            </Link>

                        </li>
                        <li>
                            <Link
                                to="/jobs"
                                className="hover:text-yellow-600 transition duration-200"
                            >
                                Active Jobs
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/jobs"
                                className="hover:text-yellow-600 transition duration-200"
                            >
                                Expired Jobs
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/jobs"
                                className="hover:text-yellow-600 transition duration-200"
                            >
                                Post New Job
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="m-4 bg-white rounded-2 p-8 mt-4">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                        Post a New Job
                    </h2>
                    <form action="">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Job Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                placeholder="e.g. Software Engineer"
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            {/* Company Name */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    name="company"
                                    placeholder="e.g. Crown Z Technologies"
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        placeholder="e.g. Nairobi, Kenya"
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Job Type
                                    </label>
                                    <select
                                        name="jobType"
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                                        required
                                    >
                                        <option value="">Select Type</option>
                                        <option value="Full-Time">Full-Time</option>
                                        <option value="Part-Time">Part-Time</option>
                                        <option value="Remote">Remote</option>
                                        <option value="Contract">Contract</option>
                                        <option value="Internship">Internship</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Salary Range
                                    </label>
                                    <input
                                        type="text"
                                        name="salary"
                                        placeholder="e.g. Ksh 80,000 - Ksh 120,000"
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Application Deadline
                                    </label>
                                    <input
                                        type="date"
                                        name="deadline"
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                                        required
                                    />
                                </div>
                            </div>
                            {/* Job Description */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Job Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Describe the job role and responsibilities..."
                                    rows="4"
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                                    required
                                ></textarea>
                            </div>

                            {/* Requirements */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Requirements
                                </label>
                                <textarea
                                    name="requirements"
                                    value={formData.requirements}
                                    onChange={handleChange}
                                    placeholder="List required skills, education, and experience..."
                                    rows="4"
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                                    required
                                ></textarea>
                            </div>
                            {/* Submit Button */}
                            <div className="text-end">
                                <button
                                    type="submit"
                                    className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-950 transition-all duration-200 cursor-pointer"
                                >
                                    Save Job
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default PostJob;
