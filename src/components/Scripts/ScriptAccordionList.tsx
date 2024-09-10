import { useNavigate } from "react-router-dom";
import { ScriptAccordion } from ".";
import { STEPS } from "@/lib/constants";
import { ScriptAccordionProps } from "./ScriptAccordion";
import { useState } from "react";
import { useJobDeleteMutation } from "@/hooks/useJobMutation";
import { DeleteJobDialog } from "../Dialog/DeleteJobDialog";

type Script = Omit<ScriptAccordionProps, "onTitleClick">;
interface ScriptAccordionList {
  scripts?: Array<Script>;
}

export const ScriptAccordionList = ({ scripts }: ScriptAccordionList) => {
  const navigate = useNavigate();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteJobId, setDeleteJobId] = useState("");

  const jobDeleteMutation = useJobDeleteMutation();

  const onDeleteClick = (id: string) => {
    //jobDeleteMutation.mutate({ id: id });
    setDeleteOpen(true);
    setDeleteJobId(id);
  };

  const handleDeleteConfirm = async () => {
    await jobDeleteMutation.mutateAsync({ id: deleteJobId });
    navigate("/dashboard");
    setDeleteOpen(false);
  };

  return (
    <div className="w-[900px]">
      <DeleteJobDialog
        open={deleteOpen}
        setOpen={setDeleteOpen}
        handleCancel={() => setDeleteOpen(false)}
        handleSubmit={() => handleDeleteConfirm()}
        jobId={deleteJobId}
      />
      <div className="text-sm uppercase mb-3.5 font-bold">Scripts</div>
      <div className="space-y-4">
        {scripts ? (
          scripts.map((script, index) => (
            <ScriptAccordion
              key={index}
              onTitleClick={() =>
                navigate(
                  `/script?id=${script.id}&step=${STEPS.REVIEW_AND_REFINE}`
                )
              }
              downloadScriptEnabled={true}
              onDeleteClick={() => {
                onDeleteClick(script.id);
              }}
              {...script}
            />
          ))
        ) : (
          <div className="text-lg italic shadow-[0_1px_4px_rgba(0,0,0,0.16)] py-4 px-4">
            You do not have any analyses in progress at this time.{" "}
            <span className="not-italic">Click "New Script" to begin.</span>
          </div>
        )}
      </div>
    </div>
  );
};
