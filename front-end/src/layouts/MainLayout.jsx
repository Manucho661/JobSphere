import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import TypingText from "../components/home/TypingText";
import { Link, Outlet } from "react-router-dom";

import "./Mainlayout.css";
import React, { useState, useEffect, useRef } from "react";

import {
  Search,
  Briefcase,
  ChevronDown,
  DollarSign,
  Clock,
  Building2,
  GraduationCap,
  X,
} from "lucide-react";

const MainLayout = () => {
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    employmentType: "",
    experienceLevel: "",
    salaryRange: "",
    remoteWork: [],
    postedWithin: "",
  });
  // state
  const [openDropdown, setOpenDropdown] = useState(null);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [page, setPage] = useState(1);
  const [hoveredIndex, setHoveredIndex] = useState(null);


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
      location: "",
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
            <div className="md:col-span-3">
              <h3 className="text-xl md:text-2xl font-semibold text-[#002B5B] mb-2">
                <b>Your Future Starts Here,</b>
              </h3>

              <h3 className="text-xl md:text-2xl font-semibold text-[#002B5B]">
                <b>Find the Job You Deserve</b>
                <span className="typing-text text-yellow-900">
                  {" "} • <Link to="/login" className="underline">Sign in</Link>{" "}
                  <TypingText
                    phrases={[
                      "to customize your experience",
                      "to track your applications",
                      "to get personalized recommendations",
                    ]}
                  />
                </span>
              </h3>
            </div>

            {/* Upload CV */}


          </div>
        </div>

        {/* FILTERS SECTION */}
        <div className="px-8">
          <div className="grid md:grid-cols-4 gap-6">

            {/* RIGHT SIDEBAR */}
            <div className="md:col-span-2 bg-white space-y-4 border rounded-lg p-2" style={{ borderColor: 'rgba(0, 43, 91, 0.2)', borderWidth: '1px' }}>
              <div className="rounded-lg p-8">
                <h4 className="text-2xl"><b>Featured Jobs</b></h4>

                <div className="flex justify-center gap-12">
                  <ul className="space-y-4">
                    <li className="flex items-start group">
                      <span className="mr-3 mt-1 flex-shrink-0">
                        <svg className="w-5 h-5" fill="#FFC107" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <a href="#" className="transition-colors duration-200 hover:underline"
                        style={{ color: hoveredIndex === 'job3' ? '#FFC107' : '#002B5B', transform: hoveredIndex === 'job3' ? 'translateX(4px)' : 'translateX(0)', transition: 'all 0.2s' }}
                        onMouseEnter={() => setHoveredIndex('job3')}
                        onMouseLeave={() => setHoveredIndex(null)}>
                        Software Engineer at chwele
                      </a>
                    </li>
                    <li className="flex items-start group">
                      <span className="mr-3 mt-1 flex-shrink-0">
                        <svg className="w-5 h-5" fill="#FFC107" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <a href="#" className="transition-colors duration-200 hover:underline"
                        style={{ color: hoveredIndex === 'job4' ? '#FFC107' : '#002B5B', transform: hoveredIndex === 'job4' ? 'translateX(4px)' : 'translateX(0)', transition: 'all 0.2s' }}
                        onMouseEnter={() => setHoveredIndex('job4')}
                        onMouseLeave={() => setHoveredIndex(null)}>
                        Software Engineer at chwele
                      </a>
                    </li>
                    <li className="flex items-start group">
                      <span className="mr-3 mt-1 flex-shrink-0">
                        <svg className="w-5 h-5" fill="#FFC107" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <a href="#" className="transition-colors duration-200 hover:underline"
                        style={{ color: hoveredIndex === 'job5' ? '#FFC107' : '#002B5B', transform: hoveredIndex === 'job5' ? 'translateX(4px)' : 'translateX(0)', transition: 'all 0.2s' }}
                        onMouseEnter={() => setHoveredIndex('job5')}
                        onMouseLeave={() => setHoveredIndex(null)}>
                        Software Engineer at chwele
                      </a>
                    </li>
                  </ul>
                  <ul className="space-y-4">
                    <li className="flex items-start group">
                      <span className="mr-3 mt-1 flex-shrink-0">
                        <svg className="w-5 h-5" fill="#FFC107" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <a href="#" className="transition-colors duration-200 hover:underline"
                        style={{ color: hoveredIndex === 'job6' ? '#FFC107' : '#002B5B', transform: hoveredIndex === 'job6' ? 'translateX(4px)' : 'translateX(0)', transition: 'all 0.2s' }}
                        onMouseEnter={() => setHoveredIndex('job6')}
                        onMouseLeave={() => setHoveredIndex(null)}>
                        Software Engineer at chwele
                      </a>
                    </li>
                    <li className="flex items-start group">
                      <span className="mr-3 mt-1 flex-shrink-0">
                        <svg className="w-5 h-5" fill="#FFC107" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <a href="#" className="transition-colors duration-200 hover:underline"
                        style={{ color: hoveredIndex === 'job7' ? '#FFC107' : '#002B5B', transform: hoveredIndex === 'job7' ? 'translateX(4px)' : 'translateX(0)', transition: 'all 0.2s' }}
                        onMouseEnter={() => setHoveredIndex('job7')}
                        onMouseLeave={() => setHoveredIndex(null)}>
                        Software Engineer at chwele
                      </a>
                    </li>
                    <li className="flex items-start group">
                      <span className="mr-3 mt-1 flex-shrink-0">
                        <svg className="w-5 h-5" fill="#FFC107" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <a href="#" className="transition-colors duration-200 hover:underline"
                        style={{ color: hoveredIndex === 'job8' ? '#FFC107' : '#002B5B', transform: hoveredIndex === 'job8' ? 'translateX(4px)' : 'translateX(0)', transition: 'all 0.2s' }}
                        onMouseEnter={() => setHoveredIndex('job8')}
                        onMouseLeave={() => setHoveredIndex(null)}>
                        Software Engineer at chwele
                      </a>
                    </li>

                  </ul>
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
                          <option value="">Select Type</option>
                          <option value="onsite">Full-time</option>
                          <option value="hybrid">Part-time</option>
                          <option value="remote">Contract</option>
                        </select>
                      </div>

                      {/* REMOTE WORK */}
                      <div className="relative">
                        <select
                          value={filters.remoteWork}
                          onChange={(e) =>
                            setFilters({
                              ...filters,
                              postedWithin: e.target.value,
                            })
                          }
                          className="w-48 px-4 py-2 border border-gray-300 rounded-lg hover:border-yellow-300 hover:bg-gray-50"
                        >

                          <option value="">Select Type</option>
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
                          <option value="">Select type</option>
                          <option value="Entry Level">Entry Level</option>
                          <option value="Mid Level">Mid Level</option>
                          <option value="Senior Level">Senior Level</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-5">
                      {/* SALARY RANGE */}
                      <div className="relative">
                        <DollarSign className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
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
                      <button onClick={applyFilters} className="w-48 px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm font-semibold hover:bg-yellow-900">
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
    </div>
  );
};

export default MainLayout;
