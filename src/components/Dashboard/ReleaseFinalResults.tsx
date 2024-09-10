import { Button, NewScriptMain, Spinner } from "..";
import { Text, TextSubHeader } from "../Text";
import React, { useEffect } from "react";
import { useJobQuery } from "@/hooks/useJobQuery";
import { useSearchParams } from "react-router-dom";
import { useRunAnalysesQuery } from "@/hooks/useRunQuery";
import { AnalysesTable } from "../Analyses/AnalysesTable";
import { queryClient } from "@/providers";
import { STEPS } from "@/lib/constants";
import { useScriptContext } from "@/context/ScriptContext";

export const ReleaseFinalResults = ({
  jobId,
  runId,
  ...props
}: {
  jobId: string;
  runId: string;
  pendingRefinement: number | undefined;
  setPendingRefinement: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
  setAnalysesIds: React.Dispatch<React.SetStateAction<Array<number | string>>>;
}) => {
  const [, setSearchParams] = useSearchParams();
  const { setSubmitDisabled, setSubmitText, setTooltipText } =
    useScriptContext();

  const { isFetching: analysesFetching, data: runAnalysesData } =
    useRunAnalysesQuery(jobId, runId);
  const { isFetching: jobFetching, data: jobData } = useJobQuery(jobId);

  useEffect(() => {
    setSubmitText("Release");
  }, [setSubmitText]);

  useEffect(() => {
    setTooltipText(undefined);
  }, [setTooltipText]);

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
                    <li>Select one or more analyses to release.</li>
                    <li>
                      If you would like to make additional refinements before
                      releasing, click “Refine Again” to return to step 2.
                    </li>
                  </ul>
                </Text>
              </div>
            </div>
          ),
        }}
        titleProps={{ title: "Release Final Results" }}
      >
        <div className="w-[70rem]">
          {analysesFetching ||
            (jobFetching && (
              <div className="flex flex-row justify-center">
                <Spinner size="large" />
              </div>
            ))}
          {!analysesFetching && !jobFetching && !runAnalysesData && jobData && (
            <div className="flex flex-row justify-center">
              <Button
                label="Refresh"
                onClick={() =>
                  queryClient.refetchQueries({
                    queryKey: ["jobs", jobId, "runs", runId, "analyses"],
                  })
                }
                variant="filled"
              />
            </div>
          )}
          {!analysesFetching && !jobFetching && runAnalysesData && jobData && (
            <div>
              <div className="flex flex-row justify-between items-center mb-4">
                <div className="flex flex-row">
                  <div className="underline">{jobData.name}</div>
                  <div className="mx-2">{`>`}</div>
                  <div>{`Version ${runId}`}</div>
                </div>
                <Button
                  label="See All Analyses"
                  variant="outlined"
                  onClick={() =>
                    setSearchParams({
                      step: `${STEPS.REVIEW_AND_REFINE}`,
                      id: jobId,
                    })
                  }
                />
              </div>
              <AnalysesTable
                runId={runId}
                jobId={jobId}
                rows={runAnalysesData}
                setSubmitDisabled={setSubmitDisabled}
                {...props}
              />
            </div>
          )}
        </div>
      </NewScriptMain>
    </div>
  );
};
