import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
// import FeaturedJobs from "../components/home/FeaturedJobs.jsx";
import TypingText from "../components/home/TypingText";
import apiClient from "../api/apiClient";

import { Link, Outlet } from "react-router-dom";

import "./mainlayout.css";
import React, { useState, useEffect, useRef } from "react";
const API_URL = import.meta.env.VITE_API_URL;

import {
  X,
} from "lucide-react";

const MainLayout = () => {
  const [filters, setFilters] = useState({
    search: "",
    employmentType: "",
    experienceLevel: "",
    salaryRange: "",
    remoteWork: "",
    postedWithin: "",
  });
  // state
  const [openDropdown, setOpenDropdown] = useState(null);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [page, setPage] = useState(1);
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [error, setError] = useState(null);
  // subscription pop up
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [email, setEmail] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [subError, setSubError] = useState('');

  // featured jobs
  const API_URL = import.meta.env.VITE_API_URL;

  const dropdownRef = useRef(null);

  // Toggle dropdown
  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  // script for subscribe
  const categories = [
    { id: 1, name: 'Software Dev', icon: '💻' },
    { id: 2, name: 'AI & ML', icon: '🤖' },
    { id: 3, name: 'Data Science', icon: '📊' },
    { id: 4, name: 'DevOps', icon: '⚙️' },
    { id: 5, name: 'Cybersecurity', icon: '🔒' },
    { id: 6, name: 'Product Mgmt', icon: '📱' }
  ];
  useEffect(() => {
    const hasInteracted = localStorage.getItem('jobAlertsInteracted');

    if (!hasInteracted) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);
  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleContinue = () => {
    setError('');

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    setIsExpanded(true);
  };

  const handleSubscribe = async () => {
    setError('');

    if (selectedCategories.length === 0) {
      setError('Please select at least one category');
      return;
    }

    setIsSubmitting(true);


    // Simulate subscription without actual API call
    try {
      // Send subscription data to AWS backend
      const response = await apiClient.post(
        `${API_URL}/job-alerts/subscribe`,
        { email, categories: selectedCategories },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Response from backend:", response.data);

      // Show success message and store flag
      setShowSuccess(true);
      localStorage.setItem("jobAlertsInteracted", "subscribed");

      // Hide modal after 1 second
      setTimeout(() => setIsVisible(false), 1000);

      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);

    } catch (err) {
      const status = err.response?.status;
      if (status === 405) {
        setError(
          "We couldn’t submit your job post due to a server request issue. Please try again."
        );
      } else if (status === 404) {
        setError("The submission service is temporarily unavailable. Please try again later.");
      } else {
        console.error("Subscription failed:", err.response?.data || err.message);
        setError("Something went wrong while submitting your job post.");
      }
    } finally {
      setIsSubmitting(false);
    }

  };

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('jobAlertsInteracted', 'dismissed');
  };




  // get featured jobs
  useEffect(() => {
    const getFeaturedJobs = async () => {
      try {
        const response = await apiClient.get(`${API_URL}/featuredJobs`);
        console.log(response.data);
        setFeaturedJobs(response.data);
      }
      catch (err) {
        setError("Failed to fetch featured job listings.");

        // NETWORK ERROR (no response received)
        if (!err.response) {
          console.log("NETWORK ERROR:", err.message);
          return;
        }

        // BACKEND ERROR (Laravel returned a status code)
        console.log("BACKEND ERROR");
        console.log("Status:", err.response.status);
        console.log("Message:", err.response.data.message);
        console.log("Internal:", err.response.data.error);
      }
    }
    getFeaturedJobs();
  }, []);

  // Watch state updates
  useEffect(() => {
    console.log("FEATURED JOBS STATE:", featuredJobs);
  }, [featuredJobs]);

  // Multi-checkbox handler
  const handleCheckboxChange = (category, value) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      search: "",
      employmentType: "",
      experienceLevel: "",
      salaryRange: "",
      remoteWork: "",
      postedWithin: "",
    });
  };

  // Count active filters
  const activeFiltersCount = Object.values(filters)
    .flat()
    .filter((v) => v && v.length !== 0).length;

  const getFilterLabel = (category, options) => {
    const count = filters[category].length;
    return count === 0 ? options.label : `${options.label} (${count})`;
  };

  const applyFilters = () => {
    console.log(filters);
    setPage(1);
    setShouldFetch(true);  // Homepage will react
  };



  return (
    <div className="app-wrapper">
      <Header />

      <main className="main min-h-screen py-2">

        {/* HERO HEADER */}
        <div className="px-8 mb-4">
          <div className="mt-2 grid md:grid-cols-4 gap-6">

            {/* Text Area */}
            <div className="md:col-span-4  bg-white rounded-xl">
              {/* Main Heading with accent */}
              <div className="mb-2">
                <h2 className="text-3xl md:text-4xl font-bold text-[#002B5B] mb-3 leading-tight">
                  Build Your Tech Career
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-[#002B5B] to-blue-400 rounded-full"></div>
              </div>

              {/* Subtitle with better spacing */}
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Explore the latest software, AI, and tech opportunities. Your next role in tech is just a click away.
              </p>

              {/* Interactive CTA Section */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
                <h3 className="text-xl md:text-2xl font-semibold text-[#002B5B] mb-3">
                  Find the Role That Matches Your Skills
                </h3>

                <div className="flex flex-wrap items-center gap-2 text-base md:text-lg">
                  <span className="text-yellow-600 font-medium">•</span>
                  <Link
                    to="/login"
                    className="text-[#002B5B] font-semibold underline decoration-2 underline-offset-4 hover:text-blue-600 transition-colors"
                  >
                    Sign in
                  </Link>
                  <span className="typing-text text-gray-700">
                    <TypingText
                      phrases={[
                        "to personalize your tech job search",
                        "to track your applications easily",
                        "to get tailored job recommendations",
                        "to like and save Jobs.",
                      ]}
                    />
                  </span>
                </div>
              </div>
            </div>


            {/* Upload CV */}


          </div>
        </div>

        {/* FILTERS SECTION */}
        <div className="px-8">
          <div className="grid md:grid-cols-4 gap-6">

            {/* RIGHT SIDEBAR */}
            <div
              className="md:col-span-2 bg-white border rounded-lg p-2 h-full min-h-0 flex flex-col"
              style={{ borderColor: 'rgba(0, 43, 91, 0.2)', borderWidth: '1px' }}
            >
              <div className="rounded-lg p-8 flex flex-col h-full min-h-0">

                {/* Header */}
                <h4 className="text-2xl mb-4">
                  <b>Featured Jobs</b>
                </h4>

                {/* Scrollable job list */}
                <div className="flex-1 overflow-y-auto min-h-0">
                  <ul className="space-y-4">
                    {featuredJobs?.length === 0 ? (
                      <li className="flex items-start group">
                        <span className="mr-3 mt-1 flex-shrink-0">
                          <svg className="w-5 h-5" fill="#FFC107" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                        <span className="text-gray-500">Loading...</span>
                      </li>
                    ) : (
                      featuredJobs.map((job) => (
                        <li key={job.id} className="flex items-start group">
                          <span className="mr-3 mt-1 flex-shrink-0">
                            <svg className="w-5 h-5" fill="#FFC107" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>

                          <div className="job-title text-gray-900 cursor-pointer">
                            <b>
                              <Link
                                to={`jobDetails/${job.id}`}
                                className="hover:text-yellow-600 transition-colors"
                              >
                                {job.job_title} at {job.employer.companyName}
                              </Link>
                            </b>
                          </div>
                        </li>
                      ))
                    )}
                  </ul>
                </div>

                {/* Footer button */}
                <div className="pt-6">
                  {/* <Link
                    to="/FeaturedJobs"
                    className="
          block w-full text-center
          px-6 py-3
          bg-yellow-600 text-white
          rounded-lg font-semibold
          hover:bg-yellow-700
          transition-colors
        "
                  >
                    See all featured jobs
                  </Link> */}
                </div>
              </div>
            </div>


            {/* LEFT FILTER PANEL */}
            <div className="filter-section md:col-span-2" ref={dropdownRef} >
              {/* CLEAR FILTERS */}
              <div className="bg-white p-4 rounded-lg" style={{ borderColor: 'rgba(0, 43, 91, 0.2)', borderWidth: '1px' }}>
                <div className="flex items-center justify-between mb-6">
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                    >
                      <X className="w-4 h-4" />
                      Clear all ({activeFiltersCount})
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">

                  {/* SEARCH INPUT (FIXED ICON OVERLAP) */}
                  <div className="flex items-center gap-3 flex-1
                    border border-gray-300 rounded-full px-4 py-0
                    hover:border-yellow-400 hover:bg-gray-50
                    focus-within:ring-2 focus-within:ring-yellow-500 transition-all">

                    {/* Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-5 h-5 text-gray-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-4.35-4.35m1.1-5.4a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>

                    {/* Input Field */}
                    <input
                      type="text"
                      value={filters.search}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          search: e.target.value,
                        })
                      }
                      placeholder="Search here..."
                      className="search-input flex-1 bg-transparent outline-none w-full border-0 ring-0 focus:ring-0"
                    />
                  </div>




                  {/* DROPDOWNS */}
                  <div className="commonFilters flex-nowrap gap-5 p-4">
                    <div className="flex gap-5 mb-5">
                      {/* JOB TYPE */}
                      <div className="relative">
                        <select
                          value={filters.employmentType}
                          onChange={(e) =>
                            setFilters({
                              ...filters,
                              employmentType: e.target.value,
                            })
                          }
                          className="w-48 px-4 py-2 border border-gray-300 rounded-lg hover:border-yellow-300 hover:bg-gray-50"
                        >
                          <option value="">Employment Type</option>
                          <option value="Full-time">Full-time</option>
                          <option value="Part-time">Part-time</option>
                          <option value="Contract">Contract</option>
                        </select>
                      </div>

                      {/* REMOTE WORK */}
                      <div className="relative">
                        <select
                          value={filters.remoteWork}
                          onChange={(e) =>
                            setFilters({
                              ...filters,
                              remoteWork: e.target.value,
                            })
                          }
                          className="w-48 px-4 py-2 border border-gray-300 rounded-lg hover:border-yellow-300 hover:bg-gray-50"
                        >

                          <option value="">Work-place Type</option>
                          <option value="onsite">Onsite</option>
                          <option value="hybrid">Hybrid</option>
                          <option value="remote">Remote</option>
                        </select>

                      </div>

                      {/* EXPERIENCE LEVEL */}
                      <div className="relative">

                        <select value={filters.experienceLevel}
                          onChange={(e) =>
                            setFilters({ ...filters, experienceLevel: e.target.value })
                          }
                          className="w-48 pl-9 pr-4 py-2 border border-gray-300 rounded-lg hover:border-yellow-300 hover:bg-gray-50">
                          <option value="">Experience Level</option>
                          <option value="Entry Level">Entry Level</option>
                          <option value="Mid Level">Mid Level</option>
                          <option value="Senior Level">Senior Level</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-5">
                      {/* SALARY RANGE */}
                      <div className="">
                        <select
                          value={filters.salaryRange}
                          onChange={(e) =>
                            setFilters({ ...filters, salaryRange: e.target.value })
                          }
                          className="w-48 pl-9 pr-4 py-2 border border-gray-300 rounded-lg hover:border-yellow-300 hover:bg-gray-50"
                        >
                          <option value="">Salary Range</option>
                          <option value="0-30k">$0 - $30,000</option>
                          <option value="30k-50k">$30,000 - $50,000</option>
                          <option value="50k-75k">$50,000 - $75,000</option>
                          <option value="75k-100k">$75,000 - $100,000</option>
                          <option value="100k-150k">$100,000 - $150,000</option>
                          <option value="150k+">$150,000+</option>
                        </select>
                      </div>
                      {/* POSTED WITHIN */}
                      <select
                        value={filters.postedWithin}
                        onChange={(e) =>
                          setFilters({
                            ...filters,
                            postedWithin: e.target.value,
                          })
                        }
                        className="w-48 px-4 py-2 border border-gray-300 rounded-lg hover:border-yellow-300 hover:bg-gray-50"
                      >
                        <option value="">Posted Anytime</option>
                        <option value="24h">Last 24 hours</option>
                        <option value="3d">Last 3 days</option>
                        <option value="7d">Last 7 days</option>
                        <option value="14d">Last 14 days</option>
                        <option value="30d">Last 30 days</option>
                      </select>
                      {/* APPLY */}
                      <button onClick={applyFilters} className="w-48 px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm font-semibold hover:bg-yellow-900 whitespace-nowrap">
                        <b>Filter Jobs</b>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <Outlet context={{ filters, shouldFetch, setShouldFetch, page }} />

      </main>

      <Footer />

      {isVisible && (
        <div className="fixed top-6 right-6 z-2000 animate-slideDown">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-sm" style={{ borderLeft: '6px solid #FFC107' }}>
            <div className="relative p-4">
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 text-black hover:bg-red-300 hover:text-white rounded-full p-1.5 transition-all"
                aria-label="Close"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>

              <div className="flex items-center gap-3 pr-8">
                <div className="w-10 h-10 bg-[#FFC107] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-5 h-5 text-[#002B5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                  </svg>
                </div>

                <div className="flex flex-col justify-center">
                  <h3 className="text-base font-bold text-black">
                    Get Job Alerts
                  </h3>
                  <p className="text-xs text-[#002B5B] opacity-60 ">
                    Stay updated with new opportunities
                  </p>
                </div>
              </div>

            </div>

            {!isExpanded ? (
              <div className="p-4 space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-[#002B5B] mb-1.5">
                    <svg className="w-3 h-3 inline mr-1 text-[#FFC107]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-[#FFC107] focus:ring-2 focus:ring-[#FFC107] focus:ring-opacity-20 focus:outline-none transition-all"
                  />
                </div>

                {error && (
                  <div className="p-2 rounded text-red-600 text-xs font-medium">
                    {error}
                  </div>
                )}

                <button
                  onClick={handleContinue}
                  className="w-full hover:bg-[#FFD54F] text-[#002B5B] font-bold py-2.5 px-4 rounded-lg transition-all text-sm hover:shadow-lg flex items-center justify-center gap-2"
                >
                  Continue
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </button>

                <p className="text-xs text-[#002B5B] opacity-60 text-center">
                  Daily curated jobs • Unsubscribe anytime
                </p>
              </div>
            ) : (
              <div className="p-4 space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-[#002B5B] mb-2">
                    Select Categories <span className="text-[#FFC107]">(Choose at least one)</span>
                  </label>

                  <div className="grid grid-cols-2 gap-2 max-h-52 overflow-y-auto pr-1">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => handleCategoryToggle(category.id)}
                        className={`p-2.5 rounded-lg border-2 text-left transition-all text-xs ${selectedCategories.includes(category.id)
                          ? 'border-[#FFC107] bg-[#FFC107] bg-opacity-10 shadow-sm'
                          : 'border-gray-200 hover:border-[#FFC107] hover:bg-gray-50'
                          }`}
                      >
                        <span className="text-base mr-1">{category.icon}</span>
                        <span className={`font-medium ${selectedCategories.includes(category.id)
                          ? 'text-[#002B5B]'
                          : 'text-[#002B5B] opacity-70'
                          }`}>
                          {category.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {error && (
                  <div className="p-2 bg-opacity-10 rounded text-red-600 text-xs font-medium">
                    {error}
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="flex-1 bg-white hover:bg-gray-50 text-[#002B5B] font-semibold py-2.5 px-4 rounded-lg transition-all text-sm border-2 border-gray-200 hover:border-[#002B5B]"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubscribe}
                    disabled={isSubmitting}
                    className="flex-1 bg-[#FFC107] hover:bg-[#FFD54F] text-[#002B5B] font-bold py-2.5 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-md hover:shadow-lg"
                  >
                    {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </div>

                <p className="text-xs text-[#002B5B] opacity-60 text-center">
                  <span className="text-[#FFC107] font-semibold">{selectedCategories.length}</span> {selectedCategories.length === 1 ? 'category' : 'categories'} selected
                </p>
              </div>
            )}
          </div>

          <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.4s ease-out;
        }
      `}</style>
        </div>

      )}

      {
        showSuccess && (
          <div className="fixed top-6 right-6 z-2002 animate-slideDown">
            <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm" style={{ borderLeft: '6px solid #FFC107' }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7 text-[#FFC107]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#002B5B] mb-1">
                    Successfully Subscribed!
                  </h3>
                  <p className="text-sm text-[#002B5B] opacity-70">
                    You have successfully subscribed to job alerts. We'll notify you about new opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default MainLayout;
