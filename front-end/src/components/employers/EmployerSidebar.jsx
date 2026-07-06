import React from 'react';
import { Link } from 'react-router-dom';

const EmployerSidebar = () => {
  return (
    <nav id='sidebar' className="employer-sidebar">
     
      <Link to="/employer/dashboard">🏠 Dashboard</Link>
      <Link to="/employer/post-job">➕ Post Job</Link> 
      <a href="#">🏢 Applications</a>
      <Link to="/employer/manage-jobs">📄Manage Jobs</Link>
      <Link to="/employer/company-profile">🏢 Company Profile</Link> 
      <a href="#">⚙️ Settings</a>
      <a href="#">🚪 Log Out</a>
    </nav>
  );
};

export default EmployerSidebar;