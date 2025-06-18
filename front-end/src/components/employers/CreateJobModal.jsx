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
    <div className="modal show fade d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
  <div className="modal-dialog modal-lg modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title"><i className="fas fa-briefcase me-2"></i>Create New Job</h5>
        <button type="button" className="btn-close" onClick={onClose}></button>
      </div>
      <div className="modal-body">
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input type="text" name="title" className="form-control" id="jobTitle" placeholder="Job Title" required />
            <label htmlFor="jobTitle"><i className="fas fa-briefcase me-2"></i>Job Title</label>
          </div>

          <div className="form-floating mb-3">
            <input type="text" name="location" className="form-control" id="jobLocation" placeholder="Location" required />
            <label htmlFor="jobLocation"><i className="fas fa-map-marker-alt me-2"></i>Location</label>
          </div>

          <div className="form-floating mb-3">
            <input type="text" name="description" className="form-control" id="jobDescription" placeholder="Description" required />
            <label htmlFor="jobDescription"><i className="fas fa-align-left me-2"></i>Description</label>
          </div>

          <div className="form-floating mb-3">
            <input type="number" name="employerId" className="form-control" id="employerId" placeholder="Employer ID" required />
            <label htmlFor="employerId"><i className="fas fa-id-badge me-2"></i>Employer ID</label>
          </div>

          <div className="form-floating mb-3">
            <input type="number" name="salary" className="form-control" id="jobSalary" placeholder="Salary" required />
            <label htmlFor="jobSalary"><i className="fas fa-dollar-sign me-2"></i>Salary</label>
          </div>

          <div className="form-floating mb-4">
            <select className="form-select" name="type" id="jobType" required>
              <option value=""></option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Remote">Remote</option>
            </select>
            <label htmlFor="jobType"><i className="fas fa-clock me-2"></i>Job Type</label>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              <i className="fas fa-times me-1"></i> Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <i className="fas fa-paper-plane me-1"></i> Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

  );
};

export default CreateJobModal;
