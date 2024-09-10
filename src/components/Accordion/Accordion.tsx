import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { AccordionItem } from "./AccordionItem";
import { AccordionTrigger, AccordionTriggerProps } from "./AccordionTrigger";
import { AccordionContent } from "./AccordionContent";
import { useState } from "react";
export const AccordionRoot = AccordionPrimitive.Root;

interface AccordionProps extends AccordionTriggerProps {
  header: React.ReactNode;
  subHeader?: React.ReactNode;
  children?: React.ReactNode;
  accordionStyle?: string;
  titleStyle?: string;
  contentStyle?: string;
}

export const Accordion = ({
  header,
  subHeader,
  children,
  chevronSize,
  chevronColor,
  titleColor,
  titleSize,
  accordionStyle,
  titleStyle,
  contentStyle,
  ...props
}: AccordionProps) => {
  const [value, setValue] = useState("none");
  const handleTrigger = () => {
    if (value === "one") {
      setValue("none");
    } else {
      setValue("one");
    }
  };
  return (
    <AccordionRoot
      type="single"
      collapsible
      value={value}
      onValueChange={setValue}
    >
      <AccordionItem value="one" className={accordionStyle}>
        <AccordionTrigger
          chevronSize={chevronSize}
          chevronColor={chevronColor}
          titleColor={titleColor}
          titleSize={titleSize}
          className={titleStyle}
          beforeTriggerChildren={header}
          {...props}
          trigger={handleTrigger}
        >
          {subHeader}
        </AccordionTrigger>
        <AccordionContent className={contentStyle}>{children}</AccordionContent>
      </AccordionItem>
    </AccordionRoot>
  );
};
