import React, { useState } from 'react';
import Sidebar from '../components/employers/employerSidebar';

const EmployerLayout = ({}) =>{
    return(
        <div className="app-wrapper p-6">
            <Sidebar />
            <div className='main'>
                <div className='container mt-2'>
                    <div className='row  mt-4'>
                        <div className='col-12 d-flex justify-content-between'>
                            <div>
                                <h4 className='dashboard-title'>Your	Dashboard</h4>
                            </div> 
                            <div className='d-flex'>
                            <Link
                                to="/employer/post-job"
                                className="btn btn-sm"
                                style={{
                                    backgroundColor: '#198754', // Bootstrap success green
                                    marginLeft: '2px',
                                    marginRight: '2px',
                                    color: '#fff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '6px 12px',
                                    borderRadius: '4px',
                                    fontWeight: '500',
                                    textDecoration: 'none',
                                }}
                                title="Post Job"
                                >
                                <i className="fas fa-briefcase"></i>
                                Post Job
                                </Link>
                                <button
                                className="btn btn-sm"
                                style={{
                                    backgroundColor: '#6c757d', // Bootstrap secondary grey
                                    marginLeft: '2px',
                                    marginRight: '2px',
                                    color: '#fff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '6px 12px',
                                    borderRadius: '4px',
                                    fontWeight: '500',
                                }}
                                title="Help"
                                >
                                <i className="fas fa-question-circle"></i>
                                Help
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

  export default EmployerLayout;