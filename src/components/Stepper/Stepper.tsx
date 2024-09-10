import { Step } from "./Step";

interface StepperProps {
  steps: Array<string>;
  activeStep: number;
}

export const Stepper = ({ steps, activeStep }: StepperProps) => {
  return (
    <div className="flex items-center w-[600px] pl-[138px] pt-[30px]">
      {steps.map((step, index) => (
        <Step
          key={index}
          stepNumber={index + 1}
          title={step}
          isActive={activeStep === index}
          finalStep={index === steps.length - 1}
        />
      ))}
    </div>
  );
};
