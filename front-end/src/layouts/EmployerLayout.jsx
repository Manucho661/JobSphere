import React, { useState } from 'react';
import Sidebar from '../components/employers/EmployerSidebar';
import Header from '../components/employers/EmployerHeader';
import './employerlayout.css';
import { Outlet } from "react-router-dom"; // ✅ Must import this!

const EmployerLayout = () => {
  return (
    <div>
      <Header/>
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default EmployerLayout;