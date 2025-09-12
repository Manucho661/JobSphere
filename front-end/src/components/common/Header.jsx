import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <div className="header">
      {/* Left Section: Logo + Title */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <img src="images/logo.png" alt="JobSphere Logo" className="w-10 h-10 object-contain" />
          <span className="text-xl font-bold text-[#00192D]">JobSphere</span>
        </div>
        <h1 className="text-lg font-semibold text-[#00192D] flex items-center gap-2">
          <i className="fas fa-users"></i>
          Welcome Back
        </h1>
      </div>

      {/* Right Section: Nav Links */}
      <div className="flex gap-6">
        <Link
          to="/login"
          className="text-[#00192D] no-underline font-semibold hover:text-blue-600 transition"
        >
          <i className="fas fa-sign-out-alt mr-1"></i> Login/Register
        </Link>
        <Link
          to="/employer"
          className="text-[#00192D] no-underline font-semibold hover:text-blue-600 transition"
        >
          <i className="fas fa-sign-out-alt mr-1"></i> Employer
        </Link>
      </div>
    </div>

  );
};

export default Header;
