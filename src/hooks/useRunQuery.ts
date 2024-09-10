import { runs } from "@/lib/runs";
import { addHyphensToUUID } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export const useRunResultsQuery = (jobId: string, runId: string | number) => {
  return useQuery({
    queryKey: ["jobs", jobId, "runs", runId, "csvResults"],
    queryFn: () => runs.getResults(jobId, runId),
  });
};

export const useRunAnalysesQuery = (jobId: string, runId: string | number) => {
  return useQuery({
    queryKey: ["jobs", jobId, "runs", runId, "analyses"],
    queryFn: () =>
      runs.getAnalyses(
        jobId.includes("-") ? jobId : addHyphensToUUID(jobId),
        runId
      ),
  });
};
