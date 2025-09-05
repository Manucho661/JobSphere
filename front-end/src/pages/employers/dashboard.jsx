import React, { useState } from "react";
import CreateJobModal from "../../components/employers/CreateJobModal";
import Sidebar from "../../components/employers/EmployerSidebar";
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
        <div className="col-12 d-flex justify-content-between">
          <div >
            <h6>Employer / Dashboard</h6>
          </div>
          <div className="d-flex mb-3">
            <Link
              to="/employer/post-job"
              className="btn btn-sm"
              style={{
                backgroundColor: "#002B5B", // Bootstrap success green
                marginLeft: "2px",
                marginRight: "2px",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 12px",
                borderRadius: "4px",
                fontWeight: "500",
                textDecoration: "none",
              }}
              title="Post Job"
            >
              <i className="fas fa-briefcase"></i>
              Post Job
            </Link>
            <button
              className="btn btn-sm"
              style={{
                backgroundColor: "#6c757d", // Bootstrap secondary grey
                marginLeft: "2px",
                marginRight: "2px",
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
              Load Account
            </button>
            <button
              className="btn btn-sm"
              style={{
                backgroundColor: "#6c757d", // Bootstrap secondary grey
                marginLeft: "2px",
                marginRight: "2px",
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="max-w-full">
          <div className="bg-white px-4 border-0 shadow rounded-lg">
            <p className="font-bold flex items-center p-1 m-0 text-gray-500">
              Recent job posts
            </p>

            {/* Job Row */}
            <div className="flex flex-wrap items-center text-gray-800 py-4 rounded mb-2 bg-gray-100 shadow-sm postedJobRow">
              {/* Job title & description */}
              <div className="w-full md:w-1/3 truncate">
                <strong>Software Engineer</strong>
                <div className="text-sm text-gray-500 truncate max-w-[250px]">
                  Exciting opportunity to join our growing dev team working with React, Node.js, and cloud...
                </div>
              </div>

              {/* Applicants */}
              <div className="text-white rounded px-2 py-1 text-sm ml-2" style={{ background: '#336699' }}>
                24 Applicants
              </div>

              {/* Dates */}
              <div className="w-full md:w-1/3 flex flex-col md:items-end text-sm mt-2 md:mt-0">
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
              <div className="flex gap-2 justify-end w-full md:w-1/4 mt-2 md:mt-0">
                <button className="p-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50">
                  <i className="bi bi-pencil-square"></i>
                </button>
                <button className="p-2 border border-red-500 text-red-500 rounded hover:bg-red-50">
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>

            {/* Duplicate the same block for other job rows */}
          </div>
        </div>
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
