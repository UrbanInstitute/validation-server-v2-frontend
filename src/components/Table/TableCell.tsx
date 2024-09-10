import { cn } from "@/lib/utils";
import React from "react";

export const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "py-2 px-4 align-middle [&:has([role=checkbox])]:pr-0 h-12",
      className
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";
