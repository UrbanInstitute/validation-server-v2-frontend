import { formatNumber } from "@/lib/utils";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow,
} from "..";
import { BudgetBar } from "./BudgetBar";

interface BudgetTableProps {
  reviewRemainingBudget: number;
  publicRemainingBudget: number;
  pendingRefinementCost?: number;
  pendingReleaseCost?: number;
}

export const BudgetTable = ({
  reviewRemainingBudget,
  publicRemainingBudget,
  pendingRefinementCost,
  pendingReleaseCost,
}: BudgetTableProps) => {
  return (
    <TableRoot>
      <TableHeader>
        <TableRow className="bg-white text-grayText text-lg border-none">
          <TableHead className="py-3 px-4"></TableHead>
          <TableHead className="py-3 px-4">Review & Refine Budget</TableHead>
          <TableHead className="py-3 px-4">Public Release Budget</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className=" border-none border-[rgba(0,0,0,0.16)] hover:bg-info/10">
          <TableCell className="py-3 px-4">Remaining Privacy Budget</TableCell>
          <TableCell className="text-base text-budgetBlue">
            <div className="flex flex-row justify-start align-middle items-center gap-4">
              <BudgetBar
                fullWidth={200}
                budgetType="refine"
                value={reviewRemainingBudget}
              />
              {`${formatNumber(reviewRemainingBudget)} / 100`}
            </div>
          </TableCell>
          <TableCell className="text-base text-budgetGreen">
            <div className="flex flex-row justify-start align-middle items-center gap-4">
              <BudgetBar
                fullWidth={200}
                budgetType="public"
                value={publicRemainingBudget}
              />
              {`${formatNumber(publicRemainingBudget)} / 100`}
            </div>
          </TableCell>
        </TableRow>
        <TableRow className=" border-b border-graphCenter hover:bg-info/10">
          <TableCell className="py-3 px-4 text-budgetPendingText">
            Pending Refinement Costs
          </TableCell>
          <TableCell className="text-base text-budgetPendingText">
            <div className="flex flex-row justify-start align-middle items-center gap-4">
              {pendingRefinementCost && (
                <BudgetBar
                  fullWidth={200}
                  budgetType="refine"
                  value={reviewRemainingBudget}
                  pendingCost={pendingRefinementCost}
                />
              )}
              {`${
                pendingRefinementCost
                  ? formatNumber(pendingRefinementCost)
                  : "N/A"
              }`}
            </div>
          </TableCell>
          <TableCell className="text-base text-budgetPendingText">
            <div className="flex flex-row justify-start align-middle items-center gap-4">
              {pendingReleaseCost && (
                <BudgetBar
                  fullWidth={200}
                  budgetType="public"
                  value={publicRemainingBudget}
                  pendingCost={pendingReleaseCost}
                />
              )}
              {`${
                pendingReleaseCost ? formatNumber(pendingReleaseCost) : "N/A"
              }`}
            </div>
          </TableCell>
        </TableRow>
        <TableRow className=" border-none hover:bg-info/10">
          <TableCell className="py-3 px-4 font-bold">
            New Remaining Privacy Budget
          </TableCell>
          <TableCell className="text-base text-budgetBlue">
            <div className="flex flex-row justify-start align-middle items-center gap-4">
              <BudgetBar
                fullWidth={200}
                budgetType="refine"
                value={
                  pendingRefinementCost
                    ? reviewRemainingBudget - pendingRefinementCost
                    : reviewRemainingBudget
                }
              />
              {`${formatNumber(
                pendingRefinementCost
                  ? reviewRemainingBudget - pendingRefinementCost
                  : reviewRemainingBudget,
                2
              )} / 100`}
            </div>
          </TableCell>
          <TableCell className="text-base text-budgetGreen">
            <div className="flex flex-row justify-start align-middle items-center gap-4">
              <BudgetBar
                fullWidth={200}
                budgetType="public"
                value={
                  pendingReleaseCost
                    ? publicRemainingBudget - pendingReleaseCost
                    : publicRemainingBudget
                }
              />
              {`${formatNumber(
                pendingReleaseCost
                  ? publicRemainingBudget - pendingReleaseCost
                  : publicRemainingBudget,
                2
              )} / 100`}
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </TableRoot>
  );
};
