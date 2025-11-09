import React, { useState } from "react";
import "./employers.css";
  const user = JSON.parse(localStorage.getItem('user'));

const EmployerDashboard = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    // <div className="app-wrapper p-6">
    // <div className='main'>
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-12 mb-2 flex justify-between items-center">
          {/* Left section: Home */}
          <div>
            <h2 class="text-2xl font-bold text-primary">Dashboard</h2>
            <b className="text-gray-500 text-sm">Welcome back, {user?.name || 'Employer'}!</b>
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
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="stat-card bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm font-medium">Active Jobs</p>
              <p class="text-3xl font-bold text-primary mt-2">12</p>
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

      <div class="bg-white rounded-lg shadow mb-6">
        <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 class="text-lg font-semibold text-primary">Your Job Postings</h3>
          <button class="text-accent text-sm font-medium hover:text-yellow-600">Manage All</button>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div class="job-row flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer">
              <div class="flex-1">
                <div class="flex items-center space-x-3">
                  <h4 class="font-semibold text-primary">Senior Frontend Developer</h4>
                  <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
                </div>
                <p class="text-sm text-gray-500 mt-1">Remote • Full-time • Posted 2 days ago</p>
                <div class="flex items-center mt-2 space-x-4">
                  <span class="text-sm text-gray-600">👁️ 842 views</span>
                  <span class="text-sm text-gray-600">🔗 67 clicks</span>
                  <span class="text-sm text-gray-600">📅 Expires in 28 days</span>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <button class="px-4 py-2 text-primary border-2 border-primary rounded-lg text-sm font-medium hover:bg-gray-50">
                  Edit
                </button>
                <button class="text-gray-400 hover:text-gray-600">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                  </svg>
                </button>
              </div>
            </div>

            <div class="job-row flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer">
              <div class="flex-1">
                <div class="flex items-center space-x-3">
                  <h4 class="font-semibold text-primary">Product Manager</h4>
                  <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
                </div>
                <p class="text-sm text-gray-500 mt-1">San Francisco, CA • Full-time • Posted 5 days ago</p>
                <div class="flex items-center mt-2 space-x-4">
                  <span class="text-sm text-gray-600">👁️ 621 views</span>
                  <span class="text-sm text-gray-600">🔗 54 clicks</span>
                  <span class="text-sm text-gray-600">📅 Expires in 25 days</span>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <button class="px-4 py-2 text-primary border-2 border-primary rounded-lg text-sm font-medium hover:bg-gray-50">
                  Edit
                </button>
                <button class="text-gray-400 hover:text-gray-600">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                  </svg>
                </button>
              </div>
            </div>

            <div class="job-row flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer">
              <div class="flex-1">
                <div class="flex items-center space-x-3">
                  <h4 class="font-semibold text-primary">DevOps Engineer</h4>
                  <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
                </div>
                <p class="text-sm text-gray-500 mt-1">New York, NY • Full-time • Posted 1 week ago</p>
                <div class="flex items-center mt-2 space-x-4">
                  <span class="text-sm text-gray-600">👁️ 1,124 views</span>
                  <span class="text-sm text-gray-600">🔗 98 clicks</span>
                  <span class="text-sm text-gray-600">📅 Expires in 23 days</span>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <button class="px-4 py-2 text-primary border-2 border-primary rounded-lg text-sm font-medium hover:bg-gray-50">
                  Edit
                </button>
                <button class="text-gray-400 hover:text-gray-600">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                  </svg>
                </button>
              </div>
            </div>

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
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                  </svg>
                </button>
              </div>
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
    // </div>
    // </div>
  );
};

export default EmployerDashboard;
