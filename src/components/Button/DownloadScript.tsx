import { DownloadIcon } from "lucide-react";
import { Spinner } from "..";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../Tooltip/Tooltip";
import { useState } from "react";
import { jobs } from "@/lib/jobs";

export const DownloadScript = ({
  jobId,
  script,
}: {
  jobId: string;
  script?: string;
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const onDownloadClick = async (id: string) => {
    setIsDownloading(true);
    try {
      let scriptUrl = script ?? "";
      if (!script) {
        const job = await jobs.get(id);
        if (!job.script) {
          throw Error("No script found");
        }
        scriptUrl = job.script;
      }

      const link = document.createElement("a");

      if (link.download !== undefined) {
        // Download link is supported
        link.setAttribute("href", scriptUrl);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        throw Error("Download link is not supported"); // Fallback for browsers that do not support download attribute
      }
    } catch (error) {
      console.error(error);
    }
    setIsDownloading(false);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <button
            className="ml-4"
            onClick={() => onDownloadClick(jobId)}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <Spinner size="small" />
            ) : (
              <DownloadIcon className="w-6 h-6" />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent side="top">Download Script</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
