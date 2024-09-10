import { Instructions, InstructionsProps } from "./Instructions";
import { StepTitle, StepTitleProps } from "./StepTitle";

interface NewScriptMainProps {
  titleProps: StepTitleProps;
  instructionProps: InstructionsProps;
  children?: React.ReactNode;
  childrenWidth?: number | string;
}

export const NewScriptMain = ({
  titleProps,
  instructionProps,
  children,
}: NewScriptMainProps) => {
  return (
    <div>
      <div className="flex flex-col w-[45rem]">
        <StepTitle {...titleProps} />
        <Instructions {...instructionProps} />
      </div>
      <div className="mt-[1.9rem]">{children}</div>
    </div>
  );
};
