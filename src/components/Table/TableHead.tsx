import { cn } from "@/lib/utils";
import React from "react";

export const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 h-12",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";
