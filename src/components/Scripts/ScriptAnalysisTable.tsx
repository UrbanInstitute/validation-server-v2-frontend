import { useEffect, useMemo, useState } from "react";
import { Button, Checkbox, Input } from "..";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow,
} from "../Table";
import { CheckedState } from "@radix-ui/react-checkbox";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../Dialog/DialogBase";
import {
  ApiBudget,
  ApiStatisticRefinement,
  CsvResults,
} from "@/models/apiResponse";
import { PrivacyGraph } from "../Plot/PrivacyGraph";
import {
  addCommasToNumber,
  asNumber,
  cn,
  formatNumberAsText,
  roundNumber,
} from "@/lib/utils";
import { useScriptContext } from "@/context/ScriptContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../Tooltip/Tooltip";

type ScriptAnalysisTableProps = {
  rows: CsvResults;
  serverRows: CsvResults;
  setData?: (data: CsvResults) => void;

  pendingRefinement: number | undefined;
  setPendingRefinement: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
  budget: ApiBudget;
  setRefinement: React.Dispatch<React.SetStateAction<ApiStatisticRefinement[]>>;
};

export const ScriptAnalysisTable = ({
  rows,
  serverRows,
  setData = console.log,
  pendingRefinement,
  budget,
  setRefinement,
  setPendingRefinement,
}: ScriptAnalysisTableProps) => {
  const { setSubmitDisabled, setSubmitText, setTooltipText } =
    useScriptContext();
  const [checked, setChecked] = useState(Array(rows.length).fill(false));
  const [allChecked, setAllChecked] = useState<CheckedState>("indeterminate");
  const [editIndex, setEditIndex] = useState(-1);
  const [editMultipleOpen, setEditMultipleOpen] = useState(false);
  const [editEpsilon, setEditEpsilon] = useState<string>("");
  const [saveMultipleOpen, setSaveMultipleOpen] = useState(false);

  useEffect(() => {
    const submitIsDisabled = () => {
      if (checked.filter((c) => c).length > 0) {
        return true;
      }
      return false;
    };

    let pending = 0;
    const refinement = [];
    setSubmitDisabled(submitIsDisabled());
    setSubmitText(
      checked.filter((c) => c).length > 0
        ? "..."
        : rows.every((row, index) => row.epsilon === serverRows[index].epsilon)
        ? "Release"
        : "Submit"
    );
    setTooltipText(
      checked.filter((c) => c).length > 0
        ? "Finish Edits to Continue"
        : rows.every((row, index) => row.epsilon === serverRows[index].epsilon)
        ? "Release with current epsilon values"
        : "Submit refinements"
    );
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].epsilon !== serverRows[i].epsilon) {
        pending += rows[i].epsilon;
        refinement.push({
          statistic_id: `${rows[i].statistic_id}`,
          epsilon: rows[i].epsilon,
        });
      }
    }
    setRefinement(refinement);
    setPendingRefinement(roundNumber(pending, 3));
  }, [
    rows,
    serverRows,
    checked,
    setPendingRefinement,
    setRefinement,
    setSubmitDisabled,
    setSubmitText,
    setTooltipText,
  ]);

  useEffect(() => {
    if (checked.filter((c) => c).length !== 1) {
      setEditIndex(-1);
    }
  }, [checked]);

  const handleCheck = (index: number) => {
    const tempChecked = [...checked];
    tempChecked[index] = !tempChecked[index];
    setChecked(tempChecked);
    setAllChecked(tempChecked.every((c) => c));
  };

  const handleCheckAll = (checkedState: CheckedState) => {
    setEditIndex(-1);
    if (checkedState === "indeterminate") {
      setChecked(Array(rows.length).fill(false));
    } else {
      setChecked(Array(rows.length).fill(checkedState));
    }
    setAllChecked(checkedState);
  };

  const handleEditClick = (index: number) => {
    setEditIndex(index);
  };

  const handleSaveClick = () => {
    const editRows = checked.map((c, index) => (c ? index : -1));
    const updatedRows = rows.map((row, index) => ({
      ...row,
      epsilon: editRows.includes(index) ? parseFloat(editEpsilon) : row.epsilon,
    }));

    setData(updatedRows);
    setEditIndex(-1);
    setEditMultipleOpen(false);
    setSaveMultipleOpen(false);
    setChecked(Array(rows.length).fill(false));
    setAllChecked(false);
  };

  const [privacyGraphOpen, setPrivacyGraphOpen] = useState(false);
  const [privacyParams, setPrivacyParams] = useState({
    var: "Cell 1",
    theta: 100,
    noise_90: 1,
    currentValue: 1,
    proposedValue: 1.05,
  });

  const handleOpenPrivacyGraph = (variableIndex: number) => {
    let title = `Cell ${variableIndex}`;
    if (rows[variableIndex].statistic && rows[variableIndex].statistic !== "") {
      title += ` - ${rows[variableIndex].statistic}`;
    }
    if (rows[variableIndex].variable && rows[variableIndex].variable !== "") {
      title += ` - ${rows[variableIndex].variable}`;
    }
    setPrivacyParams({
      var: title,
      theta: asNumber(rows[variableIndex].value_sanitized),
      noise_90: asNumber(rows[variableIndex].noise_90),
      currentValue: asNumber(serverRows[variableIndex].epsilon),
      proposedValue: asNumber(rows[variableIndex].epsilon),
    });

    setPrivacyGraphOpen(true);
  };

  const editMultipleValid = () => {
    if (
      checked.filter((c) => c).length * parseFloat(editEpsilon) +
        (pendingRefinement ?? 0) >
      budget.review
    ) {
      return {
        error: true,
        message:
          "Your submission exceeds the available funds in your Privacy Budget.",
      };
    }
    if (
      parseFloat(editEpsilon) <
      Math.min(...serverRows.map((row) => row.epsilon))
    ) {
      return {
        error: true,
        message:
          "Epsilon must be greater than or equal to the current epsilon.",
      };
    }
    return { error: false, message: "" };
  };

  const editOneValid = (index: number) => {
    if (parseFloat(editEpsilon) + (pendingRefinement ?? 0) > budget.review) {
      return {
        error: true,
        message:
          "Your submission exceeds the available funds in your Privacy Budget.",
      };
    }
    if (parseFloat(editEpsilon) < serverRows[index].epsilon) {
      return {
        error: true,
        message:
          "Epsilon must be greater than or equal to the current epsilon.",
      };
    }
    return { error: false, message: "" };
  };

  const additionalHeaderCells = useMemo(() => {
    const ignoreKeys = [
      "chi",
      "analysis_id",
      "analysis_type",
      "analysis_name",
      "noise_90",
      "var",
    ];
    const headerKeys = [
      "statistic_id",
      "variable",
      "statistic",
      "value_sanitized",
      "epsilon",
    ];
    return Object.keys(rows[0])
      .filter((key) => !ignoreKeys.includes(key))
      .filter((key) => !headerKeys.includes(key));
  }, [rows]);

  return (
    <TableRoot>
      <DialogRoot open={saveMultipleOpen} onOpenChange={setSaveMultipleOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Edit?</DialogTitle>
          </DialogHeader>
          <div>
            If you save this epsilon value edit, it will also be applied to all
            currently selected cells.
          </div>
          <DialogFooter>
            <Button
              size="large"
              label="Cancel"
              buttonStyle="w-full flex-grow uppercase text-base disabled:cursor-not-allowed"
              variant="clear"
              onClick={() => setSaveMultipleOpen(false)}
            />
            <Button
              size="large"
              label="Save"
              buttonStyle="w-full flex-grow uppercase text-base disabled:cursor-not-allowed"
              variant="filled"
              onClick={handleSaveClick}
            />
          </DialogFooter>
        </DialogContent>
      </DialogRoot>

      <DialogRoot open={privacyGraphOpen} onOpenChange={setPrivacyGraphOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{privacyParams.var}</DialogTitle>
          </DialogHeader>
          <PrivacyGraph {...privacyParams} />
        </DialogContent>
      </DialogRoot>
      <DialogRoot open={editMultipleOpen} onOpenChange={setEditMultipleOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Entry for Multiple Cells</DialogTitle>
          </DialogHeader>
          <Input
            label="EPSILON"
            id="epsilon"
            value={editEpsilon}
            onChange={(e) => setEditEpsilon(e.target.value)}
            error={editMultipleValid().error}
            errorMessage={editMultipleValid().message}
          />
          <DialogFooter>
            <Button
              size="large"
              label="Apply"
              buttonStyle="w-full flex-grow uppercase text-base disabled:cursor-not-allowed"
              variant="filled"
              onClick={() => setSaveMultipleOpen(true)}
              disabled={editMultipleValid().error}
            />
          </DialogFooter>
        </DialogContent>
        <TableHeader>
          <TableRow className="bg-secondary text-white uppercase text-base">
            <TableHead className="py-3 px-4">
              <Checkbox
                checked={allChecked}
                onCheckedChange={(checked) => handleCheckAll(checked)}
              />
            </TableHead>
            <TableHead className="py-3 px-4">Cell</TableHead>
            <TableHead className="py-3 px-4">Variable</TableHead>
            <TableHead className="py-3 px-4">Statistic</TableHead>
            {additionalHeaderCells.map((cell) => (
              <TableHead className="py-3 px-4">{cell}</TableHead>
            ))}
            <TableHead className="py-3 px-4 pr-8 text-right">
              Estimate
            </TableHead>
            <TableHead className="py-3 px-4 flex flex-row justify-between items-center w-44">
              Epsilon
              {checked.filter((c) => c).length > 1 && (
                <DialogTrigger asChild>
                  <Button
                    size="xSmall"
                    label={"Edit"}
                    color="white"
                    variant={"filled"}
                    buttonStyle={"hover:scale-105 duration-200"}
                    onClick={() => {
                      setEditMultipleOpen(true);
                    }}
                  />
                </DialogTrigger>
              )}
            </TableHead>
            <TableHead className="py-3 px-4">Privacy vs. Noise</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows?.map(
            (
              {
                statistic_id,
                variable,
                statistic,
                epsilon,
                value_sanitized,
                ...others
              },
              index
            ) => (
              <TableRow
                key={`${statistic_id}-${index}`}
                className="border-b border-[rgba(0,0,0,0.16)] hover:bg-info/10"
              >
                <TableCell className="py-3 px-4">
                  <Checkbox
                    checked={checked[index]}
                    onCheckedChange={() => handleCheck(index)}
                  />
                </TableCell>
                <TableCell className="text-base text-grayText">
                  {statistic_id}
                </TableCell>
                <TableCell className="text-base text-grayText">
                  {variable}
                </TableCell>
                <TableCell className="text-base text-grayText">
                  {statistic}
                </TableCell>
                {additionalHeaderCells.map((cell) => (
                  <TableCell className="text-base text-grayText">
                    {others[cell]}
                  </TableCell>
                ))}
                <TableCell className="text-base text-grayText text-right  pr-8">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        {formatNumberAsText(value_sanitized)}
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        {addCommasToNumber(value_sanitized)}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell
                  className={cn(
                    "text-base text-grayText",
                    editOneValid(index).error ? "" : "w-44"
                  )}
                >
                  <div className=" flex flex-row items-center gap-2 justify-between">
                    {editIndex === index ? (
                      <Input
                        id={`epsilon-${index}`}
                        value={editEpsilon}
                        onChange={(e) => setEditEpsilon(e.target.value)}
                        inputStyle="px-1 py-1 shadow-none text-base text-right"
                        error={editOneValid(index).error}
                        errorMessage={editOneValid(index).message}
                        className="w-20"
                      />
                    ) : (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="text-left text-ellipsis w-20 overflow-hidden ">
                              {formatNumberAsText(epsilon, 3)}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="top">{epsilon}</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}

                    {checked[index] &&
                      checked.filter((c) => c).length === 1 && (
                        <Button
                          size="xSmall"
                          disabled={editOneValid(index).error}
                          label={editIndex === index ? "Save" : "Edit"}
                          variant={editIndex === index ? "filled" : "raised"}
                          buttonStyle={
                            editIndex === index
                              ? "disabled:cursor-not-allowed"
                              : "bg-white"
                          }
                          onClick={() => {
                            if (editIndex === index) {
                              handleSaveClick();
                            } else {
                              handleEditClick(index);
                              setEditEpsilon(`${epsilon}`);
                            }
                          }}
                        />
                      )}
                  </div>
                </TableCell>
                <TableCell className="text-base text-primary underline">
                  <button onClick={() => handleOpenPrivacyGraph(index)}>
                    View Graph
                  </button>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </DialogRoot>
    </TableRoot>
  );
};
