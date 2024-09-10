import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { AuthContext, queryClient } from ".";
import { useAuthUserContext } from "@/context/AuthUserContext";
import { useJobsQuery } from "@/hooks/useJobsQuery";
import { ApiStatus } from "@/models/apiResponse";
import { useFeatureEnabled } from "@/hooks/useFeatureEnabled";
import { notificationService } from "@/services/notificationService";
import { useToast } from "@/hooks/useToast";

export const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [initialized, setInitialized] = useState(false);
  const [state] = AuthContext.useActor();
  const { userId } = useAuthUserContext();
  const notificationsEnabled = useFeatureEnabled("notifications");
  const { toast } = useToast();

  const { data: jobsData } = useJobsQuery();

  const functionRunStatus = useCallback(
    async (
      status: ApiStatus | undefined,
      jobName: string,
      runId: number | string,
      jobId: string
    ) => {
      if (!status) {
        return;
      }
      if (!userId) {
        return;
      }

      const linkText = `${jobName} - Version ${runId}`;

      let message = "";
      let changeCheck = "unknown";
      let title = "Unknown";
      if (status.ok) {
        if (status.info === "completed") {
          message = `Results are now available for ${linkText}`;
          title = "Results Available";
          changeCheck = "completed";
        } else if (status.info === "released") {
          message = `${linkText} is now released.`;
          title = "Model Released";
          changeCheck = "released";
        } else {
          message = `${linkText} has new updates.`;
          title = "Updates Available";
          changeCheck = "updates";
        }
      } else {
        message = `An error occured while processing ${linkText}: ${
          status.errormsg ?? "Unknown Error"
        }`;
        title = "Model Error";
        changeCheck = "error";
      }

      if (!notificationsEnabled) return;

      if (changeCheck === "updates") {
        return;
      }

      const notifications = await notificationService.list(userId);
      const lastNotification = notifications.filter(
        (n) =>
          n.jobId === jobId &&
          n.runId === String(runId) &&
          n.changeCheck === changeCheck
      );

      if (lastNotification.length > 0) {
        return;
      }

      await notificationService
        .create({
          message: message,
          notificationId: `${jobId}${runId}${changeCheck}`,
          jobId: jobId,
          runId: `${runId}`,
          linkText: linkText,
          title: title,
          description: message,
          changeCheck: changeCheck,
          userId: userId,
        })
        .then(() => {
          toast({
            title: title,
            description: message,
            variant: changeCheck === "error" ? "destructive" : "default",
          });
          queryClient.refetchQueries({ queryKey: ["notifications"] });
        });
    },
    [notificationsEnabled, userId, toast]
  );

  useEffect(() => {
    // Check if the length of the array of jobs changes
    if (!jobsData) {
      return;
    }

    const updateNotifications = async () => {
      // Check if any of the status objects change
      for (const job of jobsData) {
        const jobId = job.id;
        for (const run of job.runs) {
          await functionRunStatus(run.status, job.title, run.run_id, jobId);
        }
      }
    };
    updateNotifications();
  }, [jobsData, functionRunStatus]);

  useEffect(() => {
    if (state.matches("authenticated") && userId && !initialized) {
      setInitialized(true);
    }
  }, [state, userId, initialized]);

  return <div>{children}</div>;
};
