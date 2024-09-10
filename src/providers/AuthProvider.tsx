import {
  AuthUserProvider,
  useAuthUserContext,
} from "@/context/AuthUserContext";
import { authMachine } from "@/lib/authMachine";
import { authService } from "@/services";
import { collections } from "@/services/database";
import { createActorContext } from "@xstate/react";
import { PropsWithChildren, useEffect } from "react";

export const AuthContext = createActorContext(authMachine);

export function AuthProvider({ children }: PropsWithChildren) {
  return (
    <AuthContext.Provider>
      <AuthUserProvider>
        <AuthDbComponent>{children}</AuthDbComponent>
      </AuthUserProvider>
    </AuthContext.Provider>
  );
}

const AuthDbComponent = ({ children }: PropsWithChildren) => {
  const [state] = AuthContext.useActor();
  const { setUserId } = useAuthUserContext();
  const collection = collections.accounts;

  useEffect(() => {
    const { userId, email } = authService.retrieveUser();
    setUserId(userId ?? null);
    if (state.matches("authenticated") && userId) {
      collection?.upsert({
        id: userId,
        userName: email,
        lastLoginTime: new Date().setUTCMilliseconds(0),
      });
    }
  }, [state, collection, setUserId]);

  return <div>{children}</div>;
};
