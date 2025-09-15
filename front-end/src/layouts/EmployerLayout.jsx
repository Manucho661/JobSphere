import React, { useState } from "react";
import Sidebar from "../components/employers/EmployerSidebar";
import Header from "../components/employers/EmployerHeader";
import Footer from "../components/employers/Footer";
import "../styles/EmployerLayout.scss";
import { Outlet } from "react-router-dom"; // ✅ Must import this!

const EmployerLayout = () => {
  return (
    <div className="app-wrapper">
      <Header />
      <Sidebar />
      <div className="main min-h-screen">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default EmployerLayout;
