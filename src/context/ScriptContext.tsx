import {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { SetURLSearchParams, useSearchParams } from "react-router-dom";

type ScriptContextType = {
  stepperActive: boolean;
  currentStep: number;
  jobId: string | null;
  runId: string | null;
  analysisId: string | null;
  setSearchParams: SetURLSearchParams;
  submitDisabled: boolean;
  setSubmitDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  submitText: string;
  setSubmitText: React.Dispatch<React.SetStateAction<string>>;
  tooltipText: string | undefined;
  setTooltipText: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const ScriptContextInitialValues: ScriptContextType = {
  stepperActive: false,
  currentStep: 0,
  jobId: null,
  runId: null,
  analysisId: null,
  setSearchParams: () => {},
  submitDisabled: true,
  setSubmitDisabled: () => {},
  submitText: "Submit",
  setSubmitText: () => {},
  tooltipText: undefined,
  setTooltipText: () => {},
};

export const ScriptContext = createContext<ScriptContextType>(
  ScriptContextInitialValues
);

export const ScriptProvider = ({ children }: PropsWithChildren) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [submitText, setSubmitText] = useState("Submit");
  const [tooltipText, setTooltipText] = useState<string | undefined>(undefined);

  const stepperActive = useMemo(
    () => typeof searchParams.get("step") === "string" || false,
    [searchParams]
  );
  const currentStep = useMemo(
    () => parseInt(searchParams.get("step") || "0"),
    [searchParams]
  );
  const jobId = useMemo(() => searchParams.get("id"), [searchParams]);
  const runId = useMemo(() => searchParams.get("runId"), [searchParams]);
  const analysisId = useMemo(
    () => searchParams.get("analysisId"),
    [searchParams]
  );

  return (
    <ScriptContext.Provider
      value={{
        stepperActive,
        currentStep,
        jobId,
        runId,
        analysisId,
        setSearchParams,
        submitDisabled,
        setSubmitDisabled,
        submitText,
        setSubmitText,
        tooltipText,
        setTooltipText,
      }}
    >
      {children}
    </ScriptContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useScriptContext = () => useContext(ScriptContext);
