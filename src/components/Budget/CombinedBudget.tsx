import { Budget } from ".";

interface CombinedBudgetProps {
  refineBudgetValue: number;
  publicBudgetValue: number;
}
export const CombinedBudget = ({
  refineBudgetValue,
  publicBudgetValue,
}: CombinedBudgetProps) => {
  return (
    <div className="flex flex-col w-[872px]">
      <div>
        <h1 className="text-base font-bold uppercase">
          Remaining Privacy Budget
        </h1>
      </div>
      <div className="flex flex-row justify-between mt-6">
        <Budget
          budgetType="refine"
          value={refineBudgetValue}
          label="Review & Refine Budget"
          budgetBar={true}
        />
        <Budget
          budgetType="public"
          value={publicBudgetValue}
          label="Public Release Budget"
          budgetBar={true}
        />
      </div>
    </div>
  );
};
