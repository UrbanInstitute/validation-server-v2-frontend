import { addHyphensToUUID } from "@/lib/utils";
import { apiService } from "@/services/apiService";
import { DownloadIcon } from "lucide-react";

export const DownloadResults = ({
  jobId,
  runId,
}: {
  jobId: string;
  runId: string;
}) => {
  const downloadCsv = async () => {
    const csvData = await apiService.runs.getReleasedResults(
      jobId.includes("_") ? jobId : addHyphensToUUID(jobId),
      runId
    );
    const blob = new Blob([csvData ?? ""], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    if (link.download !== undefined) {
      // Download link is supported
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `${jobId}-run${runId}-release.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Fallback for browsers that do not support download attribute
      window.open(
        `data:text/csv;charset=utf-8,${encodeURIComponent(csvData ?? "")}`
      );
    }
  };

  return (
    <div>
      {/* Assume a button triggers the CSV download */}
      <button
        onClick={downloadCsv}
        className="flex items-center justify-start text-primary underline"
      >
        Released
        <DownloadIcon className="w-6 h-6 ml-2" />
      </button>
    </div>
  );
};
