import React, { useState } from 'react';

const ProgressSteps = ({ steps, currentStep }) => {
  const [activeStep, setActiveStep] = useState(currentStep);

  const handleClick = (step) => {
    setActiveStep(step);
  };

  return (
    <div className="progress-steps">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`progress-step ${index < activeStep ? 'completed' : ''} ${index === activeStep ? 'active' : ''}`}
          onClick={() => handleClick(index)}
        >
          {step}
        </div>
      ))}
    </div>
  );
};

export default ProgressSteps;
