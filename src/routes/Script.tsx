import { BasePage, Dialog, Spinner } from "@/components";
import { useProtected } from "@/hooks/useProtected";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitAScript } from "../components/Dashboard/SubmitAScript";
import { ReviewAndRefine } from "@/components/Dashboard/ReviewAndRefine";
import { useBudgetQuery } from "@/hooks/useBudgetQuery";
import { RefineRun } from "@/components/Dashboard/RefineRun";
import { ApiStatisticRefinement } from "@/models/apiResponse";
import { SubmitRefinementDialog } from "@/components/Dashboard/SubmitRefinementDialog";
import { ReleaseFinalResults } from "@/components/Dashboard/ReleaseFinalResults";
import { SubmitReleaseDialog } from "@/components/Dashboard/SubmitReleaseDialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  useRunRefineMutation,
  useRunReleaseMutation,
} from "@/hooks/useRunMutation";
import {
  DialogOverlay,
  DialogPortal,
  DialogRoot,
} from "@/components/Dialog/DialogBase";
import { STEPS } from "@/lib/constants";
import { useScriptContext } from "@/context/ScriptContext";
import TagManager from "react-gtm-module";

export const ScriptPage = ({ userId }: { userId: string }) => {
  useProtected();

  const {
    stepperActive,
    currentStep,
    jobId,
    runId,
    analysisId,
    setSearchParams,
    submitDisabled,
    submitText,
    tooltipText,
  } = useScriptContext();

  const tagManagerArgs = {
    dataLayer: {
      userId: userId,
      jobId: jobId ?? "",
      runId: runId ?? "",
      analysisId: analysisId ?? "",
      currentStep: currentStep ?? 0,
    },
    dataLayerName: "DashboardPage",
  };
  TagManager.dataLayer(tagManagerArgs);

  const navigate = useNavigate();
  const { data: budgetData } = useBudgetQuery(userId);

  const [pendingRefinement, setPendingRefinement] = useState<number>();
  const [refinement, setRefinement] = useState<Array<ApiStatisticRefinement>>(
    []
  );

  const [analysisIds, setAnalysesIds] = useState<Array<number | string>>([]);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [nextRunId, setNextRunId] = useState<number | undefined>();

  const [loading, setLoading] = useState(false);
  const runRefineMutation = useRunRefineMutation();
  const runReleaseMutation = useRunReleaseMutation();

  const handleSubmit = () => {
    if (
      jobId &&
      runId &&
      analysisId &&
      currentStep === STEPS.REVIEW_AND_REFINE &&
      refinement.length > 0
    ) {
      setDialogOpen(true);
      return;
    }

    if (
      jobId &&
      runId &&
      currentStep === STEPS.RELEASE &&
      pendingRefinement &&
      pendingRefinement > 0
    ) {
      setDialogOpen(true);
      return;
    }

    if (
      jobId &&
      runId &&
      analysisId &&
      currentStep === STEPS.REVIEW_AND_REFINE &&
      refinement.length === 0
    ) {
      setSearchParams({
        step: `${STEPS.RELEASE}`,
        id: jobId,
        runId: `${runId}`,
      });
      return;
    }
  };

  useEffect(() => {
    if (runRefineMutation.data) {
      setNextRunId(runRefineMutation.data);
    }
  }, [runRefineMutation.data]);

  const handleSubmitRefinement = async () => {
    if (jobId && runId) {
      runRefineMutation.mutate({ jobId, refinement });
    }
    setDialogOpen(false);
    setFeedbackOpen(true);
  };

  const handleCloseFeedback = (open: boolean) => {
    setFeedbackOpen(open);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (!open) {
        if (nextRunId && jobId && currentStep === 2) {
          setSearchParams({
            step: `${STEPS.REVIEW_AND_REFINE}`,
            id: jobId,
            runId: `${nextRunId}`,
          });
        } else {
          navigate("/dashboard");
        }
      }
    }, 5000);
  };

  const handleSubmitRelease = () => {
    setDialogOpen(false);
    if (jobId && runId) {
      setLoading(true);
      runReleaseMutation.mutate({
        jobId,
        runId,
        analysisIds,
      });
      setTimeout(() => {
        setLoading(false);
        navigate("/dashboard");
      }, 10000);
    }
  };

  return (
    <BasePage
      stepper={stepperActive}
      activeStep={currentStep - 1}
      footerProps={{
        sticky: stepperActive && currentStep >= STEPS.REVIEW_AND_REFINE,
        refineBudgetValue: budgetData?.review ?? 0,
        publicBudgetValue: budgetData?.release ?? 0,
        pendingCosts: pendingRefinement,
        pendingType: currentStep === STEPS.RELEASE ? "release" : "refine",
        showPending: true,
        submitDisabled: submitDisabled,
        handleSubmit: handleSubmit,
        submitText: submitText,
        tooltipText: tooltipText,
      }}
      footer={stepperActive && currentStep >= STEPS.REVIEW_AND_REFINE}
    >
      <DialogRoot open={loading} onOpenChange={setLoading}>
        {" "}
        <DialogPortal>
          <DialogOverlay />
          <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-md md:w-full flex flex-row justify-center">
            <Spinner size="xl" />
          </DialogPrimitive.Content>
        </DialogPortal>
      </DialogRoot>
      <div className="flex flex-col">
        {stepperActive && currentStep === STEPS.SUBMIT && (
          <SubmitAScript userId={userId} />
        )}
        {stepperActive &&
          currentStep === STEPS.REVIEW_AND_REFINE &&
          analysisId === null && (
            <ReviewAndRefine jobId={jobId ?? ""} runId={runId ?? undefined} />
          )}
        {stepperActive &&
          currentStep === STEPS.REVIEW_AND_REFINE &&
          runId !== null &&
          analysisId !== null && (
            <>
              <Dialog
                disableTrigger
                open={feedbackOpen}
                setOpen={handleCloseFeedback}
                title="Refinement Submitted!"
                children={
                  <div>
                    Results for your analyses are currently in progress. You
                    will receive a notification to your email address and
                    dashboard when the results become available.
                  </div>
                }
                actionButtons={[
                  {
                    label: "Okay",
                    variant: "filled",
                    onClick: () => handleCloseFeedback(false),
                  },
                ]}
              />
              <SubmitRefinementDialog
                open={dialogOpen}
                setOpen={setDialogOpen}
                userId={userId}
                pendingCost={pendingRefinement ?? 0}
                handleCancel={() => setDialogOpen(false)}
                handleSubmit={() => handleSubmitRefinement()}
              />
              <RefineRun
                jobId={jobId ?? ""}
                runId={runId}
                analysisId={analysisId}
                pendingRefinement={pendingRefinement}
                setPendingRefinement={setPendingRefinement}
                setRefinement={setRefinement}
              />
            </>
          )}
        {stepperActive && currentStep === STEPS.RELEASE && runId !== null && (
          <>
            <SubmitReleaseDialog
              open={dialogOpen}
              setOpen={setDialogOpen}
              userId={userId}
              pendingCost={pendingRefinement ?? 0}
              handleCancel={() => setDialogOpen(false)}
              handleSubmit={() => handleSubmitRelease()}
            />
            <ReleaseFinalResults
              jobId={jobId ?? ""}
              runId={runId}
              pendingRefinement={pendingRefinement}
              setPendingRefinement={setPendingRefinement}
              setAnalysesIds={setAnalysesIds}
            />
          </>
        )}
        {stepperActive && currentStep > STEPS.RELEASE && <div>NOT FOUND</div>}
        {!stepperActive && <div>ERROR</div>}
      </div>
    </BasePage>
  );
};
