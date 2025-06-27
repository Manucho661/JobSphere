import React, { useState } from 'react';
import Sidebar from '../components/employers/employerSidebar';

const EmployerLayout = ({}) =>{
    return(
        <div className="app-wrapper p-6">
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit voluptatem eveniet perferendis eos non consequatur nobis fugiat aspernatur beatae earum soluta dolore harum porro, consequuntur temporibus culpa vitae animi commodi.</p>
            <Sidebar />
            <div className='main'>
                <div className='container mt-2'>
                    <div className='row  mt-4'>
                        <div className='col-12 d-flex justify-content-between'>
                            <div>
                                <h4 className='dashboard-title'>Your Dashboard</h4>
                            </div> 
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

  export default EmployerLayout;