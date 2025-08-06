import React, { useState } from 'react';
import CreateJobModal from '../../components/employers/CreateJobModal';
import Sidebar from '../../components/employers/EmployerSidebar';
import { FaBriefcase } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa"; 
import { FaEnvelope } from "react-icons/fa"; 
import { FaCalendarCheck } from "react-icons/fa";
import { Link } from 'react-router-dom';
import "./employers.css";

const EmployerDashboard = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    // <div className="app-wrapper p-6">
      // <div className='main'>
        <div className='container mt-2'>
          
          <div className='row  mt-4'>
            <div className='col-12 d-flex justify-content-between'>
              <div>
                <h4 className='dashboard-title'>Your	Dashboard</h4>
              </div> 
              <div className='d-flex'>
              <Link
                  to="/employer/post-job"
                  className="btn btn-sm"
                  style={{
                    backgroundColor: '#198754', // Bootstrap success green
                    marginLeft: '2px',
                    marginRight: '2px',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    fontWeight: '500',
                    textDecoration: 'none',
                  }}
                  title="Post Job"
                >
                  <i className="fas fa-briefcase"></i>
                  Post Job
                </Link>
                <button
                  className="btn btn-sm"
                  style={{
                    backgroundColor: '#6c757d', // Bootstrap secondary grey
                    marginLeft: '2px',
                    marginRight: '2px',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    fontWeight: '500',
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
                <h6 className="text-secondary">Summary</h6>
            <div className="col-md-3">
              <div className="card border-0 shadow-sm h-100 hover-shadow transition">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex align-items-center mb-3">
                    <div className="icon bg-primary bg-opacity-10 rounded-circle d-flex justify-content-center align-items-center me-3" style={{ width: 40, height: 40}}>
                      <FaBriefcase size={20} />
                    </div>
                    <h5 className="card-title mb-0 fw-semibold">4 Job Postings</h5>
                  </div>
                  <p className="card-text text-muted mb-3">3 Active, 1 Expired</p>
                  <a href="#" className="btn btn-outline manage mt-auto">Manage</a>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div className="card border-0 shadow-sm h-100 hover-shadow transition">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex align-items-center mb-3">
                    <div
                      className="icon bg-success bg-opacity-10 rounded-circle d-flex justify-content-center align-items-center me-3"
                      style={{ width: 40, height: 40 }}
                    >
                      <FaFileAlt size={20} />
                    </div>
                    <h5 className="card-title mb-0 fw-semibold">12 Applications</h5>
                  </div>
                  <p className="card-text text-muted mb-3">5 New, 4 Reviewed, 3 Shortlisted</p>
                  <a href="#" className="btn btn-outline manage mt-auto">View </a>
                </div>
              </div>
            </div>
            <div class="col-md-3">
             <div className="card border-0 shadow-sm h-100 hover-shadow transition">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex align-items-center mb-3">
                    <div
                      className="icon bg-warning bg-opacity-10 rounded-circle d-flex justify-content-center align-items-center me-3"
                      style={{ width: 40, height: 40 }}
                    >
                      <FaEnvelope size={20} />
                    </div>
                    <h5 className="card-title mb-0 fw-semibold">8 Messages</h5>
                  </div>
                  <p className="card-text text-muted mb-3">2 Unread, 6 Read</p>
                  <a href="#" className="btn btn-outline manage mt-auto">Open</a>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div className="card border-0 shadow-sm h-100 hover-shadow transition">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex align-items-center mb-3">
                    <div
                      className="icon bg-info bg-opacity-10 rounded-circle d-flex justify-content-center align-items-center me-3"
                      style={{ width: 40, height: 40 }}
                    >
                      <FaCalendarCheck size={20} />
                    </div>
                    <h5 className="card-title mb-0 fw-semibold">3 Interviews</h5>
                  </div>
                  <p className="card-text text-muted mb-3">1 Today, 2 Upcoming</p>
                  <a href="#" className="btn btn-outline manage mt-auto">View Schedule</a>
                </div>
              </div>
            </div>
          </div>
          <div className='row mt-4'>
            
            <div className='col-md-8 '>
              <h6 className='text-secondary'>Job Postings</h6>
              <div className='jobPostingsTableContainer bg-white p-2 rounded shadow-sm' >
                <div className='tableHeaderSection'>
                  <div className='entries text-white rounded-top-2 p-2'>
                   5 entries
                  </div>
                  <div>

                  </div>
                </div>
                <table class="table table-striped  table-hover rounded">
                  <thead class="table-gray">
                    <tr>
                      <th>Job Title</th>
                      <th>Posted On</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Frontend Developer</td>
                      <td>May 30, 2025</td>
                      <td><span class="badge bg-success">Active</span></td>
                      <td>
                        <button
                          className="btn btn-sm"
                          style={{
                            backgroundColor: '#0d6efd', // Bootstrap primary blue
                            marginLeft: '2px',
                            marginRight: '2px',
                            color: '#fff',
                          }}
                          title="View">
                          <i className="fas fa-eye"></i>
                        </button>
                        <button
                          className="btn btn-sm"
                          style={{
                            backgroundColor: '#1e6f5c',
                            marginLeft: '2px',
                            marginRight: '2px',
                            color: '#fff',
                          }}
                          title="Edit"
                            >
                          <i className="fas fa-edit"></i>
                        </button>
                                                <button
                          className="btn btn-sm"
                          style={{
                            backgroundColor: '#b02a37',
                            marginLeft: '2px',
                            marginRight: '2px',
                            color: '#fff',
                          }}
                          title="Delete"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                        </td>
                    </tr>
                    <tr>
                      <td>Backend Developer</td>
                      <td>May 28, 2025</td>
                      <td><span class="badge bg-secondary">Closed</span></td>
                      <td>
                        <button
                          className="btn btn-sm"
                          style={{
                            backgroundColor: '#0d6efd', // Bootstrap primary blue
                            marginLeft: '2px',
                            marginRight: '2px',
                            color: '#fff',
                          }}
                          title="View">
                          <i className="fas fa-eye"></i>
                        </button>
                        <button
                          className="btn btn-sm"
                          style={{
                            backgroundColor: '#1e6f5c',
                            marginLeft: '2px',
                            marginRight: '2px',
                            color: '#fff',
                          }}
                          title="Edit"
                            >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          className="btn btn-sm"
                          style={{
                            backgroundColor: '#b02a37',
                            marginLeft: '2px',
                            marginRight: '2px',
                            color: '#fff',
                          }}
                          title="Delete"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>UI/UX Designer</td>
                      <td>May 25, 2025</td>
                      <td><span class="badge bg-warning text-dark">Pending</span></td>
                      <td>
                        <button
                          className="btn btn-sm"
                          style={{
                            backgroundColor: '#0d6efd', // Bootstrap primary blue
                            marginLeft: '2px',
                            marginRight: '2px',
                            color: '#fff',
                          }}
                          title="View"
                        >
                          <i className="fas fa-eye"></i>
                        </button>
                        <button
                          className="btn btn-sm"
                          style={{
                            backgroundColor: '#1e6f5c',
                            marginLeft: '2px',
                            marginRight: '2px',
                            color: '#fff',
                          }}
                          title="Edit"
                            >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          className="btn btn-sm"
                          style={{
                            backgroundColor: '#b02a37',
                            marginLeft: '2px',
                            marginRight: '2px',
                            color: '#fff',
                          }}
                          title="Delete"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div> 
            </div>
            <div className='col-4'>
              <h6 className='text-secondary'>In-App Messages</h6>
              <div className='bg-white p-2 rounded shadow-sm'>
                <div className='messages-header-section'>
                   <div className='entries text-white rounded-top-2 p-2'>
                   5 entries
                  </div>
                </div>
                  <ul class="list-group rounded-top-0">
                    <li class="list-group-item">
                      <strong>John Doe:</strong> Thanks for the update!
                    </li>
                    <li class="list-group-item">
                      <strong>Grace Wambui:</strong> Can we reschedule?
                    </li>
                    <li class="list-group-item">
                      <strong>Ali Mwangi:</strong> I uploaded my resume.
                    </li>
                  </ul>
              </div>
            </div>
          </div>
          {/* start Row */}
          <div className='row mt-4'>
            <div className='col-md-8 '>
              <h6 className='text-secondary'>Applications</h6>
              <div className='applicationsTableContainer bg-white p-2 rounded shadow-sm'>
                <div className='tableHeaderSection'>
                   <div className='entries text-white rounded-top-2 p-2'>
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
                      <td><span class="badge bg-info text-dark">Under Review</span></td>
                      <td><span class="badge bg-success">Active</span></td>
                      <td>
                        <button
                          className="btn btn-sm"
                          style={{
                            backgroundColor: '#0d6efd', // Bootstrap primary blue
                            marginLeft: '2px',
                            marginRight: '2px',
                            color: '#fff',
                          }}
                          title="View">
                          <i className="fas fa-eye"></i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>Jane Smith</td>
                      <td>Backend Developer</td>
                      <td><span class="badge bg-success">Shortlisted</span></td>
                      <td><span class="badge bg-success">Active</span></td>
                      <td>
                        <button
                          className="btn btn-sm"
                          style={{
                            backgroundColor: '#0d6efd', // Bootstrap primary blue
                            marginLeft: '2px',
                            marginRight: '2px',
                            color: '#fff',
                          }}
                          title="View">
                          <i className="fas fa-eye"></i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>Ali Mwangi</td>
                      <td>UI/UX Designer</td>
                      <td><span class="badge bg-danger">Rejected</span></td>
                       <td><span class="badge bg-success">Active</span></td>
                      <td>
                        <button
                          className="btn btn-sm"
                          style={{
                            backgroundColor: '#0d6efd', // Bootstrap primary blue
                            marginLeft: '2px',
                            marginRight: '2px',
                            color: '#fff',
                          }}
                          title="View">
                          <i className="fas fa-eye"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <h6 className='text-secondary'>Interviews</h6>
               <div className='bg-white p-2 rounded shadow-sm'>
                <div className='messages-header-section'>
                   <div className='entries text-white rounded-top-2 p-2'>
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
