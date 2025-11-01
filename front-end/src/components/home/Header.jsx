import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <div className="header">
      {/* Left Section: Logo + Title */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-yellow-500 font-semibold">
           <b>JS</b> 
          </div>
          <span className="text-xl font-bold text-[#00192D]">JobSphere</span>
        </div>
        <h1 style={{ margin: 0, fontSize: '20px' }}>
          <i className="fas fa-users" style={{ color: "#00192D", textDecoration: "none" }}></i> <b><i>Where Talent Meet Opportunities</i></b>
        </h1>
      </div>

      {/* Right Section: Nav Links */}
      <div className="flex gap-6 bg-gray-100 p-2 rounded-lg">

        <Link
          to="/login"
          className="text-[#00192D] no-underline font-semibold hover:text-yellow-600 transition"
        >
          <i className="fas fa-sign-out-alt mr-1"> </i> <b>Sign In</b>
        </Link>
        <Link
          to="/register"
          className="text-[#00192D] no-underline font-semibold hover:text-yellow-600 transition rounded-lg"
        >
          <i className="fas fa-sign-out-alt mr-1"></i> <b>Sign Up</b> 
        </Link>
        <Link
          to="/employer"
          className="text-[#00192D] no-underline font-semibold hover:text-yellow-600 transition"
        >
          <i className="fas fa-sign-out-alt mr-1"></i>  <b>Employer</b>
        </Link>
      </div>
    </div>

  );
};

export default Header;
