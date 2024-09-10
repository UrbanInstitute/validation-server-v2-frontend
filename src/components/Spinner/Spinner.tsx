import classNames from "classnames";
interface SpinnerProps {
  color?: "primary" | "info" | "actionYellow" | "disabled";
  size?: "small" | "medium" | "large" | "xl";
}
export const Spinner = ({
  color = "primary",
  size = "medium",
}: SpinnerProps) => {
  return (
    <div
      className={classNames(
        "inline-block animate-spin rounded-full border-solid align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]",
        color === "primary" && "border-t-primary border-primary/50",
        color === "info" && "border-t-info border-info/50",
        color === "actionYellow" &&
          "border-t-actionYellow border-actionYellow/50",
        color === "disabled" && "border-t-disabled border-disabled/50",
        size === "small" && "h-5 w-5 border-[3px]",
        size === "medium" && "h-8 w-8 border-4",
        size === "large" && "h-12 w-12 border-8",
        size === "xl" && "h-36 w-36 border-[20px]"
      )}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};
