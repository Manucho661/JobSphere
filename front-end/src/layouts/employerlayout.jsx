import React, { useState } from 'react';
import Sidebar from '../components/employers/employerSidebar';
import './employerlayout.css';
const EmployerLayout = ({ children}) =>{
    return(
        <div className="app-wrapper p-6">
            <Sidebar />
            <div className="main p-6">{children}</div>
            
        </div>
        
    )
}
  export default EmployerLayout;