import { Button, ButtonProps } from "..";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "./DialogBase";

interface DialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: string;
  description?: string;
  actionButtons?: Array<ButtonProps>;
  contentStyle?: string;
  children?: React.ReactNode;
  disableTrigger?: boolean;
}

export const Dialog = ({
  open,
  setOpen,
  title,
  description,
  actionButtons,
  contentStyle,
  children,
  disableTrigger,
}: DialogProps) => {
  return (
    <DialogRoot open={open} onOpenChange={setOpen}>
      {!disableTrigger && (
        <DialogTrigger asChild>
          <Button
            onClick={() => setOpen(true)}
            variant="filled"
            label="Open"
          ></Button>
        </DialogTrigger>
      )}
      <DialogContent className={contentStyle}>
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
        <DialogFooter>
          {actionButtons?.map((buttonProps, index) => (
            <Button key={index} {...buttonProps} />
          ))}
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};
