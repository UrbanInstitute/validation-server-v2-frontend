import { StepCircle } from "./StepCircle";
import { StepConnector } from "./StepConnector";

interface StepperStepProps {
  title: string;
  isActive: boolean;
  stepNumber: number;
  finalStep: boolean;
}

export const Step = ({
  title,
  isActive,
  stepNumber,
  finalStep,
}: StepperStepProps) => {
  return (
    <div className="flex-auto flex items-center flex-row min-w-[32px]">
      <StepCircle title={title} isActive={isActive} stepNumber={stepNumber} />
      {!finalStep && <StepConnector isActive={isActive} />}
    </div>
  );
};
