import { useBudgetQuery } from "@/hooks/useBudgetQuery";
import { BudgetTable, Dialog } from "..";

type SubmitReleaseDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  userId: string;
  pendingCost: number;
  handleCancel: () => void;
  handleSubmit: () => void;
};

export const SubmitReleaseDialog = ({
  open,
  setOpen,
  userId,
  pendingCost,
  handleCancel,
  handleSubmit,
}: SubmitReleaseDialogProps) => {
  const { data: budgetData } = useBudgetQuery(userId);
  return (
    <Dialog
      open={open}
      disableTrigger
      setOpen={setOpen}
      title="Release Final Results?"
      contentStyle="max-w-5xl"
      actionButtons={[
        {
          label: "CANCEL",
          color: "primary",
          variant: "outlined",
          size: "large",
          buttonStyle: "min-w-[194px]",
          onClick: handleCancel,
        },
        {
          label: "RELEASE",
          color: "primary",
          size: "large",
          variant: "filled",
          buttonStyle: "min-w-[194px]",
          onClick: handleSubmit,
        },
      ]}
    >
      <div className="flex flex-col text-grayText">
        <div className="flex flex-row">
          <div>
            <div className="text-info">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="ml-3">
            <div className="text-lg">
              If you release these results, your current remaining privacy
              budget will decrease to reflect the "
              <span className="font-bold">New Remaining Privacy Budget</span>”
              figure.
            </div>
            <div className="italic text-base mt-[1.125rem]">
              As a reminder:
              <ul className="mt-2 space-y-2 list-disc ml-3">
                <li>
                  Your privacy budget is shared across all analyses in your
                  dashboard
                </li>
                <li>
                  The cost to release these results will come from your “Public
                  Release” budget.
                </li>
                <li>
                  This release will not impact your “Review and Refine” budget
                  unless you make additional refinements at this point.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-14 mb-8">
          <BudgetTable
            reviewRemainingBudget={budgetData?.review ?? 0}
            publicRemainingBudget={budgetData?.release ?? 0}
            pendingReleaseCost={pendingCost}
          />
        </div>
      </div>
    </Dialog>
  );
};
