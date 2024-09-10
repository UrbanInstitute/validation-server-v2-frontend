import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

import { cn } from "@/lib/utils";

export const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "shadow-[0_1px_4px_rgba(0,0,0,0.16)] py-4 px-4 w-full rounded-md",
      className
    )}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";
