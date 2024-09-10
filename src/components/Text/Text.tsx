import { cn } from "@/lib/utils";

export const Text = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("text-base text-grayText", className)}>{children}</div>
  );
};
