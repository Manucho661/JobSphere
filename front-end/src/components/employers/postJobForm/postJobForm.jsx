import React, { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const PostJobForm = () => {
  console.log("✅ PostJobForm loaded"); // 👈 Add this line here
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    requirements: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const next = () => setStep(prev => prev + 1);
  const back = () => setStep(prev => prev - 1);

  return (
    <div className="bg-white shadow-md rounded p-6">
      {step === 1 && <Step1 formData={formData} onChange={handleChange} onNext={next} />}
      {step === 2 && <Step2 formData={formData} onChange={handleChange} onNext={next} onBack={back} />}
      {step === 3 && <Step3 formData={formData} onBack={back} />}
    </div>
  );
};

export default PostJobForm;
