import classNames from "classnames";

interface HeaderProps {
  /**
   * Prop indicating that the user is logged in.
   */
  loggedIn: boolean;
  /**
   * Is the header stuck to the top of the screen, or does it stay above content?
   */
  sticky?: boolean;

  leftLoggedOutComponent?: React.ReactNode;
  rightLoggedOutComponent?: React.ReactNode;
  leftLoggedInComponent?: React.ReactNode;
  rightLoggedInComponent?: React.ReactNode;
}

export const Header = ({
  loggedIn,
  sticky,
  leftLoggedOutComponent,
  rightLoggedOutComponent,
  leftLoggedInComponent,
  rightLoggedInComponent,
}: HeaderProps) => {
  return (
    <header
      className={classNames(
        "bg-gradient-to-b from-[#0A4C6A] to-[#052635] pt-[32px] min-h-[165px]",
        sticky && "fixed top-0 left-0 right-0 z-10"
      )}
    >
      <div className="px-[60px] flex flex-col">
        <h1 className="text-white text-4xl">
          Access Confidential Tax Data to Advance Your Research
        </h1>
        <div className=" border-b-2 border-[#B6C9D2] mt-[20px]"></div>
        <div className="flex flex-row mt-[15px]">
          {loggedIn && leftLoggedInComponent}
          {!loggedIn && leftLoggedOutComponent}
          <div className="flex-grow" />
          {loggedIn && rightLoggedInComponent}
          {!loggedIn && rightLoggedOutComponent}
        </div>
      </div>
    </header>
  );
};
