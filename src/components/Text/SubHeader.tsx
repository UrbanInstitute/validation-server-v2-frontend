import { cn } from "@/lib/utils";
import { ClassNameValue } from "tailwind-merge";

export const SubHeader = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: ClassNameValue;
}) => {
  return (
    <h2
      className={cn("text-lg text-grayText uppercase tracking-wide", className)}
    >
      {children}
    </h2>
  );
};
