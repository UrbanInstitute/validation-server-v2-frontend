import { apiService } from "@/services/apiService";
import { addHyphensToUUID, csv2array } from "./utils";
import {
  ApiRunDetail,
  ApiStatisticRefinement,
  ApiStatus,
} from "@/models/apiResponse";
import { queryClient } from "@/providers";

type JobQueryResults = {
  runs: ApiRunDetail[];
  uuid: string;
  name: string;
  id: string;
  status: ApiStatus;
  title: string;
};

const findMaxRunId = (arr: ApiRunDetail[]) => {
  if (arr.length === 0) {
    // Handle the case where the array is empty, depending on your requirements
    return 0; // or throw an error, return null, etc.
  }

  return arr.reduce((maxRunId, obj) => {
    return obj.run_id > maxRunId ? obj.run_id : maxRunId;
  }, arr[0].run_id);
};

export const runs = {
  list: (jobUuid: string) => apiService.runs.list(jobUuid),
  getResults: async (jobUuid: string, runId: string | number) => {
    const resultsRaw = await apiService.runs.getResults(jobUuid, runId);
    return csv2array(resultsRaw ?? "").map((row) => ({
      ...row,
      variable: row.var,
    }));
  },
  refine: async (jobId: string, refinement: ApiStatisticRefinement[]) => {
    const jobs = queryClient.getQueryData(["jobs"]) as
      | JobQueryResults[]
      | undefined;

    // Get the current job that we are attempting to refine so that we can get the next run (findMaxRunId) to post to /refine
    const job = jobs?.find((job) => job.uuid === jobId || job.id === jobId);
    if (!job) {
      return;
    }

    let jobUuid: string;
    if (jobId.includes("-")) {
      jobUuid = jobId;
    } else {
      jobUuid = addHyphensToUUID(jobId);
    }

    const newRunId = findMaxRunId(job.runs) + 1;
    apiService.runs.postRefinement(jobUuid, newRunId, refinement);
    return newRunId;
  },
  getAnalyses: async (jobUuid: string, runId: string | number) => {
    return apiService.runs.getAnalyses(jobUuid, runId);
  },
  release: async (
    jobId: string,
    runId: string | number,
    analysisIds: Array<number | string>
  ) => {
    let jobUuid: string;
    if (jobId.includes("-")) {
      jobUuid = jobId;
    } else {
      jobUuid = addHyphensToUUID(jobId);
    }
    queryClient.invalidateQueries({ queryKey: ["budgets"] });

    return apiService.runs.release(jobUuid, runId, analysisIds);
  },
};
