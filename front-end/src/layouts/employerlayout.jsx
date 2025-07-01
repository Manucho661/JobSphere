import React, { useState } from 'react';
import Sidebar from '../components/employers/employerSidebar';
import './employerlayout.css';
import { Outlet } from "react-router-dom"; // ✅ Must import this!

const EmployerLayout = () => {
  return (
    <div>
        <Sidebar/>
      <h1>Employer Layout</h1>
      <Outlet />
    </div>
  );
};

  export default EmployerLayout;