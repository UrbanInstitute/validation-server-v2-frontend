import { cn } from "@/lib/utils";
import classNames from "classnames";

interface StepCircleProps {
  title: string;
  stepNumber: number;
  isActive: boolean;
}

export const StepCircle = ({
  title,
  stepNumber,
  isActive,
}: StepCircleProps) => {
  return (
    <div
      className={classNames(
        "flex items-center relative transition-all duration-1000 ease-linear",
        isActive ? "text-white" : "text-gray"
      )}
    >
      <div
        className={cn(
          "w-8 h-8 rounded-full transition-all duration-1000 ease-in-out border-2 text-center flex justify-center items-center",
          isActive
            ? "bg-gradient-to-r from-blue via-midBlue to-darkBlue border-0"
            : "border-gray"
        )}
      >
        <span className={classNames("inline align-middle text-sm")}>
          {stepNumber}
        </span>
      </div>
      <div
        className={classNames(
          "absolute -top-[22px] text-center -translate-x-1/2 left-[16px] text-sm font-medium capitalize whitespace-nowrap transition-all duration-1000 ease-linear",
          isActive ? "text-darkBlue2" : "text-gray"
        )}
      >
        {title}
      </div>
    </div>
  );
};
