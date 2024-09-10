import { useAuthUserContext } from "@/context/AuthUserContext";
import {
  AboutPage,
  DashboardPage,
  HelpPage,
  HomePage,
  ScriptPage,
} from "@/routes";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ScriptProvider } from "./ScriptProvider";

export const RouteProvider = () => {
  const { userId } = useAuthUserContext();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<HomePage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route
          path="/dashboard"
          element={<DashboardPage userId={`${userId}` ?? ""} />}
        />
        <Route
          path="/script"
          element={
            <ScriptProvider>
              <ScriptPage userId={`${userId}` ?? ""} />
            </ScriptProvider>
          }
        />

        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};
