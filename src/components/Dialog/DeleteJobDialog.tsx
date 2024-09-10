import { useJobQuery } from "@/hooks/useJobQuery";
import { Dialog, Spinner } from "..";
import { DownloadScript } from "../Button/DownloadScript";

type SubmitReleaseDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleCancel: () => void;
  handleSubmit: () => void;
  jobId: string;
};

export const DeleteJobDialog = ({
  open,
  setOpen,
  handleCancel,
  handleSubmit,
  jobId,
}: SubmitReleaseDialogProps) => {
  const { isFetching, data: jobData } = useJobQuery(jobId);
  return (
    <Dialog
      open={open}
      disableTrigger
      setOpen={setOpen}
      title="Delete Job?"
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
          label: "DELETE",
          color: "primary",
          size: "large",
          variant: "filled",
          buttonStyle: "min-w-[194px]",
          onClick: handleSubmit,
        },
      ]}
    >
      <div className="flex flex-col text-grayText h-[120px] overflow-auto">
        {isFetching ? (
          <div className="flex-grow flex flex-row justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col">
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
                  You are about to delete job titled{" "}
                  <span className="italic">{jobData?.name}</span>. Are you sure
                  you want to delete this job? This action cannot be undone. You
                  may review the script before proceeding.
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-start items-center mt-4">
              Download Script:
              <DownloadScript jobId={jobId} script={jobData?.script} />
            </div>
          </div>
        )}
      </div>
    </Dialog>
  );
};
