import {
  CombinedBudget,
  NotificationList,
  ScriptAccordionList,
  Spinner,
} from "@/components";
import { useBudgetQuery } from "@/hooks/useBudgetQuery";
import { useJobsQuery } from "@/hooks/useJobsQuery";
import { useNotificationMarkReadMutation } from "@/hooks/useNotificationMutation";
import { useNotificationsQuery } from "@/hooks/useNotificationQuery";
import { apiStatus2Status } from "@/lib/jobs";
import { Feature } from "../Feature";
import { cn } from "@/lib/utils";
import { useFeatureEnabled } from "@/hooks/useFeatureEnabled";
import { STEPS } from "@/lib/constants";

export const DashboardMain = ({ userId }: { userId: string }) => {
  const { isFetched: budgetFetched, data: budgetData } = useBudgetQuery(userId);
  const { isFetched: jobsFetched, data: jobsData } = useJobsQuery();
  const { isFetched: notificationsFetched, data: notificationsData } =
    useNotificationsQuery(userId);
  const notificationMarkReadMutation = useNotificationMarkReadMutation();
  const notificationsEnabled = useFeatureEnabled("notifications");
  return (
    <div>
      <Feature name="notifications">
        <div className="w-[900px]">
          {!notificationsFetched ? (
            <div className="flex flex-row justify-center">
              <Spinner size="large" />
            </div>
          ) : (
            <NotificationList
              notifications={
                notificationsData?.map((n) => ({
                  timestamp: new Date(n.receiveTime),
                  text: n.message,
                  onMarkClick: () => notificationMarkReadMutation.mutate(n.id),
                  linkLocation: `/script?id=${n.jobId}&step=${STEPS.REVIEW_AND_REFINE}&runId=${n.runId}`,
                  linkText: n.linkText,
                })) ?? []
              }
            />
          )}
        </div>
      </Feature>
      <div className={cn(notificationsEnabled && "mt-14")}>
        {!budgetFetched ? (
          <div className="flex flex-row justify-center">
            <Spinner size="large" />
          </div>
        ) : (
          <CombinedBudget
            refineBudgetValue={budgetData?.review ?? 0}
            publicBudgetValue={budgetData?.release ?? 0}
          />
        )}
      </div>
      <div className="mt-14">
        {!jobsFetched ? (
          <div className="flex flex-row justify-center">
            <Spinner size="large" />
          </div>
        ) : (
          <ScriptAccordionList
            scripts={jobsData?.map((job) => ({
              ...job,
              createdAt: job.created_at,
              newResults: notificationsData
                ? notificationsData.filter((n) => n.jobId === job.id).length >
                    0 && job.status.info !== "released"
                : false,
              newRelease: notificationsData
                ? notificationsData.filter((n) => n.jobId === job.id).length >
                    0 && job.status.info === "released"
                : false,
              analyses: job.runs
                .sort((a, b) => (a.run_id > b.run_id ? 1 : -1))
                .map((run) => ({
                  analysisName: `${job.title}-${run.run_id}`,
                  status: apiStatus2Status(run.status),
                  jobId: job.id,
                  runId: run.run_id,
                  reviewValue: run.reviewCost,
                  publicValue: run.releaseCost,
                })),
            }))}
          />
        )}
      </div>
    </div>
  );
};
