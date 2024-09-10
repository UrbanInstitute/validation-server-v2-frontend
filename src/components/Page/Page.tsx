import { ReactNode } from "react";
import { Button, Footer, Header, NavButton, StepperHeader } from "..";
import classNames from "classnames";
import { NavigateFunction } from "react-router-dom";
import { HeaderDropDown } from "../DropDownMenu";
import { FooterProps } from "../Footer/Footer";
import { Toaster } from "../Toast/Toaster";

type NavigationLink = {
  location: string;
  label: string;
};
export interface PageProps {
  children?: ReactNode;
  /**
   * Prop indicating that the user is logged in
   */
  loggedIn?: boolean;
  handleLogin?: () => void;

  handleLogout?: () => void;

  handleDashboardClick?: () => void;
  handleAboutClick?: () => void;
  handleHelpClick?: () => void;
  handleAccountClick?: () => void;

  handleNewScriptClick?: () => void;

  /**
   * Is the header stuck to the top of the screen, or does it stay above content?
   */
  stickyHeader?: boolean;
  /**
   * Is the footer visible?
   */
  footer?: boolean;

  stepper?: boolean;
  activeStep?: number;
  activeNavLocation?: string;
  navigate?: NavigateFunction;
  navigation?: Array<NavigationLink>;
  footerProps?: FooterProps;
}
export const Page = ({
  children,
  loggedIn,
  stickyHeader,
  stepper,
  activeStep,
  activeNavLocation,
  handleNewScriptClick,
  handleLogout,
  footer,
  footerProps,
  navigate = console.log,
  navigation = [
    {
      location: "/dashboard",
      label: "Dashboard",
    },
    {
      location: "/about",
      label: "About",
    },
    {
      location: "/help",
      label: "Help",
    },
  ],
}: PageProps) => {
  return (
    <div className="w-screen min-h-screen flex flex-col pb-24">
      <Header
        sticky={stickyHeader}
        loggedIn={loggedIn ?? false}
        leftLoggedInComponent={
          <div className="pb-3">
            <Button
              color="actionYellow"
              variant="filled"
              label="New Script"
              bold
              buttonStyle="hover:scale-110 duration-200 w-[194px]"
              onClick={handleNewScriptClick}
            />
          </div>
        }
        rightLoggedInComponent={
          <>
            {navigation.map((nav) => (
              <NavButton
                label={nav.label}
                navLocation={nav.location}
                key={nav.location}
                activeNavLocation={activeNavLocation}
                onClick={() => navigate(nav.location)}
              />
            ))}
            <HeaderDropDown handleLogout={handleLogout} />
          </>
        }
      />
      <div
        className={classNames(
          "flex-grow overflow-y-scroll",
          stickyHeader && "mt-[164px]",
          footerProps?.sticky && "mb-[132px]"
        )}
      >
        {stepper && (
          <StepperHeader
            steps={[
              "Submit Script",
              "Review & Refine Results",
              "Release Results",
            ]}
            activeStep={activeStep ?? 0}
          />
        )}
        <div className="ml-[62px] mr-[165px] pt-[42px] pb-4">
          <div className="max-w-[1366px] flex flex-col mx-auto">{children}</div>
        </div>
      </div>
      <Toaster />
      {footer && footerProps && <Footer {...footerProps} />}
    </div>
  );
};
