  import React, { useState } from 'react';
  import { Link } from 'react-router-dom';


  const Header = () => {
    return (
      <div className="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div className="logo-section">
            <img src="images/logo.png" alt="JobSphere Logo" className="logo-img" />
            <span className="brand-name">JobSphere</span>
          </div>
          <h1 style={{ margin: 0, fontSize: '20px' }}>
            <i className="fas fa-users" style={{ color: '#FFC107' }}></i> Welcome Shaleen
          </h1>
        </div>
        <div className="nav-links" style={{ display: "flex", gap: "20px" }}>
          <b> <a href="dashboard.php" style={{ color: "#00192D", textDecoration: "none"}}>
            <i className="fas fa-home"></i> Dashboard
          </a></b>
          <b>
            <a href="units_page.php" style={{ color: "#00192D", textDecoration: "none" }}>
             <i className="fas fa-building"></i> Employer
            </a>
          </b>
          <b>
            <a href="logout.php" style={{ color: "#00192D", textDecoration: "none" }}>
              <i className="fas fa-sign-out-alt"></i> Login
            </a>
          </b>
        </div>
      </div>
    );
  };
  
  export default Header;
  