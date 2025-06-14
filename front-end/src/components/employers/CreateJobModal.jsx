// src/components/CreateJobModal.jsx
import React from 'react';
import apiClient from '../../api/apiClient'; // your configured axios instance

const CreateJobModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = {
      title: e.target.title.value,
      location: e.target.location.value,
      description: e.target.description.value,
      employerId: e.target. employerId.value,
      salary: e.target.salary.value,
      type: e.target.type.value,
    };

    try {
      const response = await apiClient.post('/jobs', jobData);
      console.log("✅ Job posted successfully:", response.data);
      onClose(); // optionally close modal after successful post
    } catch (error) {
      console.error("❌ Error posting job:", error.response?.data || error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create New Job</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" name="title" placeholder="Job Title" className="w-full border p-2 rounded" required />
          <input type="text" name="location" placeholder="Location" className="w-full border p-2 rounded" required />
          <input type="text" name="description" placeholder="description" className="w-full border p-2 rounded" required />
           <input type="number" name="employerId" placeholder="employerId" className="w-full border p-2 rounded" required />
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
