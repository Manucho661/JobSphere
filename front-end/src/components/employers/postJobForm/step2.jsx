import React from 'react';

const Step2 = ({ formData, onChange, onNext, onBack }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Step 2: Job Details</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Job Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Select type</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Contract">Contract</option>
          <option value="Remote">Remote</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Salary</label>
        <input
          type="text"
          name="salary"
          value={formData.salary}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="e.g. 100,000/month"
        />
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
        >
          Back
        </button>

        <button
          onClick={onNext}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step2;
