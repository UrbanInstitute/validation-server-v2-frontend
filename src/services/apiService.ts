import {
  ApiAnalyses,
  ApiBudget,
  ApiJob,
  ApiJobDetail,
  ApiRun,
  ApiRunDetail,
  ApiStatisticRefinement,
} from "@/models/apiResponse";
import Config from "./config";
import { addHyphensToUUID } from "@/lib/utils";
import { authService } from ".";

class ApiService {
  private _token: string | null;
  private config: Config;
  constructor() {
    this._token = sessionStorage.getItem("token");
    this.config = new Config();
  }

  getToken() {
    this._token = sessionStorage.getItem("token");
  }

  async fetch({
    apiPath,
    method,
    formData,
    data,
    headers = new Headers(),
    type = "json",
  }: {
    apiPath: string;
    method: RequestInit["method"];
    formData?: FormData;
    data?: string;
    headers?: Headers;
    type?: "json" | "text" | "raw";
  }) {
    this.getToken();
    const API_URL = this.config.get("API_URL");
    headers.append("Authorization", `Token ${this._token}`);

    const response = await fetch(`${API_URL}${apiPath}`, {
      redirect: "follow",
      method: method,
      body: method === "GET" ? null : formData ?? data,
      headers: headers,
    });

    if (response.status === 401) {
      if (authService.isLoggedIn()) {
        authService.logout();
        window.location.reload();
      }
      throw new Error("Unauthorized");
    }

    if (response.status === 200 || response.status === 201) {
      if (type === "text") {
        return response.text();
      }
      if (type === "json") {
        return response.json();
      }
      return response;
    }

    return undefined;
  }

  budget = {
    get: () =>
      this.fetch({
        apiPath: "/budget/budget",
        method: "GET",
      }) as Promise<Array<ApiBudget>>,
    getOne: (id: string) =>
      this.fetch({
        apiPath: `/budget/budget/${id}`,
        method: "GET",
      }) as Promise<ApiBudget>,
  };

  job = {
    list: () =>
      this.fetch({ apiPath: "/job/jobs/", method: "GET" }) as Promise<
        Array<ApiJob>
      >,
    create: (script: File, title: string) => {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("dataset_id", "cps");
      formData.append("script", script, script.name);
      return this.fetch({
        apiPath: "/job/jobs/",
        method: "POST",
        formData,
      }) as Promise<ApiJobDetail>;
    },
    get: (id: string) =>
      this.fetch({
        apiPath: `/job/jobs/${id}`,
        method: "GET",
      }) as Promise<ApiJobDetail>,

    delete: (id: string) =>
      this.fetch({
        apiPath: `/job/jobs/${id}`,
        method: "DELETE",
      }) as Promise<undefined>,
  };

  runs = {
    list: (jobUuid: string) =>
      this.fetch({
        apiPath: `/job/jobs/${jobUuid}/runs`,
        method: "GET",
      }) as Promise<Array<ApiRun>>,
    get: (jobUuid: string, runId: string | number) =>
      this.fetch({
        apiPath: `/job/jobs/${jobUuid}/runs/${runId}/`,
        method: "GET",
      }) as Promise<ApiRunDetail>,
    getResults: (jobUuid: string, runId: string | number) => {
      if (!jobUuid.includes("-")) {
        jobUuid = addHyphensToUUID(jobUuid);
      }
      return this.fetch({
        apiPath: `/job/jobs/${jobUuid}/runs/${runId}/get-csv-results/`,
        method: "GET",
        type: "text",
      }) as Promise<string | undefined>;
    },

    getReleasedResults: (jobUuid: string, runId: string | number) => {
      if (!jobUuid.includes("-")) {
        jobUuid = addHyphensToUUID(jobUuid);
      }
      return this.fetch({
        apiPath: `/job/jobs/${jobUuid}/runs/${runId}/get-released-csv-results/`,
        method: "GET",
        type: "text",
      }) as Promise<string | undefined>;
    },
    postRefinement: (
      jobUuid: string,
      runId: string | number,
      refinement: ApiStatisticRefinement[]
    ) => {
      const headers = new Headers();
      const numRunId = typeof runId === "string" ? parseInt(runId) : runId;
      headers.append("Content-Type", "application/json");
      this.fetch({
        apiPath: `/job/jobs/${jobUuid}/runs/${numRunId + 1}/refine/`,
        method: "POST",
        data: JSON.stringify({ refined: refinement }),
        headers: headers,
      });
    },
    getAnalyses: (jobUuid: string, runId: string | number) => {
      const numRunId = typeof runId === "string" ? parseInt(runId) : runId;
      return this.fetch({
        apiPath: `/job/jobs/${jobUuid}/runs/${numRunId}/get-analyses`,
        method: "GET",
      }) as Promise<Array<ApiAnalyses> | undefined>;
    },
    release: (
      jobUuid: string,
      runId: string | number,
      analysisId: Array<string | number>
    ) => {
      const headers = new Headers();
      const numRunId = typeof runId === "string" ? parseInt(runId) : runId;
      const payload = analysisId.map((id) =>
        typeof id === "string" ? parseInt(id) : id
      );
      headers.append("Content-Type", "application/json");
      return this.fetch({
        apiPath: `/job/jobs/${jobUuid}/runs/${numRunId}/release/`,
        method: "POST",
        data: JSON.stringify({ analysis_ids: payload }),
        headers: headers,
      });
    },
  };
}

export const apiService = new ApiService();
