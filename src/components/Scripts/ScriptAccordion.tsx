import { Accordion } from "../Accordion";
import { ScriptReviewTable } from ".";
import { ScriptReviewTableProps } from "./ScriptReviewTable";
import { format, zonedTimeToUtc } from "date-fns-tz";
import { parse } from "date-fns";
import { TrashIcon } from "lucide-react";
import { Spinner } from "..";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../Tooltip/Tooltip";
import { DownloadScript } from "../Button/DownloadScript";

export type ScriptAccordionProps = ScriptReviewTableProps & {
  name: string;
  onTitleClick?: () => void;
  downloadScriptEnabled?: boolean;
  onDeleteClick?: () => void;
  newResults?: boolean;
  newRelease?: boolean;
  createdAt: string;
  deleteBusy?: boolean;
  id: string;
};
export const ScriptAccordion = ({
  analyses,
  name,
  onTitleClick,
  downloadScriptEnabled,
  onDeleteClick,
  newResults,
  newRelease,
  createdAt,
  deleteBusy,
  id,
}: ScriptAccordionProps) => {
  return (
    <div className="w-[900px]">
      <Accordion
        chevronColor="black"
        chevronSize="large"
        header={
          <div className="flex flex-row items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <h1 className="underline">
                    <button onClick={onTitleClick} className="underline">
                      {name}
                    </button>
                  </h1>
                </TooltipTrigger>
                <TooltipContent side="top">View Results</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {downloadScriptEnabled && <DownloadScript jobId={id} />}
          </div>
        }
        subHeader={
          <div className="flex flex-row justify-between w-full pr-7">
            <div className="flex flex-grow" />
            {newResults && (
              <div className="flex flex-row">
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
                <div className="ml-2 italic text-base text-grayText">
                  New Results Available
                </div>
              </div>
            )}

            {newRelease && (
              <div className="flex flex-row">
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
                <div className="ml-2 italic text-base text-grayText">
                  Results Released
                </div>
              </div>
            )}
            {!newResults && !newRelease && (
              <div className="flex flex-row items-center">
                <div className="ml-2 italic text-sm text-grayText">
                  {`Results Updated: ${format(
                    zonedTimeToUtc(
                      parse(
                        createdAt,
                        "yyyy-MM-dd'T'HH:mm:ss.SSSSSS'Z'",
                        new Date()
                      ),
                      "UTC"
                    ),
                    "MM-dd-yyyy 'at' h:mmaaa z"
                  )}`}
                </div>
              </div>
            )}
          </div>
        }
        afterTriggerChildren={
          onDeleteClick && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <button
                    className="ml-4 text-base text-[#3D4446] flex flex-row items-center gap-2 underline"
                    onClick={onDeleteClick}
                    disabled={deleteBusy}
                  >
                    {deleteBusy ? (
                      <Spinner size="small" />
                    ) : (
                      <TrashIcon className="w-6 h-6 text-[#3D4446]" />
                    )}
                    Delete
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top">Delete Job</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )
        }
        titleColor="primary"
        titleSize="large"
        accordionStyle="px-0 pb-0"
        titleStyle="px-4 pb-4"
      >
        <ScriptReviewTable analyses={analyses} />
      </Accordion>
    </div>
  );
};
