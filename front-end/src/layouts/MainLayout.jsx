import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import TypingText from "../components/home/TypingText";
import { Link, Outlet } from "react-router-dom";

import "./mainlayout.css";
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
    employmentType: [],
    experienceLevel: [],
    salaryRange: "",
    remoteWork: [],
    postedWithin: "",
  });

  const [openDropdown, setOpenDropdown] = useState(null);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [page, setPage] = useState(1);

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
      employmentType: [],
      experienceLevel: [],
      salaryRange: "",
      remoteWork: [],
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
                <span className="text-yellow-900">
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
          <div className="grid md:grid-cols-3 gap-6">

            {/* LEFT FILTER PANEL */}
            <div className="filter-section md:col-span-2 bg-white rounded-lg p-6" ref={dropdownRef}>

              {/* CLEAR FILTERS */}
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
                <div className="relative w-full md:w-auto">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={filters.search}
                    onChange={(e) =>
                      setFilters({ ...filters, search: e.target.value })
                    }
                    placeholder="Job title or keywords"
                    className="w-full md:w-60 pl-10 pr-4 py-2 border border-gray-300 rounded-lg 
                    focus:outline-none focus:ring-yellow-500 focus:border-yellow-300 
                    hover:border-yellow-300 hover:bg-gray-50"
                  />
                </div>

                {/* DROPDOWNS */}
                <div className="commonFilters flex flex-wrap gap-3">

                  {/* JOB TYPE */}
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown("employmentType")}
                      className="w-48 flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg 
                      hover:border-yellow-300 hover:bg-gray-50"
                    >
                      <Briefcase className="w-4 h-4 text-gray-600" />
                      <span>{getFilterLabel("employmentType", { label: "Job Type" })}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-600 transition-transform ${openDropdown === "employmentType" ? "rotate-180" : ""
                          }`}
                      />
                    </button>

                    {openDropdown === "employmentType" && (
                      <div className="absolute top-full mt-2 w-56 bg-white border rounded-lg shadow-lg z-20 p-3 space-y-2">
                        {["Full-time", "Part-time", "Contract", "Temporary", "Internship"].map(
                          (type) => (
                            <label
                              key={type}
                              className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={filters.employmentType.includes(type)}
                                onChange={() =>
                                  handleCheckboxChange("employmentType", type)
                                }
                                className="w-4 h-4"
                              />
                              <span className="ml-2">{type}</span>
                            </label>
                          )
                        )}
                      </div>
                    )}
                  </div>

                  {/* REMOTE WORK */}
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown("remoteWork")}
                      className="w-48 flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg 
                      hover:border-yellow-300 hover:bg-gray-50"
                    >
                      <Clock className="w-4 h-4 text-gray-600" />
                      <span>{getFilterLabel("remoteWork", { label: "Work Mode" })}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-600 transition-transform ${openDropdown === "remoteWork" ? "rotate-180" : ""
                          }`}
                      />
                    </button>

                    {openDropdown === "remoteWork" && (
                      <div className="absolute top-full mt-2 w-48 bg-white border rounded-lg shadow-lg z-20 p-3 space-y-2">
                        {["Remote", "Hybrid", "Onsite"].map((type) => (
                          <label
                            key={type}
                            className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={filters.remoteWork.includes(type)}
                              onChange={() =>
                                handleCheckboxChange("remoteWork", type)
                              }
                            />
                            <span className="ml-2">{type}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* EXPERIENCE LEVEL */}
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown("experienceLevel")}
                      className="w-48 flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg 
                      hover:border-yellow-300 hover:bg-gray-50"
                    >
                      <GraduationCap className="w-4 h-4 text-gray-600" />
                      <span>{getFilterLabel("experienceLevel", { label: "Experience" })}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-600 transition-transform ${openDropdown === "experienceLevel" ? "rotate-180" : ""
                          }`}
                      />
                    </button>

                    {openDropdown === "experienceLevel" && (
                      <div className="absolute top-full mt-2 w-48 bg-white border rounded-lg shadow-lg z-20 p-3 space-y-2">
                        {["Entry Level", "Mid Level", "Senior Level", "Executive"].map(
                          (level) => (
                            <label
                              key={level}
                              className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={filters.experienceLevel.includes(level)}
                                onChange={() =>
                                  handleCheckboxChange("experienceLevel", level)
                                }
                              />
                              <span className="ml-2">{level}</span>
                            </label>
                          )
                        )}
                      </div>
                    )}
                  </div>

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
                    <b>Apply</b>
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="md:col-span-1 space-y-4">
              <div className="p-6 bg-white rounded-lg">
                <h5 className="font-bold">📬 Subscribe to Job Alert</h5>
                <p className="text-sm text-gray-500 mb-2">
                  Join thousands getting job updates weekly
                </p>

                <input
                  type="email"
                  placeholder="Enter your email here!"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-2 hover:border-yellow-300 focus:ring-2 focus:ring-blue-500"
                />

                <button className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm font-semibold hover:bg-yellow-900">
                  <b>Subscribe</b>
                </button>
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
