import Header from "../components/home/Header";
import Footer from '../components/home/Footer';
import TypingText from "../components/home/TypingText";
import { Link } from 'react-router-dom';

import "./mainlayout.scss"
import { Outlet } from 'react-router-dom';

import React, { useState } from 'react';
import { Search, MapPin, Briefcase, ChevronDown, DollarSign, Clock, Building2, GraduationCap, X } from 'lucide-react';


const MainLayout = () => {

  const [filters, setFilters] = useState({
    search: '',
    location: '',
    jobType: [],
    experienceLevel: [],
    salaryRange: '',
    remoteWork: [],
    companySize: [],
    postedWithin: ''
  });

  const [openDropdown, setOpenDropdown] = useState(null);
  const handleCheckboxChange = (category, value) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      location: '',
      jobType: [],
      experienceLevel: [],
      salaryRange: '',
      remoteWork: [],
      companySize: [],
      postedWithin: ''
    });
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const activeFiltersCount = Object.values(filters).flat().filter(v => v).length;

  const getFilterLabel = (category, options) => {
    const count = filters[category].length;
    if (count === 0) return options.label;
    return `${options.label} (${count})`;
  };


  return (
    <>
      <div className="app-wrapper">
        <Header />

        <main className="main min-h-screen py-2">
          <div className="px-8 mb-4">
            <div className="mt-2 grid md:grid-cols-4 gap-6">
              <div className="md:col-span-3">
                <h3 className="text-xl md:text-2xl font-semibold text-[#002B5B] mb-2">
                  <b>Your Future Starts Here,</b>
                </h3>
                <h3 className="text-xl md:text-2xl font-semibold text-[#002B5B]">
                  <b>Find the Job You Deserve </b>
                  <span className="text-yellow-900">
                    {" "}
                    • <Link to="/login" className="underline">Sign in</Link>{" "}
                    <TypingText
                      phrases={[
                        "to customize your experience",
                        "to track your applications",
                        "to get personalized recommendations"
                      ]}
                    />
                  </span>
                </h3>
              </div>

              <div className="md:col-span-1 rounded-lg">
                <i className=""> <b>Upload your CV to check how it aligns with Jobs</b></i>
                <button class="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm font-semibold hover:bg-yellow-900">
                  <b>Upload your CV</b>
                </button>
              </div>
            </div>
          </div>
          <div className="px-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-gray-100">
                <div className="max-w-5xl mx-auto text-start">
                  {/* Search Form */}
                  <section className="filterSection">
                    <div className="w-full bg-white rounded-lg p-6">
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
                        <div className="flex-1 min-w-[200px]">
                          <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                              type="text"
                              value={filters.search}
                              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                              placeholder="Job title or keywords"
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-yellow-500 focus:border-yellow-300 appearance-none cursor-pointer hover:border-yellow-300 hover:bg-gray-50"
                            />
                          </div>
                        </div>
                        <div className="flex-1 min-w-[200px]">
                          <div className="relative">
                            <MapPin className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 " />
                            <input
                              type="text"
                              value={filters.location}
                              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                              placeholder="Location"
                              className="w-full pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                        {/* Job Type Dropdown */}
                        <div className="Relative">
                          <button
                            onClick={() => toggleDropdown('jobType')}
                            className="w-full flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-yellow-500 focus:border-yellow-300 appearance-none cursor-pointer hover:border-yellow-300 hover:bg-gray-50"
                          >
                            <Briefcase className="w-4 h-4 text-gray-600" />
                            <span className="text-gray-700">{getFilterLabel('jobType', { label: 'Job Type' })}</span>
                            <ChevronDown className="w-4 h-4 text-gray-600" />
                          </button>
                          {openDropdown === 'jobType' && (
                            <div className="absolute top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                              <div className="p-3 space-y-2">
                                {['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship'].map(type => (
                                  <label key={type} className="flex items-center hover:bg-gray-50 p-2 rounded cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={filters.jobType.includes(type)}
                                      onChange={() => handleCheckboxChange('jobType', type)}
                                      className="w-4 h-4 text-blue-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-yellow-500 focus:border-yellow-300 appearance-none cursor-pointer hover:border-yellow-300 hover:bg-gray-50"
                                    />
                                    <span className="ml-2 text-gray-700">{type}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        {/* Work Arrangement Dropdown */}
                        <div className="Relative">
                          <button
                            onClick={() => toggleDropdown('remoteWork')}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-yellow-500 focus:border-yellow-300 appearance-none cursor-pointer hover:border-yellow-300 hover:bg-gray-50"
                          >
                            <Clock className="w-4 h-4 text-gray-600" />
                            <span className="text-gray-700">{getFilterLabel('remoteWork', { label: 'Work Mode' })}</span>
                            <ChevronDown className="w-4 h-4 text-gray-600" />
                          </button>
                          {openDropdown === 'remoteWork' && (
                            <div className="absolute top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                              <div className="p-3 space-y-2">
                                {['Remote', 'Hybrid', 'On-site'].map(type => (
                                  <label key={type} className="flex items-center hover:bg-gray-50 p-2 rounded cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={filters.remoteWork.includes(type)}
                                      onChange={() => handleCheckboxChange('remoteWork', type)}
                                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-gray-700">{type}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        {/* Experience Level Dropdown */}
                        <div className="relative">
                          <button
                            onClick={() => toggleDropdown('experienceLevel')}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-yellow-500 focus:border-yellow-300 appearance-none cursor-pointer hover:border-yellow-300 hover:bg-gray-50"
                          >
                            <GraduationCap className="w-4 h-4 text-gray-600" />
                            <span className="text-gray-700">{getFilterLabel('experienceLevel', { label: 'Experience' })}</span>
                            <ChevronDown className="w-4 h-4 text-gray-600" />
                          </button>
                          {openDropdown === 'experienceLevel' && (
                            <div className="absolute top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                              <div className="p-3 space-y-2">
                                {['Entry Level', 'Mid Level', 'Senior Level', 'Executive'].map(level => (
                                  <label key={level} className="flex items-center hover:bg-gray-50 p-2 rounded cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={filters.experienceLevel.includes(level)}
                                      onChange={() => handleCheckboxChange('experienceLevel', level)}
                                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-gray-700">{level}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        {/* Salary Range Dropdown */}
                        <div className="relative">
                          <select
                            value={filters.salaryRange}
                            onChange={(e) => setFilters({ ...filters, salaryRange: e.target.value })}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-yellow-500 focus:border-yellow-300 appearance-none cursor-pointer hover:border-yellow-300 hover:bg-gray-50"
                          >
                            <option value="">Salary Range</option>
                            <option value="0-30k">$0 - $30,000</option>
                            <option value="30k-50k">$30,000 - $50,000</option>
                            <option value="50k-75k">$50,000 - $75,000</option>
                            <option value="75k-100k">$75,000 - $100,000</option>
                            <option value="100k-150k">$100,000 - $150,000</option>
                            <option value="150k+">$150,000+</option>
                          </select>
                          <DollarSign className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>

                        {/* Company Size Dropdown */}
                        <div className="relative">
                          <button
                            onClick={() => toggleDropdown('companySize')}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-yellow-500 focus:border-yellow-300 appearance-none cursor-pointer hover:border-yellow-300 hover:bg-gray-50"
                          >
                            <Building2 className="w-4 h-4 text-gray-600" />
                            <span className="text-gray-700">{getFilterLabel('companySize', { label: 'Company Size' })}</span>
                            <ChevronDown className="w-4 h-4 text-gray-600" />
                          </button>
                          {openDropdown === 'companySize' && (
                            <div className="absolute top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                              <div className="p-3 space-y-2">
                                {['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'].map(size => (
                                  <label key={size} className="flex items-center hover:bg-gray-50 p-2 rounded cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={filters.companySize.includes(size)}
                                      onChange={() => handleCheckboxChange('companySize', size)}
                                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-gray-700">{size} employees</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        {/* Date Posted */}
                        <div className="relative">
                          <select
                            value={filters.postedWithin}
                            onChange={(e) => setFilters({ ...filters, postedWithin: e.target.value })}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-yellow-500 focus:border-yellow-300 appearance-none cursor-pointer hover:border-yellow-300 hover:bg-gray-50"
                          >
                            <option value="">Posted Anytime</option>
                            <option value="24h">Last 24 hours</option>
                            <option value="3d">Last 3 days</option>
                            <option value="7d">Last 7 days</option>
                            <option value="14d">Last 14 days</option>
                            <option value="30d">Last 30 days</option>
                          </select>
                        </div>
                        {/* Apply Button */}
                        <button class="px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm font-semibold hover:bg-yellow-900">
                          <b>Apply</b>
                        </button>
                      </div>
                    </div>

                  </section>
                </div>
              </div>
              <div className="md:col-span-1 space-y-4 ">
                <div className="max-w-5xl w-full h-full mx-auto text-start">
                  <div className="p-6 w-full h-full bg-white rounded-lg">
                    <h5 className="font-bold">📬 Subscribe to Job Alert</h5>
                    <p className="text-sm text-gray-500 mb-2">
                      Join thousands getting job updates weekly
                    </p>
                    <form action="">
                      <input type="email"
                        placeholder="Enter your email here!"
                        value=""
                        className="w-full border border-gray-300 hover:border-yellow-300 rounded px-3 py-2 text-sm mb-2 focus:ring-2 focus:ring-blue-500"
                      />
                    </form>
                    <button className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm font-semibold hover:bg-yellow-900">
                      <b>Subscribe</b>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
