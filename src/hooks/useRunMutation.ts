import { runs } from "@/lib/runs";
import { ApiStatisticRefinement } from "@/models/apiResponse";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRunRefineMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      jobId,
      refinement,
    }: {
      jobId: string;
      refinement: ApiStatisticRefinement[];
    }) => {
      return runs.refine(jobId, refinement);
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["jobs"] });
    },
  });
};

export const useRunReleaseMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      jobId,
      runId,
      analysisIds,
    }: {
      jobId: string;
      runId: string | number;
      analysisIds: (string | number)[];
    }) => {
      return runs.release(jobId, runId, analysisIds);
    },
    onSuccess: () => {
      queryClient.setQueryData(["jobs"], []);
      setTimeout(() => {
        queryClient.refetchQueries({ queryKey: ["jobs"] });
      }, 5000);
    },
  });
};
