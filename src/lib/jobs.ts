import { apiService } from "@/services/apiService";
import { addHyphensToUUID, csv2array, sumCsvEpsilon } from "./utils";
import { ApiRun, ApiStatus, CsvResults, DatasetId } from "@/models/apiResponse";

export const apiStatus2Status = (
  status: ApiStatus
): "available" | "released" | "error" | "inProgress" | "pending" => {
  if (status.ok) {
    if (status.info === "job created") return "inProgress";
    if (status.info === "job completed" || status.info === "completed")
      return "available";
    if (status.info === "released") return "released";
    return "pending";
  }
  return "error";
};

const extractScriptName = (scriptUri?: string) => {
  if (!scriptUri) return "";
  const match = scriptUri.match(/\/([^/]+\.[Rr])\?/);
  if (match && match[1]) {
    const filename = match[1];
    return filename; // "puf-multi.R"
  } else {
    console.warn("Filename not found");
    return "";
  }
};

export const jobs = {
  delete: async (jobId: string) => {
    return await apiService.job.delete(jobId);
  },
  get: async (jobId: string) => {
    const job = await apiService.job.get(jobId).then((res) => ({
      ...res,
      uuid: addHyphensToUUID(res.id),
      name: res.title,
      scriptName: extractScriptName(res.script),
    }));
    const jobWRuns = await addJobRuns(job);
    const jobWRunDetails = await addJobRunDetails(jobWRuns);
    return jobWRunDetails;
  },

  list: async () => {
    const jobsOnly = await getJobsList();
    const jobsWRuns = await Promise.all(
      jobsOnly.map(async (job) => addJobRuns(job))
    );

    return (
      await Promise.all(
        jobsWRuns.map(async (job) => {
          const runs = await Promise.all(
            job.runs.map(async (run) => {
              const runData = await apiService.runs.get(job.uuid, run.run_id);
              const runAnalysis = await apiService.runs.getAnalyses(
                job.uuid,
                run.run_id
              );
              return { ...run, ...runData, analyses: runAnalysis };
            })
          );
          return { ...job, runs: runs };
        })
      )
    ).sort((a, b) => (a.created_at < b.created_at ? -1 : 1));
  },

  listWResults: async () => {
    const jobsOnly = await getJobsList();
    const jobsWRuns = await Promise.all(
      jobsOnly.map(async (job) => addJobRuns(job))
    );
    return Promise.all(jobsWRuns.map(async (job) => addJobRunDetails(job)));
  },
};

const getJobsList = async () => {
  const jobsOnly = await apiService.job.list().then((res) =>
    res.map((resJob) => ({
      ...resJob,
      uuid: addHyphensToUUID(resJob.id),
      name: resJob.title,
    }))
  );
  return jobsOnly;
};

const addJobRuns = async (job: {
  uuid: string;
  name: string;
  scriptName?: string;
  id: string;
  status: ApiStatus;
  title: string;
  created_at: string;
  description?: string | undefined;
  dataset_id?: DatasetId;
  script?: string | undefined;
}) => {
  const runs = await apiService.runs.list(job.uuid);
  return { ...job, runs: runs };
};

const getRunDetails = async (
  job: {
    runs: ApiRun[];
    uuid: string;
    name: string;
    scriptName?: string;
    id: string;
    status: ApiStatus;
    title: string;
    created_at: string;
    description?: string | undefined;
    dataset_id?: DatasetId;
    script?: string | undefined;
  },
  run: ApiRun
) => {
  const runData = await apiService.runs.get(job.uuid, run.run_id);
  const csvResponse = await apiService.runs.getResults(job.uuid, run.run_id);

  const csvReleasedResponse =
    runData.status.info === "released"
      ? await apiService.runs.getReleasedResults(job.uuid, run.run_id)
      : "";

  const runAnalysis = await apiService.runs.getAnalyses(job.uuid, run.run_id);
  const csvResults = csv2array(csvResponse ?? "").map((row) => ({
    ...row,
    variable: row.var,
  }));

  const csvReleased = csv2array(csvReleasedResponse ?? "").map((row) => ({
    ...row,
    variable: row.var,
  }));
  return {
    ...run,
    ...runData,
    status: Object.keys(runData.status).includes("ok")
      ? runData.status
      : job.status,
    analyses: runAnalysis,
    csvResults: csvResults,
    csvReleased: csvReleased,
    reviewCost:
      csvResults.length > 0 ? sumCsvEpsilon(csvResults as CsvResults) : "N/A",
    releaseCost:
      csvReleased.length > 0 ? sumCsvEpsilon(csvReleased as CsvResults) : "N/A",
  };
};

const addJobRunDetails = async (job: {
  runs: ApiRun[];
  uuid: string;
  name: string;
  id: string;
  scriptName?: string;
  status: ApiStatus;
  title: string;
  created_at: string;
  description?: string | undefined;
  dataset_id?: DatasetId;
  script?: string | undefined;
}) => {
  const runs = await Promise.all(
    job.runs.map(async (run) => {
      return getRunDetails(job, run);
    })
  );
  return { ...job, runs: runs };
};
