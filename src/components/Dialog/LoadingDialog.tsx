import { Spinner } from "..";
import { DialogOverlay, DialogPortal, DialogRoot } from "./DialogBase";
import * as DialogPrimitive from "@radix-ui/react-dialog";

export const LoadingDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (arg: boolean) => void;
}) => {
  return (
    <DialogRoot open={open} onOpenChange={setOpen}>
      {" "}
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-md md:w-full flex flex-row justify-center">
          <Spinner size="xl" />
        </DialogPrimitive.Content>
      </DialogPortal>
    </DialogRoot>
  );
};
