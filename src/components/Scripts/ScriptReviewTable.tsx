import { Link } from "react-router-dom";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow,
} from "../Table";
import { cn, formatNumber } from "@/lib/utils";
import { DownloadResults } from "../Button/DownloadResults";
import { STEPS } from "@/lib/constants";

export type ScriptAnalysis = {
  jobId?: string;
  runId?: string | number;
  analysisName: string;
  status: "error" | "inProgress" | "available" | "pending" | "released";
  reviewValue?: string | number;
  publicValue?: string | number;
};

export type ScriptReviewTableProps = {
  analyses?: Array<ScriptAnalysis>;
};

export const ScriptReviewTable = ({ analyses }: ScriptReviewTableProps) => {
  const status2Text = (status: ScriptAnalysis["status"]) => {
    switch (status) {
      case "available":
        return "Available";
      case "inProgress":
        return "In Progress";
      case "error":
        return "Error";
      case "released":
        return "Released";
      default:
        return "Pending";
    }
  };
  return (
    <TableRoot className="rounded-b-md border-none">
      <TableHeader>
        <TableRow>
          <TableHead className="bg-secondary border border-white uppercase text-base py-1.5 text-white w-[400px]">
            Analysis Name + Version
          </TableHead>
          <TableHead className="bg-secondary border border-white uppercase text-base py-1.5 text-white w-[319px]">
            Status
          </TableHead>
          <TableHead className="bg-primary border border-white uppercase text-base py-1.5 text-white w-[210px]">
            Review & Refine
          </TableHead>
          <TableHead className="bg-budgetGreen border border-white uppercase text-base py-1.5 text-white w-[210px]">
            Public Release
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {analyses?.map(
          (
            { analysisName, status, reviewValue, publicValue, jobId, runId },
            index
          ) => (
            <TableRow
              key={`${analysisName}-${index}`}
              className={cn(
                index === analyses.length - 1
                  ? "border-b-0"
                  : "border-b border-[rgba(0,0,0,0.16)]"
              )}
            >
              <TableCell className="text-lg text-grayText">
                {jobId && runId ? (
                  <Link
                    className="text-primary underline"
                    to={`/script?step=${STEPS.REVIEW_AND_REFINE}&id=${jobId}&runId=${runId}`}
                  >
                    {analysisName}
                  </Link>
                ) : (
                  analysisName
                )}
              </TableCell>
              <TableCell className="text-lg text-grayText">
                {status === "released" && jobId && runId ? (
                  <DownloadResults jobId={jobId} runId={runId as string} />
                ) : (
                  status2Text(status)
                )}
              </TableCell>
              <TableCell className="text-lg text-primary">
                <Link
                  className="text-primary"
                  to={`/script?step=${STEPS.REVIEW_AND_REFINE}&id=${jobId}&runId=${runId}`}
                >
                  {reviewValue
                    ? reviewValue === "N/A"
                      ? reviewValue
                      : formatNumber(reviewValue)
                    : "N/A"}
                </Link>
              </TableCell>
              <TableCell className="text-lg text-budgetGreen">
                <Link
                  className="text-budgetGreen"
                  to={`/script?step=${STEPS.RELEASE}&id=${jobId}&runId=${runId}`}
                >
                  {publicValue
                    ? publicValue === "N/A"
                      ? publicValue
                      : formatNumber(publicValue)
                    : "N/A"}
                </Link>
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </TableRoot>
  );
};
