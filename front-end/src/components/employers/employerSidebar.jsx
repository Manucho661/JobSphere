import React from 'react';
import { Link } from 'react-router-dom';

const EmployerSidebar = () => {
  return (
    <nav class="sidebar">
      <h5 class="text-center text-uppercase">Dashboard</h5>
      <Link to="/employer/dashboard">🏠 Dashboard</Link>
      <Link to="/employer/post-job">➕ Post Job</Link> {/* This links to the PostJob page */}
      <a href="#">📄  Manage Jobs</a>
      <a href="#">🏢 Applications</a>
      <a href="#">📅 Interviews</a>
      <a href="#">📄  Manage Jobs</a>
      <a href="#">🏢 Company Profile</a>
      <a href="#">⚙️ Settings</a>
      <a href="#">🚪 Log Out</a>
    </nav>
  );
};

export default EmployerSidebar;