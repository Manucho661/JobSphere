import React, { useState } from "react";
import Sidebar from "../components/employers/EmployerSidebar";
import Header from "../components/employers/EmployerHeader";
import Footer from "../components/employers/Footer";
import "../components/employers/EmployerLayout.scss";
import { Outlet } from "react-router-dom"; // ✅ Must import this!

const EmployerLayout = () => {
  return (
    <div className="employer-app-wrapper">
      <Header />
      <Sidebar />
      <div className="employerMain mt-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default EmployerLayout;
