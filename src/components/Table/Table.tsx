import { cn } from "@/lib/utils";
import React from "react";
import { TableCaption } from "./TableCaption";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import { TableHead } from "./TableHead";
import { TableBody } from "./TableBody";
import { TableCell } from "./TableCell";

export const TableRoot = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
));
TableRoot.displayName = "Table";

export const Table = () => {
  return (
    <TableRoot>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Analysis Name + Version</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Refiew & Refine</TableHead>
          <TableHead className="text-right">Public Release</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
      </TableBody>
    </TableRoot>
  );
};
