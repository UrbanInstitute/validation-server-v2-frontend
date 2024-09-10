import classNames from "classnames";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./DropDownMenu";
import { Button } from "..";

interface HeaderDropDownProps {
  handleLogout?: () => void;
}

export const HeaderDropDown = ({ handleLogout }: HeaderDropDownProps) => {
  return (
    <div
      className={classNames("transition-colors duration-1000 ease-in-out pb-3")}
    >
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer text-center flex flex-row justify-end items-end gap-x-2 pl-5 py-2.5 rounded-md hover:scale-[102%] duration-200 border-white text-white">
          Account
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 18"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 fill-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5z"
            />
          </svg>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-darkBlue2">
          <DropdownMenuLabel className="text-base text-disabled font-normal pr-0">
            Account
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="p-0">
            <Button
              color="white"
              variant="clear"
              label={"Logout"}
              buttonStyle="hover:bg-blue hover:text-base duration-200 bg-darkBlue2 text-disabled min-w-[200px] min-h-[48px]"
              onClick={handleLogout}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
              }
              iconPosition="right"
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
