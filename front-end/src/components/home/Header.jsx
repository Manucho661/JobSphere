import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ResponsiveNav from '../responsiveNav';


const Header = () => {
  const navItems = [
    { id: 1, label: 'Home', to: '/' },
    { id: 2, label: 'Sign In', to: '/login' },
    { id: 3, label: 'Employer', to: '/employer' },
  ];
  return (
    <div className="header">
      {/* Left Section: Logo + Title */}
      <div className="mt-2 grid md:grid-cols-5 w-full gap-6">
        <div className="md:col-span-1 flex items-center gap-2">
          <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-yellow-500 font-semibold">
            <b>JS</b>
          </div>
          <span className="text-xl font-bold text-[#00192D]">JobSphere</span>
        </div>
        <div className='md:col-span-2 flex items-center'>
          <h1 style={{ margin: 0, fontSize: '20px' }}>
            <i className="fas fa-users" style={{ color: "#00192D", textDecoration: "none" }}></i> <b><i>Where Talent Meet Opportunities</i></b>
          </h1>
        </div>
        {/* Right Section: Nav Links */}
        <div className="md:col-span-2 gap-6 p-2 rounded-lg">
          <ResponsiveNav items={navItems} />
        </div>
      </div>
    </div>

  );
};

export default Header;
