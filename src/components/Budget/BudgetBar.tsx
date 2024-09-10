import { cn } from "@/lib/utils";
import classNames from "classnames";

export interface BudgetBarProps {
  value?: number;
  budgetType: "refine" | "public";
  fullWidth?: number;
  pendingCost?: number;
}

export const BudgetBar = ({
  budgetType,
  value = 100,
  fullWidth = 420,
  pendingCost,
}: BudgetBarProps) => {
  const valueToWidth = (value: number) => {
    const innerWidth = fullWidth - 4;
    return (value * innerWidth) / 100;
  };

  return (
    <div
      className={cn(
        "h-[18px] border-[1px] rounded-3xl",
        budgetType === "refine" ? "border-budgetBlue" : "border-budgetGreen"
      )}
      style={{ width: `${fullWidth}px` }}
    >
      {pendingCost ? (
        <div className="flex flex-row">
          <div
            className={classNames(
              "my-[1px] ml-[1px] h-[14px] rounded-l-3xl transition-all duration-1000",
              budgetType === "refine" ? "bg-budgetBlue" : "bg-budgetGreen"
            )}
            style={{ width: `${valueToWidth(value - pendingCost)}px` }}
          ></div>
          <div
            className={classNames(
              "my-[1px] h-[14px] rounded-r-3xl transition-all duration-1000 bg-budgetPending"
            )}
            style={{ width: `${valueToWidth(pendingCost)}px` }}
          ></div>
        </div>
      ) : (
        <div
          className={classNames(
            "my-[1px] mx-[1px] h-[14px] rounded-3xl transition-all duration-1000",
            budgetType === "refine" ? "bg-budgetBlue" : "bg-budgetGreen"
          )}
          style={{ width: `${valueToWidth(value)}px` }}
        ></div>
      )}
    </div>
  );
};
