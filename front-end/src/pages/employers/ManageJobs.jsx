import { useEffect, useState } from "react"
import apiClient from "../../api/apiClient";

const user = JSON.parse(localStorage.getItem('user'));
const jobCount = user?.employer?.jobs?.length ?? 0;
const ManageJobs = () => {
    console.log(user);
 console.log(user);
    // url
    const API_URL = import.meta.env.VITE_API_URL;
    // Get job details
    console.log(user);

    // Hooks
    const [showEdit, setShowEdit] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [jobId, setEditJobId] = useState(null);
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


    // useEffect
    useEffect(() => {
        console.log("FORM DATA UPDATED:", formData);
    }, [formData]);

    useEffect(() => {
        console.log("jobId:", jobId);
    }, [jobId]);

    // function to run if an event handler is missing
    const fallback = () => {
        console.log('An event handler is missing');
    };
    // handle edit
    const handleEdit = async (job) => {
        const selectedId = job.id; // ✅ FIXED — no name conflict
        console.log('yoyoyo');
        try {

            const response = await apiClient.get(`${API_URL}/jobs/${selectedId}`);
            const jobData = response.data;
            setSelectedJob(jobData);
            setFormData({
                jobTitle: jobData.jobTitle || "",
                employmentType: jobData.employmentType || "",
                category: jobData.category || "",
                experienceLevel: jobData.experienceLevel || "",
                workPlace: jobData.workPlace || "",
                location: jobData.location || "",
                salaryMin: jobData.salaryMin || "",
                salaryMax: jobData.salaryMax || "",
                hideSalary: jobData.hideSalary || false,
                description: jobData.description || "",
                responsibilities: jobData.responsibilities || "",
                requiredQualifications: jobData.qualifications || "",
                benefits: jobData.benefits || ""
            });
            console.log('yoyoyo');
            setShowEdit(true);
            setEditJobId(selectedId); //  it updates correctly
        }
        catch (err) {
            setError("Failed to fetch job details.");
            console.error(err);
        }

    };


    // Update state on input change
    const handleChange = (e) => {
    const { name, value } = e.target;

    // special case for textareas with multiple lines
    if (name === "responsibilities") {
        const responsibilitiesArray = value
            .split("\n")
            .filter(line => line.trim() !== "")
            .map(line => ({ responsibility: line }));

        setSelectedJob(prev => ({
            ...prev,
            responsibilities: responsibilitiesArray
        }));
        return;
    }

    if (name === "requiredQualifications") {
        const qualificationsArray = value
            .split("\n")
            .filter(line => line.trim() !== "")
            .map(line => ({ qualification: line }));

        setSelectedJob(prev => ({
            ...prev,
            qualifications: qualificationsArray
        }));
        return;
    }

    // normal fields
    setSelectedJob(prev => ({
        ...prev,
        [name]: value
    }));
};


    // save edited Job

    const saveEditedJob = async (e) => {
        e.preventDefault(); // keep this if inside a form

        try {
            const token = localStorage.getItem("auth_token"); // ✅ Correct key name

            // Prepare payload and convert arrays or objects to JSON strings
            const payload = {
                ...formData,
                responsibilities: formData.responsibilities
                    ? JSON.stringify(formData.responsibilities)
                    : "",
                requiredQualifications: formData.requiredQualifications
                    ? JSON.stringify(formData.requiredQualifications)
                    : "",
                benefits: formData.benefits
                    ? JSON.stringify(formData.benefits)
                    : "",
            };

            const res = await apiClient.put(
                `${API_URL}/updateJobs/${jobId}`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log(res.data);
            alert(res.data.message || "Job updated successfully!");
            setFormData({}); // reset your form fields here
        } catch (err) {
            console.error(err.response?.data || err.message);
            alert("Error submitting form");
        }
    };

    // setShowEdit(true);
    const handleCloseEdit = () => {
        setShowEdit(false);
    }
    return (
        <>
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-12 mb-2 flex justify-between items-center">
                        {/* Left section: Home */}
                        <div>
                            <div className="flex">
                                <h2 className="text-2xl font-bold text-primary">Manage Jobs</h2>
                            </div>
                            {/* <b className="text-gray-500 text-sm">Welcome back, {user?.name || 'Employer'}!</b> */}
                        </div>

                        {/* Right section: Buttons */}
                        <div className="flex items-center space-x-4">
                            <button className="relative">
                                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                                </svg>
                                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-yellow-500 font-semibold">
                                <b>JS</b>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="stat-card bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Active Jobs</p>
                                <p className="text-3xl font-bold text-primary mt-2">{jobCount}</p>
                                <p className="text-green-600 text-sm mt-2">+2 this week</p>
                            </div>
                            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="stat-card bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Active Jobs</p>
                                <p className="text-3xl font-bold text-primary mt-2">3,248</p>
                                <p className="text-green-600 text-sm mt-2">+215 this week</p>
                            </div>
                            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="stat-card bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Expired Jobs</p>
                                <p className="text-3xl font-bold text-primary mt-2">487</p>
                                <p className="text-green-600 text-sm mt-2">+42 this week</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="stat-card bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Applications</p>
                                <p className="text-3xl font-bold text-primary mt-2">18</p>
                                <p className="text-accent text-sm mt-2 font-medium">On current plan</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow mb-6">
                    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-primary">Your Job Postings</h3>
                        <button className="text-accent text-sm font-medium hover:text-yellow-600">Manage All</button>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {user?.employer?.jobs?.length > 0 ? (
                                user.employer.jobs.map((job) => (
                                    <div
                                        key={job.id}
                                        className="job-row flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3">
                                                <h4 className="font-semibold text-primary">{job.jobTitle}</h4>
                                                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                                    Active
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Remote • Full-time • Posted 2 days ago
                                            </p>
                                            <div className="flex items-center mt-2 space-x-4">
                                                <span className="text-sm text-gray-600">👁️ 842 views</span>
                                                <span className="text-sm text-gray-600">🔗 67 clicks</span>
                                                <span className="text-sm text-gray-600">📅 Expires in 28 days</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <button
                                                onClick={() =>
                                                    typeof handleEdit === "function"
                                                        ? handleEdit(job) // pass the current job to the handler
                                                        : fallback()      // run fallback if handleEdit is missing
                                                }
                                                className="px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm font-semibold hover:bg-yellow-900"
                                            >
                                                Edit
                                            </button>


                                            <button className="text-gray-400 hover:text-gray-600">
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                                    ></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-6">
                                    No jobs found. Click the <span className="text-primary font-medium">Post Job</span> button to create your first job.
                                </p>
                            )}
                            <div class="job-row flex items-center justify-between p-4 border-2 border-accent bg-accent-light rounded-lg cursor-pointer">
                                <div class="flex-1">
                                    <div class="flex items-center space-x-3">
                                        <h4 class="font-semibold text-primary">UX/UI Designer</h4>
                                        <span class="px-2 py-1 bg-accent text-primary text-xs rounded-full font-medium">Expiring Soon</span>
                                    </div>
                                    <p class="text-sm text-gray-500 mt-1">Remote • Contract • Posted 3 weeks ago</p>
                                    <div class="flex items-center mt-2 space-x-4">
                                        <span class="text-sm text-gray-600">👁️ 957 views</span>
                                        <span class="text-sm text-gray-600">🔗 76 clicks</span>
                                        <span class="text-sm text-red-600 font-medium">📅 Expires in 7 days</span>
                                    </div>
                                </div>
                                <div class="flex items-center space-x-3">
                                    <button class="px-4 py-2 bg-accent text-primary rounded-lg text-sm font-semibold hover-accent">
                                        Renew
                                    </button>
                                    <button class="text-gray-400 hover:text-gray-600">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLineJoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Performance Insights --> */}
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div class="bg-white rounded-lg shadow p-6">
                            <h3 class="text-lg font-semibold text-primary mb-4">Top Performing Jobs</h3>
                            <div class="space-y-4">
                                <div class="flex items-center justify-between pb-3 border-b border-gray-100">
                                    <div>
                                        <h4 class="font-medium text-primary">DevOps Engineer</h4>
                                        <p class="text-sm text-gray-500">1,124 views • 8.7% click rate</p>
                                    </div>
                                    <div class="text-right">
                                        <span class="text-green-600 text-sm font-semibold">↑ 24%</span>
                                    </div>
                                </div>
                                <div class="flex items-center justify-between pb-3 border-b border-gray-100">
                                    <div>
                                        <h4 class="font-medium text-primary">UX/UI Designer</h4>
                                        <p class="text-sm text-gray-500">957 views • 7.9% click rate</p>
                                    </div>
                                    <div class="text-right">
                                        <span class="text-green-600 text-sm font-semibold">↑ 18%</span>
                                    </div>
                                </div>
                                <div class="flex items-center justify-between">
                                    <div>
                                        <h4 class="font-medium text-primary">Senior Frontend Developer</h4>
                                        <p class="text-sm text-gray-500">842 views • 8.0% click rate</p>
                                    </div>
                                    <div class="text-right">
                                        <span class="text-green-600 text-sm font-semibold">↑ 15%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white rounded-lg shadow p-6">
                            <h3 class="text-lg font-semibold text-primary mb-4">Insights & Tips</h3>
                            <div class="space-y-4">
                                <div class="p-4 bg-blue-50 rounded-lg">
                                    <div class="flex items-start space-x-3">
                                        <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                                            <span class="text-white text-sm">💡</span>
                                        </div>
                                        <div>
                                            <h4 class="font-medium text-primary text-sm">Boost Your Visibility</h4>
                                            <p class="text-sm text-gray-600 mt-1">Jobs with detailed descriptions get 40% more views.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="p-4 bg-green-50 rounded-lg">
                                    <div class="flex items-start space-x-3">
                                        <div class="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span class="text-white text-sm">📈</span>
                                        </div>
                                        <div>
                                            <h4 class="font-medium text-primary text-sm">Great Engagement</h4>
                                            <p class="text-sm text-gray-600 mt-1">Your average click rate is 15% above platform average!</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="p-4 bg-accent-light rounded-lg border border-accent">
                                    <div class="flex items-start space-x-3">
                                        <div class="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                                            <span class="text-primary text-sm">⏰</span>
                                        </div>
                                        <div>
                                            <h4 class="font-medium text-primary text-sm">Action Required</h4>
                                            <p class="text-sm text-gray-600 mt-1">1 job expiring soon. Renew to keep it visible.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* start Row */}
                    <div class="bg-primary rounded-lg shadow p-8 text-white text-center mt-2">
                        <h3 class="text-2xl font-semibold mb-3">Ready to reach more candidates?</h3>
                        <p class="mb-6 text-gray-300">Post a new job listing and connect with thousands of qualified professionals.</p>
                        <button class="bg-accent text-primary px-8 py-3 rounded-lg font-bold hover-accent transition shadow-lg">
                            Post a New Job
                        </button>
                    </div>
                </div>
            </div>

            {/* EditModal */}
            {
                showEdit && selectedJob && (
                    <div className="fixed inset-0 bg-black/50 bg-opacity-50 z-1000 flex items-center justify-center p-4 mt-12">
                        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
                                <h2 className="text-2xl font-bold" style={{ color: '#002B5B' }}>Edit Job</h2>
                                <button className="text-gray-500 hover:text-gray-700" onClick={() =>
                                    typeof handleCloseEdit === "function" ? handleCloseEdit() : fallback()
                                }
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            {/* Modal content */}
                            <div className="p-8">
                                <div className="bg-white rounded-lg p-6 mb-6">
                                    <div className="space-y-4">
                                        <input
                                            type="email"
                                            name="jobTitle"
                                            value={selectedJob.jobTitle}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border rounded-lg"
                                        />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Job Category *</label>
                                                <select
                                                    name="category"
                                                    value={selectedJob.category}
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
                                                    value={selectedJob.employmentType}
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
                                                    value={selectedJob.experienceLevel}
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
                                                    value={selectedJob.workPlace}
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
                                                value={selectedJob.location}
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
                                                    name="minSalary"
                                                    value={selectedJob.minSalary}
                                                    onChange={handleChange}
                                                    placeholder="Min (e.g. 80000)"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                                />
                                                <input
                                                    type="number"
                                                    name="maxSalary"
                                                    value={selectedJob.maxSalary}
                                                    onChange={handleChange}
                                                    placeholder="Max (e.g. 120000)"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                                />
                                            </div>
                                            <div className="flex items-center mt-3">
                                                <input
                                                    type="checkbox"
                                                    name="hideSalary"
                                                    checked={selectedJob.hideSalary}
                                                    onChange={handleChange}
                                                    className="w-4 h-4 border-gray-300 rounded"
                                                />
                                                <label className="ml-2 text-sm text-gray-600">Don't show salary on job post</label>
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
                                                        value={selectedJob.description}
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
                                                        value={
                                                            (selectedJob.responsibilities || [])
                                                                .map(r => r.responsibility)
                                                                .join("\n")
                                                        }
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
                                                        value={
                                                            (selectedJob.qualifications || [])
                                                                .map(q => q.qualification)
                                                                .join("\n")
                                                        }
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
                                                        value={selectedJob.benefits}
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
                                                        value={selectedJob.applicationEmail}
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
                                                        value={selectedJob.applicationUrl}
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
                                            {/* <!-- Action Buttons --> */}
                                            <div class="flex items-center justify-between bg-white rounded-lg shadow p-6">
                                                <button class="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg font-medium hover:bg-gray-50">
                                                    Cancel
                                                </button>
                                                <div class="flex space-x-4">
                                                    <button onClick={saveEditedJob} className="px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm font-semibold hover:bg-yellow-900">
                                                        Save
                                                    </button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            };
        </>
    )
}

export default ManageJobs