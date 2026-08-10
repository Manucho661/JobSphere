import ResponsiveNav from '../ResponsiveNav';
import React, { useContext } from 'react';

import { useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from '../../pages/auth/AuthContext';

const Header = ({ showRoleModal }) => {
  const [isOpen, setIsOpen] = useState(false);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!storedUser;
  const userRole = storedUser?.role; // 'employer' or 'jobseeker'
  const userName = storedUser?.name;

  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();     // wait until logout state is cleared
    navigate('/');      // then go home
    console.log("Logout clicked");

  };

  return (
    <div className="header">
      {/* Left Section: Logo + Title */}
      <div className="w-full py-2">


        <nav className="bg-white ">
          <div className="max-w-7xl mx-auto ">
            <div className="relative flex items-center justify-between h-16">

              {/* Brand - Left */}
              <Link to="/" className="flex items-center shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-primary rounded-full flex items-center justify-center text-yellow-500 font-semibold">
                    <b>JS</b>
                  </div>

                  <span className="text-lg lg:text-xl font-bold text-[#00192D]">
                    JobSphere
                  </span>
                </div>
              </Link>

              {/* Tagline - Center */}
              <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center">
                <h1 className="text-base xl:text-xl font-semibold text-[#00192D] whitespace-nowrap">
                  <i className="fas fa-users mr-2"></i>
                  <i>Where Talent Meet Opportunities</i>
                </h1>
              </div>

              {/* Desktop Navigation - Right */}
              <div className="hidden lg:flex items-center gap-5 ml-auto">

                {isLoggedIn ? (
                  <>
                    <span className="text-gray-700 font-medium whitespace-nowrap">
                      {userName}
                    </span>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="text-gray-700 hover:text-gray-900 font-medium transition whitespace-nowrap"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-gray-700 hover:text-gray-900 font-medium transition whitespace-nowrap"
                    >
                      Login
                    </Link>

                    <button
                      type="button"
                      onClick={() => showRoleModal(true)}
                      className="bg-black text-white px-5 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition whitespace-nowrap"
                    >
                      Get Started
                    </button>
                  </>
                )}

              </div>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:bg-gray-100"
                aria-label="Toggle navigation"
                aria-expanded={isOpen}
              >
                {isOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>

            </div>

            {/* Mobile Navigation */}
            {isOpen && (
              <div className="lg:hidden border-t border-gray-200 py-4">
                <div className="flex flex-col gap-3">

                  {isLoggedIn ? (
                    <>
                      <div className="text-gray-700 font-medium px-2 py-2">
                        {userName}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                        className="text-gray-700 hover:text-gray-900 font-medium px-2 py-2 text-left"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setIsOpen(false)}
                        className="text-gray-700 hover:text-gray-900 font-medium px-2 py-2"
                      >
                        Login
                      </Link>

                      <button
                        type="button"
                        onClick={() => {
                          showRoleModal(true);
                          setIsOpen(false);
                        }}
                        className="bg-black text-white text-center px-5 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition"
                      >
                        Get Started
                      </button>
                    </>
                  )}

                </div>
              </div>
            )}
          </div>
        </nav>

      </div>

    </div>

  );
};

export default Header;
