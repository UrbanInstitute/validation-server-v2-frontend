import { cn } from "@/lib/utils";
import { Link as RouterLink } from "react-router-dom";

export const Link = ({
  children,
  href,
  className,
  routerLink,
}: {
  children?: React.ReactNode;
  href: string;
  className?: string;
  routerLink?: boolean;
}) => {
  if (routerLink) {
    return (
      <RouterLink className={cn("text-base text-primary", className)} to={href}>
        {children}
      </RouterLink>
    );
  }
  return (
    <a className={cn("text-base text-primary", className)} href={href}>
      {children}
    </a>
  );
};
