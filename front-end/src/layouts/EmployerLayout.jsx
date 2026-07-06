import React, { useState } from "react";
import EmployerSidebar from "../components/employers/EmployerSidebar";
import Header from "../components/employers/Header";
import Footer from "../components/employers/Footer";
import "./EmployerLayout.css";
import { Outlet } from "react-router-dom"; // ✅ Must import this!

const EmployerLayout = () => {
  return (
    <div className="employer-app-wrapper">
      <Header />
      <EmployerSidebar />
      <div className="employerMain">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default EmployerLayout;
