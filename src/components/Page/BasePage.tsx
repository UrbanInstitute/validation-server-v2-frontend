import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { Page } from ".";
import { AuthContext } from "@/providers/AuthProvider";
import { PageProps } from "./Page";
import { STEPS } from "@/lib/constants";

export const BasePage = ({
  children,
  ...props
}: Omit<
  PageProps,
  | "navigate"
  | "navigation"
  | "loggedIn"
  | "handleLogout"
  | "activeNavLocation"
  | "handleNewScriptClick"
>) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [state, send] = AuthContext.useActor();
  const navigation = [
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
  ];

  const handleNewScriptClick = () => {
    navigate({
      pathname: "/script",
      search: createSearchParams({
        step: `${STEPS.SUBMIT}`,
      }).toString(),
    });
  };

  const handleLogout = () => {
    send({ type: "SIGNOUT" });
  };
  return (
    <Page
      navigate={navigate}
      navigation={navigation}
      activeNavLocation={location.pathname}
      loggedIn={state.matches("authenticated")}
      handleLogout={handleLogout}
      handleNewScriptClick={handleNewScriptClick}
      {...props}
    >
      {children}
    </Page>
  );
};
