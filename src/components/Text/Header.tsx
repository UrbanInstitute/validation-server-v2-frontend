import { cn } from "@/lib/utils";

export const Header = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <h1 className={cn("text-3xl text-grayText font-bold", className)}>
      {children}
    </h1>
  );
};
