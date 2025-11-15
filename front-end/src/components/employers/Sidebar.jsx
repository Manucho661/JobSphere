import React from 'react';
import { Link } from 'react-router-dom';

const EmployerSidebar = () => {
  return (
    <nav id='sidebar' className="sidebar">
      <h5 class="text-center text-uppercase">Dashboard</h5>
      <Link to="/employer/dashboard">🏠 Dashboard</Link>
      <Link to="/employer/post-job">➕ Post Job</Link> 
      <a href="#">🏢 Applications</a>
      <a href="#">📄  Manage Jobs</a>
      <Link to="/employer/company-profile">🏢 Company Profile</Link> 
      <a href="#">⚙️ Settings</a>
      <a href="#">🚪 Log Out</a>
    </nav>
  );
};

export default EmployerSidebar;