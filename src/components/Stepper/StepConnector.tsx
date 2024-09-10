import classNames from "classnames";

interface StepConnectorProps {
  isActive: boolean;
}

export const StepConnector = ({ isActive }: StepConnectorProps) => {
  return (
    <div
      className={classNames(
        "flex-grow w-48 border-t-2 transition-all duration-1000 ease-linear",
        isActive ? "border-darkBlue" : "border-gray"
      )}
    ></div>
  );
};
