import React, { useState } from "react";
import { Link } from 'react-router-dom';
import apiClient from "../../../api/apiClient";


const PostJob = () => {
    console.log("PostJob component rendered");

    // Step 1: Manage form state
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: ""
    });

    // Step 2: Update state on input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    // 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await apiClient.post("/postJobs", formData); // POST → Laravel
            alert(res.data.message || "User saved!");
            setFormData({ title: "", description: "", requirements: "", salary: "" });
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
                            <h2 class="text-2xl font-bold text-primary">Post a New Job</h2>
                            <p class="text-gray-500 text-sm">Fill in the details below to create your job listing</p>
                        </div>
                        <div class="flex items-center space-x-4">
                            <button class="text-gray-600 hover:text-gray-800 text-sm font-medium">Save as Draft</button>
                            <button class="relative">
                                <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                                </svg>
                            </button>
                            <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                                TC
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
                            <form onSubmit={handleSubmit} action="">
                                <div class="space-y-5">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
                                        <input type="text" placeholder="e.g. Senior Frontend Developer" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus-accent" required />
                                    </div>

                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">Job Category *</label>
                                            <select class="w-full px-4 py-3 border border-gray-300 rounded-lg focus-accent" required>
                                                <option value="">Select a category</option>
                                                <option value="tech">Technology</option>
                                                <option value="marketing">Marketing</option>
                                                <option value="design">Design</option>
                                                <option value="sales">Sales</option>
                                                <option value="finance">Finance</option>
                                                <option value="hr">Human Resources</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">Employment Type *</label>
                                            <select class="w-full px-4 py-3 border border-gray-300 rounded-lg focus-accent" required>
                                                <option value="">Select type</option>
                                                <option value="fulltime">Full-time</option>
                                                <option value="parttime">Part-time</option>
                                                <option value="contract">Contract</option>
                                                <option value="freelance">Freelance</option>
                                                <option value="internship">Internship</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">Experience Level *</label>
                                            <select class="w-full px-4 py-3 border border-gray-300 rounded-lg focus-accent" required>
                                                <option value="">Select level</option>
                                                <option value="entry">Entry Level (0-2 years)</option>
                                                <option value="mid">Mid Level (2-5 years)</option>
                                                <option value="senior">Senior Level (5+ years)</option>
                                                <option value="lead">Lead/Manager</option>
                                                <option value="executive">Executive</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">Workplace Type *</label>
                                            <select class="w-full px-4 py-3 border border-gray-300 rounded-lg focus-accent" required>
                                                <option value="">Select type</option>
                                                <option value="remote">Remote</option>
                                                <option value="onsite">On-site</option>
                                                <option value="hybrid">Hybrid</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                                        <input type="text" placeholder="e.g. San Francisco, CA or Remote" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus-accent" required />
                                        <p class="text-sm text-gray-500 mt-1">If remote, you can specify "Remote" or add a specific region</p>
                                    </div>

                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
                                        <div class="grid grid-cols-2 gap-4">
                                            <div>
                                                <input type="number" placeholder="Min (e.g. 80000)" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus-accent" />
                                            </div>
                                            <div>
                                                <input type="number" placeholder="Max (e.g. 120000)" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus-accent" />
                                            </div>
                                        </div>
                                        <div class="flex items-center mt-3">
                                            <input type="checkbox" id="hide-salary" class="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent" />
                                            <label for="hide-salary" class="ml-2 text-sm text-gray-600">Don't show salary on job post</label>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* <!-- Job Description --> */}
                        <div class="bg-white rounded-lg shadow p-6 mb-6">
                            <h3 class="text-xl font-semibold text-primary mb-6">Job Description</h3>

                            <div class="space-y-5">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Job Summary *</label>
                                    <textarea rows="4" placeholder="Brief overview of the role and what the candidate will be doing..." class="w-full px-4 py-3 border border-gray-300 rounded-lg focus-accent" required></textarea>
                                    <p class="text-sm text-gray-500 mt-1">This will appear in search results (150-300 characters recommended)</p>
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Full Description *</label>
                                    <textarea rows="10" placeholder="Detailed description of the role, responsibilities, team culture, etc..." class="w-full px-4 py-3 border border-gray-300 rounded-lg focus-accent" required></textarea>
                                    <p class="text-sm text-gray-500 mt-1">Be detailed and specific about day-to-day responsibilities</p>
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Key Responsibilities</label>
                                    <textarea rows="6" placeholder="• Responsibility 1&#10;• Responsibility 2&#10;• Responsibility 3" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus-accent"></textarea>
                                    <p class="text-sm text-gray-500 mt-1">List the main duties and tasks (one per line)</p>
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Required Qualifications *</label>
                                    <textarea rows="6" placeholder="• Bachelor's degree in Computer Science or related field&#10;• 5+ years of experience with React&#10;• Strong problem-solving skills" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus-accent" required></textarea>
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Preferred Qualifications</label>
                                    <textarea rows="4" placeholder="Nice-to-have skills and experience..." class="w-full px-4 py-3 border border-gray-300 rounded-lg focus-accent"></textarea>
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Benefits & Perks</label>
                                    <textarea rows="5" placeholder="• Health insurance&#10;• 401(k) matching&#10;• Flexible PTO&#10;• Remote work options&#10;• Professional development budget" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus-accent"></textarea>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Application Details --> */}
                        <div class="bg-white rounded-lg shadow p-6 mb-6">
                            <h3 class="text-xl font-semibold text-primary mb-6">How to Apply</h3>

                            <div class="space-y-5">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Application Method *</label>
                                    <select class="w-full px-4 py-3 border border-gray-300 rounded-lg focus-accent" required>
                                        <option value="">Select method</option>
                                        <option value="email">Email</option>
                                        <option value="url">External URL</option>
                                        <option value="both">Both Email and URL</option>
                                    </select>
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Application Email *</label>
                                    <input type="email" placeholder="careers@company.com" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus-accent" required />
                                    <p class="text-sm text-gray-500 mt-1">Where candidates should send their applications</p>
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Application URL (Optional)</label>
                                    <input type="url" placeholder="https://company.com/careers/apply" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus-accent" />
                                    <p class="text-sm text-gray-500 mt-1">Link to your company's application page</p>
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
                                <button class="px-6 py-3 text-primary border-2 border-primary rounded-lg font-medium hover:bg-gray-50">
                                    Preview
                                </button>
                                <button class="px-8 py-3 bg-accent text-primary rounded-lg font-bold hover-accent shadow-lg">
                                    Continue to Review →
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
                    </div>
                </div>
            </div>
        </>
    );
}

export default PostJob;
