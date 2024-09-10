import { ApiJob } from "@/models/apiResponse";
import { apiService } from "@/services/apiService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useJobCreateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ file, name }: { file: File; name: string }) => {
      return apiService.job.create(file, name);
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["jobs"] });
    },
  });
};

export const useJobDeleteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      await apiService.job.delete(id);
      return id;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["jobs"], (oldData: ApiJob[]) => {
        return oldData.filter((job) => job.id !== data);
      });
      queryClient.refetchQueries({ queryKey: ["jobs"] });
    },
  });
};
