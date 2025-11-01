import React, { useState } from "react";
import { Link } from 'react-router-dom';
import apiClient from "../../api/apiClient";


const PostJob = () => {
    console.log("PostJob component rendered");
    const API_URL = import.meta.env.VITE_API_URL;

    const [showPreview, setShowPreview] = useState(false);

    // Step 1: Manage form state
    const [formData, setFormData] = useState({
        jobTitle: "",
        employmentType: "",
        category: "",
        experienceLevel: "",
        workPlace: "",
        location: "",
        salaryMin: "",
        salaryMax: "",
        hideSalary: false,
        description: '',
        responsibilities: '',
        requiredQualifications: '',
        benefits: ''
    });

    // Step 2: Update state on input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handlePreview = () => {
        setShowPreview(true);
    };

    const handleClosePreview = () => {
        setShowPreview(false);
    };
    // 
    const handleSubmit = async (e) => {
        try {
            const res = await apiClient.post(`${API_URL}/postJobs`, formData); // POST → Laravel
            alert(res.data.message || "User saved!");
            setFormData(/* reset fields */);
        } catch (err) {
            console.error(err.response?.data || err.message);
            alert("Error submitting form");
        }
    }
    return (
        <>
            <div>
                <header class="">
                    <div class="flex items-center justify-between px-8 py-4">
                        <div>
                            <h2 className="text-2xl font-bold text-primary">Post a New Job</h2>
                            <div className="flex gap-6">
                                <p className="text-gray-500 text-sm">Fill in the details below to create your job listing</p>
                                <p className="text-gray-500 text-sm">N/B All job listings are free of charge, however, If you want your Job listing to appear among the featured Jobs, <span className="underline cursor-pointer"><b>Pay KSH 1000.</b></span></p>

                            </div>
                        </div>
                        <div class="flex items-center space-x-4">
                            <button class="text-gray-600 hover:text-gray-800 text-sm font-medium mx-2">Save as Draft</button>
                            <button class="relative">
                                <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                                </svg>
                            </button>
                            <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-yellow-500 font-semibold">
                                <b>JS</b>
                            </div>
                        </div>
                    </div>
                </header>
                <div>

                </div>
                <div className="p-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-lg shadow p-6 mb-6">
                            <h3 class="text-xl font-semibold text-primary mb-6">Basic Information</h3>

                            <div class="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
                                    <input
                                        type="text"
                                        name="jobTitle"
                                        value={formData.jobTitle}
                                        onChange={handleChange}
                                        placeholder="e.g. Senior Frontend Developer"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Job Category *</label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                        >
                                            <option value="">Select a category</option>
                                            <option value="tech">Technology</option>
                                            <option value="marketing">Marketing</option>
                                            <option value="design">Design</option>
                                            <option value="sales">Sales</option>
                                            <option value="finance">Finance</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Employment Type *</label>
                                        <select
                                            name="employmentType"
                                            value={formData.employmentType}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                        >
                                            <option value="">Select type</option>
                                            <option value="fulltime">Full-time</option>
                                            <option value="parttime">Part-time</option>
                                            <option value="contract">Contract</option>
                                            <option value="freelance">Freelance</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level *</label>
                                        <select
                                            name="experienceLevel"
                                            value={formData.experienceLevel}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                        >
                                            <option value="">Select level</option>
                                            <option value="entry">Entry Level (0-2 years)</option>
                                            <option value="mid">Mid Level (2-5 years)</option>
                                            <option value="senior">Senior Level (5+ years)</option>
                                            <option value="lead">Lead/Manager</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Workplace Type *</label>
                                        <select
                                            name="workPlace"
                                            value={formData.workPlace}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                        >
                                            <option value="">Select type</option>
                                            <option value="remote">Remote</option>
                                            <option value="onsite">On-site</option>
                                            <option value="hybrid">Hybrid</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="e.g. San Francisco, CA or Remote"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="number"
                                            name="salaryMin"
                                            value={formData.salaryMin}
                                            onChange={handleChange}
                                            placeholder="Min (e.g. 80000)"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                        />
                                        <input
                                            type="number"
                                            name="salaryMax"
                                            value={formData.salaryMax}
                                            onChange={handleChange}
                                            placeholder="Max (e.g. 120000)"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                        />
                                    </div>
                                    <div className="flex items-center mt-3">
                                        <input
                                            type="checkbox"
                                            name="hideSalary"
                                            checked={formData.hideSalary}
                                            onChange={handleChange}
                                            className="w-4 h-4 border-gray-300 rounded"
                                        />
                                        <label className="ml-2 text-sm text-gray-600">Don't show salary on job post</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Job Description */}
                        <div className="bg-white rounded-lg shadow p-6 mb-6">
                            <h3 className="text-xl font-semibold mb-6" style={{ color: '#002B5B' }}>Job Description</h3>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Summary *</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="4"
                                        placeholder="Brief overview of the role and what the candidate will be doing..."
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    />
                                </div>
                                {/* Responsibilities */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Responsibilities *</label>
                                    <textarea
                                        name="responsibilities"
                                        value={formData.responsibilities}
                                        onChange={handleChange}
                                        rows="5"
                                        placeholder="• Bachelor's degree in Computer Science&#10;• 5+ years of experience with React"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Required Qualifications *</label>
                                    <textarea
                                        name="requiredQualifications"
                                        value={formData.requiredQualifications}
                                        onChange={handleChange}
                                        rows="5"
                                        placeholder="• Bachelor's degree in Computer Science&#10;• 5+ years of experience with React"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Benefits & Perks</label>
                                    <textarea
                                        name="benefits"
                                        value={formData.benefits}
                                        onChange={handleChange}
                                        rows="4"
                                        placeholder="• Health insurance&#10;• 401(k) matching&#10;• Flexible PTO"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* <!-- Application Details --> */}
                        <div class="bg-white rounded-lg shadow p-6 mb-6">
                            <h3 class="text-xl font-semibold text-primary mb-6">How to Apply</h3>

                            <div class="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Application Email *</label>
                                    <input
                                        type="email"
                                        name="applicationEmail"
                                        value={formData.applicationEmail}
                                        onChange={handleChange}
                                        placeholder="careers@company.com"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Application URL (Optional)</label>
                                    <input
                                        type="url"
                                        name="applicationUrl"
                                        value={formData.applicationUrl}
                                        onChange={handleChange}
                                        placeholder="https://company.com/careers/apply"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    />
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Application Deadline</label>
                                    <input type="date" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus-accent" />
                                    <p class="text-sm text-gray-500 mt-1">Leave empty if no specific deadline</p>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Action Buttons --> */}
                        <div class="flex items-center justify-between bg-white rounded-lg shadow p-6">
                            <button class="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg font-medium hover:bg-gray-50">
                                Save as Draft
                            </button>
                            <div class="flex space-x-4">
                                <button onClick={handlePreview} class="px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm font-semibold hover:bg-yellow-900">
                                    Review
                                </button>

                            </div>
                        </div>

                        {/* <!-- Helpful Tips --> */}
                        <div class="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
                            <h4 class="font-semibold text-primary mb-3 flex items-center">
                                <svg class="w-5 h-5 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                                </svg>
                                Tips for a Great Job Post
                            </h4>
                            <ul class="space-y-2 text-sm text-gray-700">
                                <li>• Be specific about the role and responsibilities</li>
                                <li>• Clearly state required vs preferred qualifications</li>
                                <li>• Include salary range to attract serious candidates</li>
                                <li>• Highlight your company culture and benefits</li>
                                <li>• Use inclusive language to encourage diverse applicants</li>
                            </ul>
                        </div>

                        {/* warning */}
                        <div className="mt-4">
                            <p><i className="text-red-500">Note : Posting Scam Jobs is an offense that can be charged in the kenyan court of law. Additionally, it will lead  to the deletion of your account. Thank you for your understanding.</i> </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Preview Modal */}
            {showPreview && (
                <div className="fixed inset-0 bg-black/50 bg-opacity-50 z-1000 flex items-center justify-center p-4 mt-12">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
                            <h2 className="text-2xl font-bold" style={{ color: '#002B5B' }}>Preview Job Posting</h2>
                            <button className="text-gray-500 hover:text-gray-700" onClick={handleClosePreview}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        {/* Modal content */}
                        <div className="p-8">
                            <div className="mb-6">
                                <h1 className="text-3xl font-bold mb-2" style={{ color: '#002B5B' }}>
                                    {formData.jobTitle || 'Job Title'}
                                </h1>
                                <div className="flex flex-wrap gap-3 text-gray-600 mb-4">
                                    <span className="flex items-center">
                                        📍 {formData.location || 'Location not specified'}
                                    </span>
                                    <span>•</span>
                                    <span>{formData.employmentType || 'Employment type'}</span>
                                    <span>•</span>
                                    <span>{formData.workPlace || 'Workplace type'}</span>
                                </div>
                                {!formData.hideSalary && (formData.salaryMin || formData.salaryMax) && (
                                    <div className="text-lg font-semibold" style={{ color: '#FFC107' }}>
                                        ${formData.salaryMin || '0'} - ${formData.salaryMax || '0'} / year
                                    </div>
                                )}

                                {formData.description && (
                                    <div className="mb-6">
                                        <h3 className="font-semibold text-lg mb-3" style={{ color: '#002B5B' }}>Job Summary</h3>
                                        <p className="text-gray-700 whitespace-pre-line">{formData.description}</p>
                                    </div>
                                )}

                                {/* Required Qualifications */}
                                {formData.requiredQualifications && (
                                    <div className="mb-6">
                                        <h3 className="font-semibold text-lg mb-3" style={{ color: '#002B5B' }}>Required Qualifications</h3>
                                        <div className="text-gray-700 whitespace-pre-line">{formData.requiredQualifications}</div>
                                    </div>
                                )}

                                {formData.benefits && (
                                    <div className="mb-6">
                                        <h3 className="font-semibold text-lg mb-3" style={{ color: '#002B5B' }}>Benefits & Perks</h3>
                                        <div className="text-gray-700 whitespace-pre-line">{formData.benefits}</div>
                                    </div>
                                )}

                                <div className="mb-6 p-6 rounded-lg" style={{ backgroundColor: '#FFF9E6' }}>
                                    <h3 className="font-semibold text-lg mb-3" style={{ color: '#002B5B' }}>How to Apply</h3>
                                    {formData.applicationEmail && (
                                        <p className="text-gray-700 mb-2">
                                            📧 Email: <a href={`mailto:${formData.applicationEmail}`} className="font-medium" style={{ color: '#002B5B' }}>
                                                {formData.applicationEmail}
                                            </a>
                                        </p>
                                    )}
                                    {formData.applicationUrl && (
                                        <p className="text-gray-700">
                                            🔗 Apply online: <a href={formData.applicationUrl} target="_blank" rel="noopener noreferrer" className="font-medium" style={{ color: '#002B5B' }}>
                                                {formData.applicationUrl}
                                            </a>
                                        </p>
                                    )}
                                </div>
                                {/* Modal Footer */}
                                <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-8 py-4 flex justify-between">
                                    <button
                                        onClick={handleClosePreview}
                                        className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg font-medium hover:bg-white"
                                    >
                                        Back to Edit
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleClosePreview();
                                            handleSubmit();
                                        }}
                                        className="px-8 py-3 rounded-lg font-bold shadow-lg"
                                        style={{ backgroundColor: '#FFC107', color: '#002B5B' }}
                                    >
                                        Looks Good - Publish →
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )};
        </>
    );
}

export default PostJob;
