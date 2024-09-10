import classNames from "classnames";
import { Budget, Button } from "..";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../Tooltip/Tooltip";
import { formatNumber } from "@/lib/utils";

export interface FooterProps {
  /**
   * Is the footer stuck to the bottom of the screen, or does it stay below content?
   */
  sticky?: boolean;
  refineBudgetValue: number;
  publicBudgetValue: number;
  submitDisabled?: boolean;
  showPending?: boolean;
  pendingType?: "refine" | "release";
  pendingCosts?: number;
  handleSubmit?: () => void;
  submitText?: string;
  tooltipText?: string;
}
export const Footer = ({
  sticky,
  refineBudgetValue,
  publicBudgetValue,
  showPending,
  pendingType = "refine",
  pendingCosts,
  submitDisabled = false,
  handleSubmit,
  submitText,
  tooltipText,
}: FooterProps) => {
  return (
    <footer
      className={classNames(
        "bg-white flex flex-col justify-center shadow-[8px_8px_24px_#00000026]",
        sticky && "fixed bottom-0 left-0 right-0"
      )}
    >
      <div className="flex flex-row mb-[24px] mt-[21px] mx-[60px] gap-x-9 justify-between ">
        {pendingType === "refine" ? (
          <Budget
            budgetType="refine"
            value={refineBudgetValue}
            label="Privacy Budget - Review & Refine"
            pendingCost={pendingCosts}
            budgetBar
          />
        ) : (
          <Budget
            budgetType="refine"
            value={refineBudgetValue}
            label="Review & Refine"
          />
        )}
        {pendingType === "release" ? (
          <Budget
            budgetType="public"
            value={publicBudgetValue}
            label="Privacy Budget - Public Release"
            pendingCost={pendingCosts}
            budgetBar
          />
        ) : (
          <Budget
            budgetType="public"
            value={publicBudgetValue}
            label="Public Release"
          />
        )}
        {showPending && (
          <div className="flex flex-col justify-center uppercase whitespace-nowrap">
            <div>
              {pendingType === "refine"
                ? "Pending Refinement Costs ="
                : "Pending Release Costs ="}
              <span className="text-actionYellow ml-1">
                {pendingCosts ? formatNumber(pendingCosts) : "N/A"}
              </span>
            </div>
          </div>
        )}
        <div className="flex-grow"></div>
        <div className="flex flex-col justify-center">
          {tooltipText ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handleSubmit}
                    label={submitText ?? "Submit"}
                    variant="filled"
                    color="actionYellow"
                    buttonStyle="hover:scale-110 duration-200 px-12 w-[194px] disabled:scale-100 disabled:cursor-not-allowed"
                    disabled={submitDisabled}
                  />
                </TooltipTrigger>
                <TooltipContent side="top">{tooltipText}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Button
              onClick={handleSubmit}
              label={submitText ?? "Submit"}
              variant="filled"
              color="actionYellow"
              buttonStyle="hover:scale-110 duration-200 px-12 w-[194px] disabled:scale-100 disabled:cursor-not-allowed"
              disabled={submitDisabled}
            />
          )}
        </div>
      </div>
    </footer>
  );
};
