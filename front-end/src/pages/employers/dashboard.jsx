import React, { useState } from 'react';
import CreateJobModal from '../../components/employers/CreateJobModal';
import employerSidebar from '../../components/employers/employerSidebar';
import { FaBriefcase } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa"; 
import { FaEnvelope } from "react-icons/fa"; 
import { FaCalendarCheck } from "react-icons/fa";


import "./employers.css";

const EmployerDashboard = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="app-wrapper p-6">
       <nav class="sidebar">
        <h5 class="text-center text-uppercase">Dashboard</h5>
        <a href="#">🏠 Home</a>
        <a href="#">🏢 Properties</a>
        <a href="#">👥 Tenants</a>
        <a href="#">🛠 Maintenance</a>
       
        <a class="d-flex justify-content-between align-items-center" data-bs-toggle="collapse" href="#goalsMenu" role="button" aria-expanded="false" aria-controls="goalsMenu">
            🎯 Goals
            <span class="caret" id="caretIcon">▼</span>
        </a>
        <div class="collapse submenu" id="goalsMenu">
            <a href="#">📅 Monthly</a>
            <a href="#">📆 Yearly</a>
        </div>
        <a href="#">⚙️ Settings</a>
      </nav>
      {/* main */}
      <div className='main'>
        <div className='container mt-2'>
          <h4 className='dashboard-title text-muted'>Your	Dashboard</h4>
          
          <div class="row">
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
                  <a href="#" className="btn btn-outline manage mt-auto">View Applications</a>
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
                  <a href="#" className="btn btn-outline manage mt-auto">Open Inbox</a>
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
             <h6 className='text-secondary'>Job Postings</h6>
            <div className='col-md-8'>

              <div className='jobPostingsTableContainer bg-white p-2 rounded shadow-sm'>
                <div className='tableHeaderSection'>
                  <div className='entries'>
                    <p style={{ paddingLeft:5}}>5 entries</p>
                  </div>
                  <div>

                  </div>
                </div>
                <table class="table table-striped  table-hover rounded">
                  <thead class="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Job Title</th>
                      <th>Posted On</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Frontend Developer</td>
                      <td>May 30, 2025</td>
                      <td><span class="badge bg-success">Active</span></td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Backend Developer</td>
                      <td>May 28, 2025</td>
                      <td><span class="badge bg-secondary">Closed</span></td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>UI/UX Designer</td>
                      <td>May 25, 2025</td>
                      <td><span class="badge bg-warning text-dark">Pending</span></td>
                    </tr>
                  </tbody>
                </table>
              </div> 
            </div>
            <div className='col-4'>
              <h4 className='text-secondary'>📩 Messages</h4>
              <hr />
              <div class="card mb-4 shadow-sm">
                <div class="card-header d-flex justify-content-between align-items-center">
                  <h5 class="mb-0">Messages <span class="badge bg-primary">3 new</span></h5>
                  <a href="/messages" class="small">View All</a>
                </div>
                <div class="card-body">
                
                  <ul class="list-group">
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
          </div>

          <div className='row'>

            <div className='col-md-8'>
              <h4>Applicaions</h4>
              <hr />
              <table class="table table-striped table-bordered table-hover">
                <thead class="table-light">
                  <tr>
                    <th>#</th>
                    <th>Applicant Name</th>
                    <th>Applied For</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>John Doe</td>
                    <td>Frontend Developer</td>
                    <td><span class="badge bg-info text-dark">Under Review</span></td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jane Smith</td>
                    <td>Backend Developer</td>
                    <td><span class="badge bg-success">Shortlisted</span></td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Ali Mwangi</td>
                    <td>UI/UX Designer</td>
                    <td><span class="badge bg-danger">Rejected</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='col-md-4'>
               <h4>Interviews</h4>
              <hr />
              <div class="card shadow-sm"style={{ flex: '1 1 45%', minWidth: '300px' }} >
                <div class="card-header">
                  <h5>Interviews</h5>
                </div>
                <div class="card-body">
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">John Doe - May 5, 10:00 AM</li>
                    <li class="list-group-item">Jane Smith - May 6, 2:00 PM</li>
                    <li class="list-group-item">Grace Wambui - May 7, 11:00 AM</li>
                  </ul>
                </div>
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
            <p>Posted jobs will appear here...</p>
        </div>  
      </div>
    </div>
  );
};

export default EmployerDashboard;
