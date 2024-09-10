import { BasePage } from "@/components";
import { SignInForm } from "@/components/Forms/SignInForm";
import { TextHeader } from "@/components/Text";
import { AuthContext } from "@/providers/AuthProvider";
import { useEffect } from "react";
import TagManager from "react-gtm-module";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const tagManagerArgs = {
    dataLayerName: "HomePage",
  };
  const [state] = AuthContext.useActor();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.matches("authenticated")) {
      navigate("/dashboard");
    }
  }, [state, navigate]);

  TagManager.dataLayer(tagManagerArgs);

  return (
    <BasePage>
      <TextHeader>Login</TextHeader>
      <SignInForm />
    </BasePage>
  );
};
