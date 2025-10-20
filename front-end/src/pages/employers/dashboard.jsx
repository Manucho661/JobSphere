import React, { useState } from "react";
import CreateJobModal from "../../components/employers/CreateJobModal";
import JobTrendsChart from "../../components/employers/postedJobsGraph";
import { FaBriefcase } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./employers.css";

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
            <h6>Home</h6>
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
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Posted Jobs */}
        <div className="bg-white shadow-sm rounded-lg h-full hover:shadow-md transition">
          <div className="flex flex-col items-center justify-center p-4 h-full">
            <div className="flex justify-center mb-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600">
                <FaBriefcase size={20} />
              </div>
            </div>
            <h5 className="text-sm font-semibold text-gray-600">13 Posted Jobs</h5>
          </div>
        </div>

        {/* Applications */}
        <div className="bg-white shadow-sm rounded-lg h-full hover:shadow-md transition">
          <div className="flex flex-col items-center justify-center p-4 h-full">
            <div className="flex justify-center mb-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600">
                <FaFileAlt size={20} />
              </div>
            </div>
            <h5 className="text-sm font-semibold text-gray-600">12 Applications</h5>
          </div>
        </div>

        {/* Messages */}
        <div className="bg-white shadow-sm rounded-lg h-full hover:shadow-md transition">
          <div className="flex flex-col items-center justify-center p-4 h-full">
            <div className="flex justify-center mb-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600">
                <FaEnvelope size={20} />
              </div>
            </div>
            <h5 className="text-sm font-semibold text-gray-700">8 Messages</h5>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-white shadow-sm rounded-lg h-full hover:shadow-md transition">
          <div className="flex flex-col items-center justify-center p-4 h-full">
            <div className="flex justify-center mb-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600">
                <FaCalendarCheck size={20} />
              </div>
            </div>
            <h5 className="text-sm font-semibold text-gray-700">Upcoming Events</h5>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 bg-white p-2">
        {/* Job Row */}
        {/* Job title & description */}
        <div className="w-full">
          <strong>Software Engineer</strong>
        </div>

        {/* Applicants */}
        <div
          className="flex items-center justify-center text-white rounded px-2 py-1 text-sm ml-2"
          style={{ background: '#336699' }}
        >
          24 Applicants
        </div>


        {/* Dates */}
        <div className="w-full flex flex-col md:items-end text-sm mt-2 md:mt-0">
          <div>
            <span className="font-semibold">Posted:</span>{" "}
            <span className="text-green-600">12 Aug 2025</span>
          </div>
          <div>
            <span className="font-semibold">Expires:</span>{" "}
            <span className="text-red-600">20 Aug 2025</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 justify-end w-full mt-2 md:mt-0">
          <button className="p-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 cursor-pointer">
            <i className="bi bi-eye"></i>
          </button>
          <button className="p-2 border border-red-500 text-red-500 rounded hover:bg-red-50 cursor-pointer">
            <i className="bi bi-trash"></i>
          </button>
        </div>

        {/* Duplicate the same block for other job rows */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 bg-white p-2">
        {/* Job Row */}
        {/* Job title & description */}
        <div className="w-full">
          <strong>Software Engineer</strong>
        </div>

        {/* Applicants */}
        <div
          className="flex items-center justify-center text-white rounded px-2 py-1 text-sm ml-2"
          style={{ background: '#336699' }}
        >
          24 Applicants
        </div>

        {/* Dates */}
        <div className="w-full flex flex-col md:items-end text-sm mt-2 md:mt-0">
          <div>
            <span className="font-semibold">Posted:</span>{" "}
            <span className="text-green-600">12 Aug 2025</span>
          </div>
          <div>
            <span className="font-semibold">Expires:</span>{" "}
            <span className="text-red-600">20 Aug 2025</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 justify-end w-full mt-2 md:mt-0">
          <button className="p-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 cursor-pointer">
            <i className="bi bi-eye"></i>
          </button>
          <button className="p-2 border border-red-500 text-red-500 rounded hover:bg-red-50 cursor-pointer">
            <i className="bi bi-trash"></i>
          </button>
        </div>

        {/* Duplicate the same block for other job rows */}
      </div>

      {/* start Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="col-span-1 md:col-span-2">
          <JobTrendsChart title="Job Activity (Last 4 Weeks)" />
        </div>
      </div>


      <CreateJobModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
    // </div>
    // </div>
  );
};

export default EmployerDashboard;
