import React from 'react';

const Step3 = ({ formData, onBack, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(); // Triggers the final submit logic
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Step 3: Confirm & Submit</h2>

      <div className="mb-4">
        <h3 className="font-semibold">Review your job post:</h3>
        <ul className="list-disc ml-5 mt-2 space-y-1 text-gray-700">
          <li><strong>Title:</strong> {formData.title}</li>
          <li><strong>Location:</strong> {formData.location}</li>
          <li><strong>Description:</strong> {formData.description}</li>
          <li><strong>Type:</strong> {formData.type}</li>
          <li><strong>Salary:</strong> {formData.salary}</li>
        </ul>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
        >
          Back
        </button>

        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Step3;
