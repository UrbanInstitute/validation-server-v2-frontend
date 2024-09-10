import classNames from "classnames";
import { Button } from ".";

interface NavButtonProps {
  activeNavLocation?: string;
  navLocation: string;
  label: string;
  onClick?: () => void;
}
export const NavButton = ({
  activeNavLocation,
  navLocation,
  label,
  onClick,
}: NavButtonProps) => {
  return (
    <div
      className={classNames(
        "transition-colors duration-1000 ease-in-out",
        activeNavLocation?.includes(navLocation)
          ? "border-b-info border-b-[6px] pb-1.5"
          : "pb-3"
      )}
    >
      <Button
        color="white"
        variant="clear"
        label={label}
        buttonStyle="hover:scale-110 duration-200"
        onClick={onClick}
      />
    </div>
  );
};
