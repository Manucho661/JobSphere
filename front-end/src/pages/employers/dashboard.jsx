import React, { useState } from 'react';
import CreateJobModal from '../../components/employers/CreateJobModal';
import employerSidebar from '../../components/employers/employerSidebar';

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
          <div class="row">
   
    <div class="col-md-3">
      <div class="card  border-0 shadow h-100">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">Card One</h5>
          <p class="card-text">Are there people who truly inspire us? Yes, they exist all around us.</p>
          <a href="#" class="btn btn-primary">Learn more</a>
        </div>
      </div>
    </div>

   
    <div class="col-md-3">
      <div class="card  border-0 shadow h-100">
        <div class="card-body d-flex flex-column ">
          <h5 class="card-title">Card Two</h5>
          <p class="card-text">Are there people who challenge your thinking? That’s where growth begins.</p>
          <a href="#" class="btn btn-primary">Discover</a>
        </div>
      </div>
    </div>

  
    <div class="col-md-3">
      <div class="card  border-0 shadow h-100">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">Card Three</h5>
          <p class="card-text">Are there people who support you through tough times? Never take them for granted.</p>
          <a href="#" class="btn btn-primary">Support</a>
        </div>
      </div>
    </div>

   
    <div class="col-md-3">
      <div class="card border-0 shadow h-100">
        <div class="card-body  d-flex flex-column ">
          <h5 class="card-title">Card Four</h5>
          <p class="card-text">Are there people who simply listen? Their presence speaks volumes.</p>
          <a href="#" class="btn btn-primary">Listen</a>
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
