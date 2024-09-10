import { useJobQuery } from "@/hooks/useJobQuery";
import {
  AnalysisCardList,
  AnalysisCardProps,
  NewScriptMain,
  Spinner,
} from "..";
import { apiStatus2Status } from "@/lib/jobs";
import { useSearchParams } from "react-router-dom";
import { STEPS } from "@/lib/constants";
import { useScriptContext } from "@/context/ScriptContext";
import { useEffect } from "react";
import { CsvResults } from "@/models/apiResponse";

export const ReviewAndRefine = ({
  jobId,
  runId,
}: {
  jobId: string;
  runId?: string;
}) => {
  const [, setSearchParams] = useSearchParams();
  const { isFetching, data: jobData } = useJobQuery(jobId);
  const { setSubmitDisabled, setSubmitText, setTooltipText } =
    useScriptContext();

  const getAnalyses = (job: typeof jobData) => {
    if (!job) return;

    const getReleasedAnalysisId = (
      releasedResults: CsvResults,
      analysis_id: string
    ) => {
      if (
        releasedResults
          .map((rel) => rel.analysis_id)
          .filter((id) => id === `${analysis_id}`).length > 1
      )
        return "released";
      return "available";
    };

    const results: Array<
      AnalysisCardProps & { jobId: string; runId: string; analysisId: string }
    > = [];
    const runs = runId
      ? job.runs.filter((run) => String(run.run_id) === runId)
      : job.runs;
    for (const run of runs) {
      const { run_id, analyses } = run;

      if (!analyses) {
        results.push({
          jobId,
          runId: String(run_id),
          analysisId: String(0),
          title: `Run ${run.run_id}: UNKNOWN`,
          errorMessage: run.status.errormsg ?? "",
          status: apiStatus2Status(run.status),
          handleReviewClick: () =>
            setSearchParams({
              step: `${STEPS.REVIEW_AND_REFINE}`,
              id: jobId,
              runId: `${run.run_id}`,
              analysisId: "0",
            }),
        });
      } else {
        for (const analysis of analyses) {
          const analysisId = analysis.analysis_id;

          results.push({
            jobId,
            runId: String(run_id),
            analysisId: String(analysisId),
            title: runId
              ? analysis.analysis_name
              : `Run ${run.run_id}: ${analysis.analysis_name}`,
            errorMessage: run.status.errormsg ?? "",
            status:
              apiStatus2Status(run.status) === "released"
                ? getReleasedAnalysisId(
                    run.csvReleased as unknown as CsvResults,
                    `${analysisId}`
                  )
                : apiStatus2Status(run.status),
            handleReviewClick: () =>
              setSearchParams({
                step: `${STEPS.REVIEW_AND_REFINE}`,
                id: jobId,
                runId: `${run.run_id}`,
                analysisId: `${analysisId}`,
              }),
          });
        }
      }
    }
    return results;
  };

  useEffect(() => {
    setSubmitDisabled(true);
  }, [setSubmitDisabled]);

  useEffect(() => {
    setTooltipText("First select a model");
  }, [setTooltipText]);

  useEffect(() => {
    setSubmitText("Submit");
  }, [setSubmitText]);

  return (
    <div>
      <NewScriptMain
        instructionProps={{
          instructions: (
            <div>
              {jobData &&
                (apiStatus2Status(jobData.status) === "inProgress" ||
                  apiStatus2Status(jobData.status) === "pending") && (
                  <div>
                    <p>
                      Initial results for your analyses are currently in
                      progress. You will receive a notification to your email
                      address and dashboard when the results become available.
                    </p>
                    <p className="mt-2 text-sm italic">
                      Note: If you don't receive a notification within
                      [timeframe]. Contact [email address].
                    </p>
                  </div>
                )}
              {!isFetching && (
                <div>
                  <p>
                    Results for your analyses are ready for your review. Select
                    an analysis below to review and refine.
                  </p>
                </div>
              )}
            </div>
          ),
        }}
        titleProps={{ title: "Review & Refine Results" }}
      >
        <div className="w-[70rem]">
          {isFetching && (
            <div className="flex flex-row justify-center">
              <Spinner size="large" />
            </div>
          )}
          {!isFetching && jobData && (
            <AnalysisCardList
              scriptName={jobData.scriptName ?? ""}
              analyses={getAnalyses(jobData) ?? []}
            />
          )}
        </div>
      </NewScriptMain>
    </div>
  );
};
