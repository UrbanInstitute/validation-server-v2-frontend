import { Link } from "react-router-dom";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow,
} from "../Table";
import { cn, formatNumber } from "@/lib/utils";
import { ApiAnalyses } from "@/models/apiResponse";
import { useEffect, useState } from "react";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Checkbox } from "..";
import { STEPS } from "@/lib/constants";

export type AnalysesTableProps = {
  rows: Array<ApiAnalyses>;
  jobId: string;
  runId: string;

  setPendingRefinement: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
  setSubmitDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setAnalysesIds: React.Dispatch<React.SetStateAction<Array<number | string>>>;
};

export const AnalysesTable = ({
  rows,
  jobId,
  runId,
  setPendingRefinement,
  setSubmitDisabled,
  setAnalysesIds,
}: AnalysesTableProps) => {
  const [checked, setChecked] = useState(Array(rows.length).fill(false));
  const [allChecked, setAllChecked] = useState<CheckedState>("indeterminate");

  useEffect(() => {
    const selectedRows = rows.filter((_, index) => checked[index]);

    // Use reduce to calculate the sum of epsilon_sum for the selected rows
    const sumOfEpsilonSum = selectedRows.reduce(
      (accumulator, row) => accumulator + parseFloat(row.epsilon_sum as string),
      0
    );
    setPendingRefinement(sumOfEpsilonSum);
    setAnalysesIds(selectedRows.map((row) => row.analysis_id));

    setSubmitDisabled(checked.filter((c) => c).length === 0);
  }, [checked, setPendingRefinement, rows, setSubmitDisabled, setAnalysesIds]);

  const handleCheck = (index: number) => {
    const tempChecked = [...checked];
    tempChecked[index] = !tempChecked[index];
    setChecked(tempChecked);
    setAllChecked(tempChecked.every((c) => c));
  };

  const handleCheckAll = (checkedState: CheckedState) => {
    if (checkedState === "indeterminate") {
      setChecked(Array(rows.length).fill(false));
    } else {
      setChecked(Array(rows.length).fill(checkedState));
    }
    setAllChecked(checkedState);
  };

  return (
    <TableRoot className="rounded-b-md border-none">
      <TableHeader>
        <TableRow className="bg-secondary border border-white uppercase text-base py-1.5 text-white w-[400px]">
          <TableHead className="py-3 px-4">
            <Checkbox
              checked={allChecked}
              onCheckedChange={(checked) => handleCheckAll(checked)}
            />
          </TableHead>
          <TableHead>Analysis</TableHead>
          <TableHead className="text-right">
            Cost to Release (Epsilon)
          </TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows?.map(({ analysis_id, analysis_name, epsilon_sum }, index) => (
          <TableRow
            key={`${analysis_id}-${index}`}
            className={cn(
              index === rows.length - 1
                ? "border-b-0"
                : "border-b border-[rgba(0,0,0,0.16)]"
            )}
          >
            <TableCell className="py-3 px-4">
              <Checkbox
                checked={checked[index]}
                onCheckedChange={() => handleCheck(index)}
              />
            </TableCell>
            <TableCell className="text-lg text-grayText">
              <div className="col-span-2">{analysis_name}</div>
            </TableCell>
            <TableCell className="text-lg text-grayText">
              <div className="font-bold text-ellipsis overflow-hidden ml-1 text-right">
                {formatNumber(epsilon_sum)}
              </div>
            </TableCell>
            <TableCell className="text-lg text-grayText text-right">
              <Link
                className="underline text-primary text-right"
                to={`/script?step=${STEPS.REVIEW_AND_REFINE}&id=${jobId}&runId=${runId}&analysisId=${analysis_id}`}
              >
                Refine Again
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableRoot>
  );
};
