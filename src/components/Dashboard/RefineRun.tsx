import { Button, NewScriptMain, ScriptAnalysisTable, Spinner } from "..";
import { Text, TextSubHeader } from "../Text";
import React, { useEffect, useState } from "react";
import { ApiStatisticRefinement, CsvResults } from "@/models/apiResponse";
import { authService } from "@/services";
import { useBudgetQuery } from "@/hooks/useBudgetQuery";
import { useJobQuery } from "@/hooks/useJobQuery";
import { useSearchParams } from "react-router-dom";
import { STEPS } from "@/lib/constants";
import { useScriptContext } from "@/context/ScriptContext";

export const RefineRun = ({
  jobId,
  runId,
  analysisId,
  ...props
}: {
  jobId: string;
  runId: string;

  analysisId: string;
  pendingRefinement: number | undefined;
  setPendingRefinement: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
  setRefinement: React.Dispatch<
    React.SetStateAction<Array<ApiStatisticRefinement>>
  >;
}) => {
  const [, setSearchParams] = useSearchParams();
  const { setSubmitText } = useScriptContext();

  const [isFetching, setIsFetching] = useState(true);
  const { isFetching: queryFetching, data: job } = useJobQuery(jobId);
  const [csvData, setCsvData] = useState<CsvResults>();
  const [analysisName, setAnalysisName] = useState("");
  const [serverCsvData, setServerCsvData] = useState<CsvResults>();
  const userId = authService.user().userId;
  const { data: budgetData } = useBudgetQuery(userId ?? "");

  useEffect(() => {
    if (job) {
      const run = job.runs.find((run) => String(run.run_id) === runId);
      if (run) {
        setAnalysisName(
          run.analyses?.find((a) => a.analysis_id === analysisId)
            ?.analysis_name ?? ""
        );
        setCsvData(
          (run.csvResults as unknown as CsvResults).filter(
            (row) => row.analysis_id === analysisId
          )
        );
        setServerCsvData(
          (run.csvResults as unknown as CsvResults).filter(
            (row) => row.analysis_id === analysisId
          )
        );
        setIsFetching(false);
      }
    }
  }, [job, runId, analysisId]);

  useEffect(() => {
    setSubmitText("Submit");
  }, [setSubmitText]);

  return (
    <div>
      <NewScriptMain
        instructionProps={{
          instructions: (
            <div className="flex flex-row w-[485px]">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-10 h-10 fill-primary"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <div className="ml-3">
                <TextSubHeader className="normal-case text-iconBlack">
                  Instructions
                </TextSubHeader>
                <Text>
                  <ul className="list-disc ml-4 mt-3 space-y-2 mb-3">
                    <li>
                      Select one or more cells to edit each cell's epsilon
                      value. You may also view a graph of each cell's
                      privacy/noise relationship.
                    </li>
                    <li>
                      When you save an edit to an epsilon value, you are
                      applying that edit to all selected cells.
                    </li>
                  </ul>
                </Text>
              </div>
            </div>
          ),
        }}
        titleProps={{ title: "Review & Refine Results" }}
      >
        <div className="w-[70rem]">
          {(isFetching || queryFetching) && (
            <div className="flex flex-row justify-center">
              <Spinner size="large" />
            </div>
          )}
          {!(isFetching || queryFetching) &&
            csvData &&
            serverCsvData &&
            budgetData &&
            job && (
              <div>
                <div className="flex flex-row justify-between items-center mb-4">
                  <div className="flex flex-row">
                    <div className="underline">{job.name}</div>
                    <div className="mx-2">{`>`}</div>
                    <div>{`${analysisName}`}</div>
                    <div className="mx-2">{`>`}</div>
                    <div>{`Version ${runId}`}</div>
                  </div>
                  <Button
                    label="See All Versions"
                    variant="outlined"
                    onClick={() =>
                      setSearchParams({
                        step: `${STEPS.REVIEW_AND_REFINE}`,
                        id: jobId,
                      })
                    }
                  />
                </div>
                <ScriptAnalysisTable
                  budget={budgetData}
                  rows={csvData}
                  serverRows={serverCsvData}
                  setData={setCsvData}
                  {...props}
                />
              </div>
            )}
        </div>
      </NewScriptMain>
    </div>
  );
};
