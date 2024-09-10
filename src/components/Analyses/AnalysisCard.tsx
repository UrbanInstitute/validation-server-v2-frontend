import { cn } from "@/lib/utils";
import { Button } from "..";

export interface AnalysisCardProps {
  title: string;
  status: "inProgress" | "pending" | "available" | "error" | "released";
  errorMessage?: string;
  handleReviewClick: () => void;
}

export const Status = (
  status: AnalysisCardProps["status"],
  errorMessage?: string
) => {
  switch (status) {
    case "inProgress":
      return (
        <div className="text-iconBlack text-lg flex flex-row">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          In Progress
        </div>
      );
    case "released":
      return <div className="text-budgetGreen text-lg font-bold">Released</div>;
    case "available":
      return (
        <div className="text-secondary text-lg font-bold">
          Results Available
        </div>
      );
    case "error":
      return (
        <div className="text-error text-lg flex flex-row">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
          {`Error${errorMessage ? ":" : ""}`}
          <div className="text-error text-base ml-4">{errorMessage}</div>
        </div>
      );
    default:
      return (
        <div className="text-iconBlack text-lg flex flex-row">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Pending
        </div>
      );
  }
};

export const AnalysisCard = ({
  title,
  status,
  errorMessage,
  handleReviewClick,
}: AnalysisCardProps) => {
  return (
    <div className="h-24 flex flex-row rounded-md border-2 border-l-0 border-grayBorder items-center">
      <div
        className={cn(
          "block w-2.5 rounded-tl-md rounded-bl-md h-24 bg-secondary",
          status === "released"
            ? "bg-budgetGreen"
            : status === "error"
            ? "bg-error"
            : "bg-secondary"
        )}
      />
      <div className="flex flex-col justify-center ml-4">
        <div className="text-lg text-grayText">{title}</div>
        <div className="mt-4">{Status(status, errorMessage)}</div>
      </div>
      <div className="flex-grow" />
      <div className="mr-6">
        <Button
          label="REVIEW AND REFINE"
          size="large"
          variant="outlined"
          color="primary"
          disabled={!(status === "available" || status === "released")}
          onClick={handleReviewClick}
        />
      </div>
    </div>
  );
};
