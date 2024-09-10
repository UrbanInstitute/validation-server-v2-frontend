import React from "react";
import { Spinner } from "..";
import { cn } from "@/lib/utils";

export type ButtonProps = {
  /**
   * What background color to use
   */
  color?: "primary" | "actionYellow" | "white";
  /**
   * How large should the button be?
   */
  size?: "xSmall" | "small" | "medium" | "large" | "tight";
  /**
   * Optional bold text
   */
  bold?: boolean;
  /**
   * Button contents
   */
  label: string;
  /**
   * Variant - defines background color and border
   */
  variant?: "filled" | "outlined" | "clear" | "raised";
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * Optional Disabled
   */
  disabled?: boolean;
  /**
   * Optional loading indicator (disables as well)
   */
  loading?: boolean;
  buttonStyle?: React.HTMLAttributes<HTMLButtonElement>["className"];
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
};

const selectSpinnerColor = (colorClass: string) => {
  switch (colorClass) {
    case "primary-clear": {
      return "primary";
    }
    case "primary-outlined": {
      return "primary";
    }
    case "primary-filled": {
      return "actionYellow";
    }
    case "primary-raised": {
      return "primary";
    }
    case "actionYellow-clear": {
      return "actionYellow";
    }
    case "actionYellow-outlined": {
      return "actionYellow";
    }
    case "actionYellow-filled": {
      return "primary";
    }
    case "actionYellow-raised": {
      return "actionYellow";
    }
    case "white-clear": {
      return "primary";
    }
    case "white-outlined": {
      return "primary";
    }
    case "white-filled": {
      return "primary";
    }
    case "white-raised": {
      return "primary";
    }
    default: {
      return "primary";
    }
  }
};
/**
 * Primary UI component for user interaction
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      color = "primary",
      size = "medium",
      variant = "clear",
      bold = false,
      label,
      disabled = false,
      loading = false,
      buttonStyle,
      icon,
      iconPosition = "left",
      ...props
    },
    ref
  ) => {
    const colorClass = `${color}-${variant}`;
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "cursor-pointer text-center flex flex-row justify-center items-center gap-x-2 hover:scale-[102%] duration-200",
          variant !== "clear" && "shadow-[0_1px_4px_rgba(0,0,0,0.16)]",
          colorClass === "primary-clear" &&
            !disabled &&
            " border-primary text-primary",
          colorClass === "primary-outlined" &&
            !disabled &&
            "border-2 border-primary text-primary",
          colorClass === "primary-filled" &&
            !disabled &&
            "bg-primary border-primary text-white",
          colorClass === "primary-raised" && !disabled && " text-primary",
          colorClass === "actionYellow-clear" &&
            !disabled &&
            " border-actionYellow text-actionYellow",
          colorClass === "actionYellow-outlined" &&
            !disabled &&
            "border-2 border-actionYellow text-actionYellow",
          colorClass === "actionYellow-filled" &&
            !disabled &&
            "bg-actionYellow border-actionYellow text-actionYellowText",

          colorClass === "actionYellow-raised" &&
            !disabled &&
            " text-actionYellow",
          size === "xSmall"
            ? "px-2.5 py-2 text-sm rounded-xl"
            : size === "tight"
            ? "px-0 py-2.5 rounded-md"
            : size === "small"
            ? "px-2.5 py-2.5 text-sm rounded-xl"
            : size === "large"
            ? "px-6 py-3 rounded-md"
            : "px-5 py-2.5 rounded-md",

          colorClass === "white-clear" &&
            !disabled &&
            " border-white text-white",
          colorClass === "white-outlined" &&
            !disabled &&
            "border-2 border-white text-white",
          colorClass === "white-filled" &&
            !disabled &&
            "bg-white border-white text-primary",
          disabled &&
            (variant === "filled"
              ? "bg-transparent text-disabledText cursor-not-allowed"
              : variant === "outlined"
              ? "bg-transparent border-disabled text-disabledText cursor-not-allowed"
              : "bg-disabled text-disabledText cursor-not-allowed"),
          disabled && "hover:scale-[100%]",
          bold && "font-bold",
          buttonStyle
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <Spinner
            size="small"
            color={!disabled ? selectSpinnerColor(colorClass) : "disabled"}
          />
        )}
        {icon && iconPosition === "left" && icon}
        {label}
        {icon && iconPosition === "right" && icon}
      </button>
    );
  }
);
