import {
  Button,
  Dialog,
  Error,
  FileUpload,
  Input,
  NewScriptMain,
} from "@/components";
import { useJobCreateMutation } from "@/hooks/useJobMutation";
import { byte2Kb } from "@/lib/utils";
import { ApiJobDetail } from "@/models/apiResponse";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingDialog } from "../Dialog/LoadingDialog";
import { useNotificationsQuery } from "@/hooks/useNotificationQuery";
import { STEPS } from "@/lib/constants";

export const SubmitAScript = ({ userId }: { userId: string }) => {
  const navigate = useNavigate();

  const { data: notificationsData } = useNotificationsQuery(userId);
  const [scriptFile, setScriptFile] = useState<File | undefined>();
  const [scriptName, setScriptName] = useState<string>("");
  const [scriptUploadError, setScriptUploadError] = useState<
    string | undefined
  >();

  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [continueOpen, setContinueOpen] = useState(false);
  const [continueOpenTimeout, setContinueOpenTimeout] = useState(10000);
  const [newJob, setNewJob] = useState<ApiJobDetail>();

  const isValid = () => {
    return scriptFile && !scriptUploadError && scriptName !== "";
  };

  const createJobMutation = useJobCreateMutation();

  useEffect(() => {
    if (createJobMutation.data) {
      setNewJob(createJobMutation.data);
    }
  }, [createJobMutation.data]);

  const handleNextStep = async () => {
    // TODO: Create job and submit file upload
    if (!isValid()) {
      return;
    }
    createJobMutation.mutate({ file: scriptFile as File, name: scriptName });
    setFeedbackOpen(true);
  };

  const handleFileUpload = (file: File) => {
    setScriptFile(file);
    if (!file.name.includes(".R")) {
      setScriptUploadError(
        "The file that you uploaded cannot be submitted. Only R scripts (that end in .R) can be submitted at this time."
      );
    } else {
      if (scriptName === "") {
        setScriptName(file.name);
      }
    }

    //
  };

  const handleClearFile = () => {
    setScriptFile(undefined);
    setScriptUploadError(undefined);
  };

  const handleCloseDialog = (open: boolean) => {
    setFeedbackOpen(open);
    setLoading(true);
    setTimeout(() => {
      setContinueOpen(true);
    }, continueOpenTimeout);
  };

  useEffect(() => {
    if (newJob && notificationsData) {
      if (notificationsData.map((n) => n.jobId).includes(newJob.id)) {
        setLoading(false);
        setContinueOpen(false);
        navigate(`/script?id=${newJob.id}&step=${STEPS.REVIEW_AND_REFINE}`);
      }
    }
  }, [newJob, notificationsData, navigate]);

  const handleCloseContinueWaiting = () => {
    setContinueOpen(false);
    setLoading(false);
    navigate("/dashboard");
  };

  return (
    <div>
      <Dialog
        disableTrigger
        open={feedbackOpen}
        setOpen={handleCloseDialog}
        title="Your Script Has Been Submitted!"
        children={
          <div>
            Initial results for your analyses are currently in progress. You
            will receive a notification to your email address and dashboard when
            the results become available.
          </div>
        }
        actionButtons={[
          {
            label: "Okay",
            variant: "filled",
            onClick: () => handleCloseDialog(false),
          },
        ]}
      />
      <LoadingDialog open={loading} setOpen={setLoading} />
      <Dialog
        disableTrigger
        open={continueOpen}
        setOpen={handleCloseContinueWaiting}
        title="Your Script is Processing"
        children={
          <div>
            Initial results for your analyses are still in process. You can
            continue to wait here, and automatically get taken to the next step,
            or you can go to the dashboard.
          </div>
        }
        actionButtons={[
          {
            label: "Go To Dashboard",
            variant: "outlined",
            onClick: () => handleCloseContinueWaiting(),
          },
          {
            label: "Continue Waiting",
            variant: "filled",
            onClick: () => {
              setContinueOpen(false);
              setContinueOpenTimeout(continueOpenTimeout + 10000);
              setTimeout(() => {
                setContinueOpen(true);
              }, continueOpenTimeout + 10000);
            },
          },
        ]}
      />

      <NewScriptMain
        instructionProps={{
          instructions: (
            <div>
              To begin, please submit an R script that contains one or more
              analyses. Submitting a script will cost 1.0 epsilon unit from your
              Review & Refine budget. The R script must correctly use the{" "}
              <a
                href="https://github.com/UrbanInstitute/mos-validation-server-r-package"
                target="_blank"
                className="text-primary"
              >
                validationserver R package
              </a>{" "}
              to specify analyses.
            </div>
          ),
        }}
        titleProps={{ title: "Submit an R Script" }}
      >
        <div className="w-[45rem]">
          <div>
            {scriptFile ? (
              <div className="flex flex-col gap-y-3">
                <label
                  className="text-[#343A40] text-base leading-5"
                  htmlFor={"uploadedScript"}
                >
                  1. Upload a script
                </label>
                <div
                  className={classNames(
                    "bg-[#F2F4FC] flex flex-col py-4 text-center text-lg rounded-md cursor-pointer transistion-all duration-200",
                    !scriptUploadError
                      ? "border-success border-4"
                      : "border-error border-4"
                  )}
                >
                  <div
                    id="uploadedScript"
                    className="flex flex-row justify-between px-4"
                  >
                    <p>{scriptFile?.name} </p>
                    <div className="flex-grow" />
                    <p>{`${Math.round(byte2Kb(scriptFile.size))} kB`}</p>
                    <button
                      className="ml-2 hover:scale-110 duration-200"
                      onClick={() => handleClearFile()}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="w-6 h-6 stroke-black stroke-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <FileUpload
                id={"scriptFile"}
                label="1. Upload a script"
                handleFileUpload={handleFileUpload}
              />
            )}
            {scriptUploadError && (
              <div className="mt-4">
                <Error error={scriptUploadError} />
              </div>
            )}
          </div>
          <div className="mt-4"></div>
          <div className="mt-[1.9rem]">
            <Input
              id={"scriptName"}
              label="2. Name a submission"
              value={scriptName}
              onChange={(e) => setScriptName(e.target.value)}
            />
          </div>

          <div className="mt-6">
            <Button
              color="actionYellow"
              label="SUBMIT"
              variant="filled"
              size="large"
              buttonStyle="hover:scale-105 duration-200"
              onClick={() => handleNextStep()}
              disabled={!isValid()}
            />
          </div>
        </div>
      </NewScriptMain>
    </div>
  );
};
