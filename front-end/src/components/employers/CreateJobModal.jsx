// src/components/CreateJobModal.jsx
import React from 'react';

const CreateJobModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSubmit = async (e) => {
  e.preventDefault();

  const jobData = {
    title: e.target.title.value,
    location: e.target.location.value,
    salary: e.target.salary.value,
    type: e.target.type.value,
  };

  try {
    const response = await fetch('http://localhost:5000/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobData),
    });

    if (!response.ok) {
      throw new Error('Failed to submit job');
    }

    const data = await response.json();
    console.log('Job submitted successfully:', data);
    onClose();
  } catch (error) {
    console.error('Error submitting job:', error);
  }
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create New Job</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" name="title" placeholder="Job Title" className="w-full border p-2 rounded" required />
          <input type="text" name="location" placeholder="Location" className="w-full border p-2 rounded" required />
          <input type="number" name="salary" placeholder="Salary" className="w-full border p-2 rounded" required />
          <select name="type" className="w-full border p-2 rounded" required>
            <option value="">Select Type</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Remote">Remote</option>
          </select>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJobModal;
