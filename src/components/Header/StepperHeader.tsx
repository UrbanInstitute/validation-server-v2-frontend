import { Stepper } from "..";

interface StepperHeaderProps {
  steps: Array<string>;
  activeStep: number;
}

export const StepperHeader = ({ steps, activeStep }: StepperHeaderProps) => {
  return (
    <div className="w-full bg-seaBlue">
      <div className="flex flex-row pb-[12px] pt-[16px] relative">
        <div className="absolute top-0 left-[127px] bg-gradient-to-b from-darkBlue to-blue">
          <svg
            viewBox="0 0 56 14"
            aria-hidden="true"
            className="block h-[14px] w-[56px]"
          >
            <path
              className="fill-seaBlue"
              d="M28,14 L0,14 L0,0 L28,14 L56,0 L56,14 Z"
            />
          </svg>
        </div>
        <Stepper steps={steps} activeStep={activeStep} />
      </div>
    </div>
  );
};
