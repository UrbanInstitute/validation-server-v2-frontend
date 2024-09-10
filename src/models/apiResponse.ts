export type ApiStatus = {
  errormsg: string | null;
  info: string;
  ok: boolean;
};

export type ApiJob = {
  id: string;
  status: ApiStatus;
  title: string;
  created_at: string;
};

export type ApiBudget = {
  id: number;
  release: number;
  review: number;
};

export enum DatasetId {
  cps = "cps",
  puf_2012 = "puf_2012",
}

export type ApiJobDetail = ApiJob & {
  description?: string;
  dataset_id: DatasetId;
  script?: string;
};

export type ApiJobScript = {
  id: string;
  script: string;
};

export type ApiRun = {
  job: ApiJob;
  run_id: number;
};

export type ApiRunDetail = ApiRun & {
  status: ApiStatus;
  created_at: string;
};

export type CsvResults = Array<{
  statistic_id: string | number;
  statistic: string | null | undefined;
  variable: string | null | undefined;
  analysis_type: string;
  analysis_name: string;
  analysis_id: string;
  chi: number;
  epsilon: number;
  noise_90: number;
  value_sanitized: number;
  [key: string]: number | string | null | undefined;
}>;

export type ApiStatisticRefinement = {
  statistic_id: string;
  epsilon: number;
};

export type ApiRefinement = {
  refinement: Array<ApiStatisticRefinement>;
};

export type ApiAnalyses = {
  analysis_id: string | number;
  analysis_name: string;
  epsilon_sum: string | number;
};
