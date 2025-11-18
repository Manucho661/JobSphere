import { useEffect, useState } from "react"
import apiClient from "../../api/apiClient";

const user = JSON.parse(localStorage.getItem('user'));
const jobCount = user?.employer?.jobs?.length ?? 0;
const ManageJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchJobs = async () => {
        try {
            const employerId = user?.employer?.id; // use employer.id, not jobs
            const response = await apiClient.get(`${API_URL}/jobs/employer?id=${employerId}`)
            setJobs[response.data];
        }
        catch (err) {
            console.error(err);
            setError("Failed to fetch job listings.");
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <>
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-12 mb-2 flex justify-between items-center">
                        {/* Left section: Home */}
                        <div>
                            <div className="flex">
                                <h2 class="text-2xl font-bold text-primary">Manage Jobs</h2>
                            </div>
                            {/* <b className="text-gray-500 text-sm">Welcome back, {user?.name || 'Employer'}!</b> */}
                        </div>

                        {/* Right section: Buttons */}
                        <div class="flex items-center space-x-4">
                            <button class="relative">
                                <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                                </svg>
                                <span class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-yellow-500 font-semibold">
                                <b>JS</b>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div class="stat-card bg-white rounded-lg shadow p-6">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-gray-500 text-sm font-medium">Active Jobs</p>
                                    <p class="text-3xl font-bold text-primary mt-2">{jobCount}</p>
                                    <p class="text-green-600 text-sm mt-2">+2 this week</p>
                                </div>
                                <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div class="stat-card bg-white rounded-lg shadow p-6">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-gray-500 text-sm font-medium">Total Views</p>
                                    <p class="text-3xl font-bold text-primary mt-2">3,248</p>
                                    <p class="text-green-600 text-sm mt-2">+215 this week</p>
                                </div>
                                <div class="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div class="stat-card bg-white rounded-lg shadow p-6">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-gray-500 text-sm font-medium">Job Clicks</p>
                                    <p class="text-3xl font-bold text-primary mt-2">487</p>
                                    <p class="text-green-600 text-sm mt-2">+42 this week</p>
                                </div>
                                <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div class="stat-card bg-white rounded-lg shadow p-6">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-gray-500 text-sm font-medium">Days Remaining</p>
                                    <p class="text-3xl font-bold text-primary mt-2">18</p>
                                    <p class="text-accent text-sm mt-2 font-medium">On current plan</p>
                                </div>
                                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ManageJobs