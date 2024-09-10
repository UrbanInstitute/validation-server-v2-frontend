import classNames from "classnames";
import { BudgetBar, BudgetBarProps } from "./BudgetBar";

interface BudgetProps extends BudgetBarProps {
  label: string;
  budgetBar?: boolean;
}

export const Budget = ({
  value = 0,
  budgetType,
  label,
  budgetBar,
  ...props
}: BudgetProps) => {
  value = Math.max(0, value);
  value = Math.min(100, value);

  return (
    <div
      className={classNames(
        "flex flex-col font-bold",
        budgetBar ? "w-[420px]" : "w-[210px]"
      )}
    >
      <div className="flex flex-row justify-between mb-[12px] text-lg">
        <span
          className={classNames(
            !budgetBar
              ? budgetType === "refine"
                ? "text-budgetBlue"
                : "text-budgetGreen"
              : "text-grayText"
          )}
        >
          {label}
        </span>
        {budgetBar && (
          <span
            className={classNames(
              budgetType === "refine" ? "text-budgetBlue" : "text-budgetGreen"
            )}
          >{`${Math.round(value)}`}</span>
        )}
      </div>
      {budgetBar ? (
        <BudgetBar value={value} budgetType={budgetType} {...props} />
      ) : (
        <div
          className={classNames(
            "italic font-normal flex flex-row justify-between",
            budgetType === "refine" ? "text-budgetBlue" : "text-budgetGreen"
          )}
        >
          <div>Amount Remaining</div>
          <div>{value}</div>
        </div>
      )}
    </div>
  );
};
