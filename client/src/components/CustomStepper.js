import { Step, StepLabel, Stepper } from '@material-ui/core';
import React from 'react';

export default function CustomStepper({ steps, activeStep }) {
  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
