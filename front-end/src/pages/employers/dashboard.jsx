import React, { useState } from "react";
import CreateJobModal from "../../components/employers/CreateJobModal";
import Sidebar from "../../components/employers/EmployerSidebar";
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
    <div className="container ">
      <div className="row">
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
      <div class="row">
        <div className="col-md-3">
          <div className="card border-0  h-100 hover-shadow transition">
            <div className="card-body d-flex flex-column">
              <div className="flex-column justify-content-center align-items-center ">
                <div className="d-flex justify-content-center">
                  <div
                    className="icon bg-primary bg-opacity-10 rounded-circle d-flex justify-content-center align-items-center me-3"
                    style={{ width: 40, height: 40 }}
                  >
                    <FaBriefcase size={20} />
                  </div>
                </div>

                <div className="d-flex justify-content-center">
                  <h5 className="card-title mb-0 fw-semibold text-muted">
                    13 Posted jobs
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div className="card border-0  h-100 hover-shadow transition">
            <div className="card-body d-flex flex-column">
              <div className=" align-items-center ">
                <div className="d-flex justify-content-center">
                  <div
                    className="icon bg-primary bg-opacity-10 rounded-circle d-flex justify-content-center align-items-center me-3"
                    style={{ width: 40, height: 40 }}
                  >
                    <FaFileAlt size={20} />
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <h5 className="card-title mb-0 fw-semibold text-muted">
                    12 Applications
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div className="card border-0 h-100 hover-shadow transition">
            <div className="card-body d-flex flex-column">
              <div className=" align-items-center ">
                <div className="d-flex justify-content-center">
                  <div
                    className="icon bg-primary bg-opacity-10 rounded-circle d-flex justify-content-center align-items-center me-3"
                    style={{ width: 40, height: 40 }}
                  >
                    <FaEnvelope size={20} />
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <h5 className="card-title mb-0 fw-semibold">8 Messages</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div className="card border-0  h-100 hover-shadow transition">
            <div className="card-body d-flex flex-column">
              <div className=" align-items-center">
                <div className="d-flex justify-content-center">
                  <div
                    className="icon bg-primary bg-opacity-10 rounded-circle d-flex justify-content-center align-items-center me-3"
                    style={{ width: 40, height: 40 }}
                  >
                    <FaCalendarCheck size={20} />
                  </div>
                </div>

                <div className="d-flex justify-content-center">
                  <h5 className="card-title mb-0 fw-semibold">3 Interviews</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row  mt-4">
        <div className="container">
          <div className="card bg-white px-4 border-0">
            <p>recent job posts</p>
            <div className="row align-items-center text-dark py-4 rounded mb-2 border-0 bg-light postedJobRow">
              {/* Job title & description */}
              <div className="col-md-4 text-truncate">
                <strong>Software Engineer</strong>
                <div
                  className="small text-muted text-truncate"
                  style={{ maxWidth: "250px" }}
                >
                  Exciting opportunity to join our growing dev team working with
                  React, Node.js, and cloud...
                </div>
              </div>

              {/* Applicants */}
              <div className="col-md-2 text-white rounded-1" style={{ background: '#336699', width: 'fit-content', fontSize:'14px' }}>24 Applicants</div>

              {/* Dates */}
              <div className="col-md-3 d-flex gap-2 justify-content-end small">
                <div>
                  <div className="m-0 text-sm-muted">
                    <span className="fw-semibold">Posted:</span>{" "}
                    <span className="text-success">12 Aug 2025</span>{" "}
                  </div>
                  <div>
                    <span className="fw-semibold">Expires:</span>{" "}
                    <span className="text-danger">20 Aug 2025</span>{" "}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="col-md-3 d-flex gap-2 justify-content-end">
                <button className="btn btn-sm btn-outline-primary edit-btn border-0">
                  {" "}
                  <i className="bi bi-pencil-square"></i>
                </button>
                                <button className="btn btn-sm btn-outline-danger delete-btn border-0">

                  {" "}
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>

            <div className="row align-items-center text-dark py-4 rounded mb-2 border-0 bg-light">
              {/* Job title & description */}
              <div className="col-md-4 text-truncate">
                <strong>Software Engineer</strong>
                <div
                  className="small text-muted text-truncate"
                  style={{ maxWidth: "250px" }}
                >
                  Exciting opportunity to join our growing dev team working with
                  React, Node.js, and cloud...
                </div>
              </div>

              {/* Applicants */}
              <div className="col-md-2 text-white rounded-1" style={{ background: '#336699', width: 'fit-content', fontSize:'14px' }}>24 Applicants</div>


              {/* Dates */}
              <div className="col-md-3 d-flex gap-2 justify-content-end small">
                <div>
                  <div className="m-0 text-sm-muted">
                    <span className="fw-semibold">Posted:</span>{" "}
                    <span className="text-success">12 Aug 2025</span>{" "}
                  </div>
                  <div>
                    <span className="fw-semibold">Expires:</span>{" "}
                    <span className="text-danger">20 Aug 2025</span>{" "}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="col-md-3 d-flex gap-2 justify-content-end">
                <button className="btn btn-sm btn-outline-primary edit-btn border-0">
                  {" "}
                  <i className="bi bi-pencil-square"></i>
                </button>
                                <button className="btn btn-sm btn-outline-danger delete-btn border-0">

                  {" "}
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
            <div className="row align-items-center text-dark py-4 rounded-1 mb-2 border-0 bg-light">
              {/* Job title & description */}
              <div className="col-md-4 text-truncate">
                <strong>Software Engineer</strong>
                <div
                  className="small text-muted text-truncate"
                  style={{ maxWidth: "250px" }}
                >
                  Exciting opportunity to join our growing dev team working with
                  React, Node.js, and cloud...
                </div>
              </div>

              {/* Applicants */}
              <div className="col-md-2 text-white rounded-1" style={{ background: '#336699', width: 'fit-content', fontSize:'14px' }}>24 Applicants</div>


              {/* Dates */}
              <div className="col-md-3 d-flex gap-2 justify-content-end small">
                <div>
                  <div className="m-0 text-sm-muted">
                    <span className="fw-semibold">Posted:</span>{" "}
                    <span className="PostedDate text-success">12 Aug 2025</span>{" "}
                  </div>
                  <div>
                    <span className="fw-semibold">Expires:</span>{" "}
                    <span className="text-danger">20 Aug 2025</span>{" "}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="col-md-3 d-flex gap-2 justify-content-end">
                              <button className="btn btn-sm btn-outline-primary edit-btn border-0">
                  {" "}
                  <i className="bi bi-pencil-square"></i>
                </button>
                                <button className="btn btn-sm btn-outline-danger delete-btn border-0">

                  {" "}
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
            <div className="row align-items-center text-dark py-4 rounded mb-2 border-0 bg-light">
              {/* Job title & description */}
              <div className="col-md-4 text-truncate">
                <strong>Software Engineer</strong>
                <div
                  className="small text-muted text-truncate"
                  style={{ maxWidth: "250px" }}
                >
                  Exciting opportunity to join our growing dev team working with
                  React, Node.js, and cloud...
                </div>
              </div>

              {/* Applicants */}
              <div className="col-md-2 text-white rounded-1" style={{ background: '#336699', width: 'fit-content', fontSize:'14px' }}>24 Applicants</div>


              {/* Dates */}
              <div className="col-md-3 d-flex gap-2 justify-content-end small">
                <div>
                  <div className="m-0 text-sm-muted">
                  <span className="fw-semibold">Posted:</span>{" "}
                  <span className="text-success">12 Aug 2025</span>{" "}
                </div>
                <div>
                  <span className="fw-semibold">Expires:</span>{" "}
                  <span className="text-danger">20 Aug 2025</span>{" "}
                </div>
                </div>
              </div>

              {/* Actions */}
              <div className="col-md-3 d-flex gap-2 justify-content-end">
                
                <button className="btn btn-sm btn-outline-primary edit-btn border-0">
                  {" "}
                  <i className="bi bi-pencil-square"></i>
                </button>
                <button className="btn btn-sm btn-outline-danger delete-btn border-0">
                  {" "}
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* start Row */}
      <div className="row mt-4">
        <div className="col-md-8 ">
          <h6 className="text-secondary">Applications</h6>
          <div className="applicationsTableContainer bg-white p-2 rounded shadow-sm">
            <div className="tableHeaderSection">
              <div className="entries text-white rounded-top-2 p-2">
                5 entries
              </div>
            </div>
            <div>
              <table class="table table-striped table-hover">
                <thead class="table-light">
                  <tr>
                    <th>#</th>
                    <th>Applicant Name</th>
                    <th>Applied For</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>John Doe</td>
                    <td>Frontend Developer</td>
                    <td>
                      <span class="badge bg-info text-dark">Under Review</span>
                    </td>
                    <td>
                      <span class="badge bg-success">Active</span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm"
                        style={{
                          backgroundColor: "#0d6efd", // Bootstrap primary blue
                          marginLeft: "2px",
                          marginRight: "2px",
                          color: "#fff",
                        }}
                        title="View"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>Jane Smith</td>
                    <td>Backend Developer</td>
                    <td>
                      <span class="badge bg-success">Shortlisted</span>
                    </td>
                    <td>
                      <span class="badge bg-success">Active</span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm"
                        style={{
                          backgroundColor: "#0d6efd", // Bootstrap primary blue
                          marginLeft: "2px",
                          marginRight: "2px",
                          color: "#fff",
                        }}
                        title="View"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>Ali Mwangi</td>
                    <td>UI/UX Designer</td>
                    <td>
                      <span class="badge bg-danger">Rejected</span>
                    </td>
                    <td>
                      <span class="badge bg-success">Active</span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm"
                        style={{
                          backgroundColor: "#0d6efd", // Bootstrap primary blue
                          marginLeft: "2px",
                          marginRight: "2px",
                          color: "#fff",
                        }}
                        title="View"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <h6 className="text-secondary">Interviews</h6>
          <div className="bg-white p-2 rounded shadow-sm">
            <div className="messages-header-section">
              <div className="entries text-white rounded-top-2 p-2">
                5 entries
              </div>
            </div>
            <ul class="list-group rounded-top-0">
              <li class="list-group-item">John Doe - May 5, 10:00 AM</li>
              <li class="list-group-item">Jane Smith - May 6, 2:00 PM</li>
              <li class="list-group-item">Grace Wambui - May 7, 11:00 AM</li>
            </ul>
          </div>
        </div>
      </div>
      <button
        onClick={() => setShowModal(true)}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        + Create New Job
      </button>
      <CreateJobModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
    // </div>
    // </div>
  );
};

export default EmployerDashboard;
