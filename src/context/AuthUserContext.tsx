import { PropsWithChildren, createContext, useContext, useState } from "react";

type AuthUserContextType = {
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
};

const AuthUserContextInitialValues: AuthUserContextType = {
  userId: null,
  setUserId: () => {},
};

export const AuthUserContext = createContext<AuthUserContextType>(
  AuthUserContextInitialValues
);

export const AuthUserProvider = ({ children }: PropsWithChildren) => {
  const [userId, setUserId] = useState<string | null>(null);

  return (
    <AuthUserContext.Provider value={{ userId, setUserId }}>
      {children}
    </AuthUserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthUserContext = () => useContext(AuthUserContext);
