import React, { useState } from 'react';
import CreateJobModal from '../../components/CreateJobModal';

const EmployerDashboard = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Employer Dashboard</h1>
      <button
        onClick={() => setShowModal(true)}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        + Create New Job
      </button>

      <CreateJobModal isOpen={showModal} onClose={() => setShowModal(false)} />

      {/* Your posted jobs list would go here */}
      <p>Posted jobs will appear here...</p>
    </div>
  );
};

export default EmployerDashboard;
