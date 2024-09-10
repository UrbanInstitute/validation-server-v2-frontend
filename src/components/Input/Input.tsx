import { cn } from "@/lib/utils";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { Error } from "..";

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  id: string;
  label?: string;
  inputStyle?: string;
  containerStyle?: string;
  error?: boolean;
  errorMessage?: string;
}

/**
 * Primary UI component for user interaction
 */
export const Input = ({
  id,
  label,
  inputStyle,
  containerStyle,
  error,
  errorMessage,
  ...props
}: InputProps) => {
  return (
    <div className={cn("flex flex-col gap-y-3", containerStyle)}>
      {label && (
        <label className="text-[#343A40] text-base leading-5" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          "rounded-md text-[#343A40] text-left text-xl leading-7 border-[1px] border-[#E6EDF0] shadow-[0_1px_4px_#00000029] focus:accent-[#3D4446] py-4 px-4",
          error && "border-error focus:accent-error border-2",
          inputStyle
        )}
        {...props}
      ></input>
      {error && errorMessage && <Error error={errorMessage} />}
    </div>
  );
};
