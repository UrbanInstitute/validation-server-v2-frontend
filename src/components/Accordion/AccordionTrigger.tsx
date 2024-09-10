import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import classNames from "classnames";

export interface AccordionTriggerProps {
  chevronSize?: "small" | "medium" | "large";
  chevronColor?: "primary" | "secondary" | "black";
  titleSize?: "small" | "medium" | "large";
  titleColor?: "primary" | "secondary" | "black";
  beforeTriggerChildren?: React.ReactNode;
  afterTriggerChildren?: React.ReactNode;
  trigger?: () => void;
}

export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps &
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(
  (
    {
      className,
      beforeTriggerChildren,
      afterTriggerChildren,
      children,
      chevronSize = "medium",
      chevronColor = "black",
      titleSize = "medium",
      titleColor = "black",
      trigger,
      ...props
    },
    ref
  ) => (
    <AccordionPrimitive.Header
      className={cn(
        classNames(
          "flex flex-row justify-between font-medium items-center h-ful [&[data-state=open]>svg]:rotate-180",
          titleSize === "small"
            ? "text-sm"
            : titleSize === "medium"
            ? "text-base"
            : "text-lg",
          titleColor === "primary"
            ? "text-primary"
            : titleColor === "secondary"
            ? "text-secondary"
            : "text-black"
        ),
        className
      )}
    >
      {beforeTriggerChildren}
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          classNames(
            "flex flex-row flex-grow items-center justify-between font-medium transition-all [&[data-state=open]>svg]:rotate-180",
            titleSize === "small"
              ? "text-sm"
              : titleSize === "medium"
              ? "text-base"
              : "text-lg",
            titleColor === "primary"
              ? "text-primary"
              : titleColor === "secondary"
              ? "text-secondary"
              : "text-black"
          )
        )}
        {...props}
      >
        {children}
        {!afterTriggerChildren && (
          <ChevronDown
            className={classNames(
              "shrink-0 transition-transform duration-200 text-iconBlack [&[data-state=open]>svg]:rotate-180",
              chevronSize === "small"
                ? "h-4 w-4"
                : chevronSize === "medium"
                ? "h-6 w-6"
                : "h-8 w-8",
              chevronColor === "primary"
                ? "text-primary"
                : chevronColor === "secondary"
                ? "text-secondary"
                : "text-black"
            )}
          />
        )}
      </AccordionPrimitive.Trigger>
      {afterTriggerChildren}

      {afterTriggerChildren && (
        <ChevronDown
          className={classNames(
            "shrink-0 transition-transform duration-200 text-iconBlack [&[data-state=open]>svg]:rotate-180",
            chevronSize === "small"
              ? "h-4 w-4"
              : chevronSize === "medium"
              ? "h-6 w-6"
              : "h-8 w-8",
            chevronColor === "primary"
              ? "text-primary"
              : chevronColor === "secondary"
              ? "text-secondary"
              : "text-black"
          )}
          onClick={() => (trigger ? trigger() : undefined)}
        />
      )}
    </AccordionPrimitive.Header>
  )
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
