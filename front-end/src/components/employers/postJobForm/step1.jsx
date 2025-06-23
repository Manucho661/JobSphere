import React from 'react';

const Step1 = ({ formData, onChange, onNext }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Step 1: Basic Job Info</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Job Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="e.g. Frontend Developer"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Job Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="e.g. Nairobi, Kenya"
        />
      </div>

      <button
        onClick={onNext}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Next
      </button>
    </div>
  );
};

export default Step1;
