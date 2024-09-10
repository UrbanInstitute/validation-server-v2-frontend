import { AuthContext } from "@/providers/AuthProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useProtected = () => {
  const [state] = AuthContext.useActor();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.matches("unauthenticated")) {
      navigate("/");
    }
  }, [state, navigate]);
};
