import { notificationService } from "@/services/notificationService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./useToast";

export const useNotificationCreateMutation = (userId: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: ({
      message,
      notificationId,
      jobId,
      runId,
      linkText,
      title,
      description,
      changeCheck,
      error,
    }: {
      message: string;
      notificationId: string;
      jobId: string;
      runId: string;
      linkText: string;
      title: string;
      description: string;
      changeCheck: string;
      error: boolean;
    }) => {
      toast({
        title: title,
        description: message,
        variant: error ? "destructive" : "default",
        itemID: notificationId,
      });
      return notificationService.create({
        message,
        notificationId,
        jobId,
        runId,
        linkText,
        title,
        description,
        changeCheck,
        userId,
      });
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["notifications"] });
    },
  });
};

export const useNotificationMarkReadMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => {
      return notificationService.update(id, { status: "read" });
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["notifications"] });
    },
  });
};
