import { useEffect, useState } from "react";
import { Button, Input } from "..";
import { AuthContext } from "@/providers/AuthProvider";

export const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, send] = AuthContext.useActor();
  const [loading, setLoading] = useState(false);
  const handleLogin = () => {
    send({ type: "SIGNIN", data: { email, password } });
  };

  useEffect(() => {
    if (state.matches("unauthenticated.signingIn")) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [state]);

  return (
    <div className="w-96 mx-auto">
      <Input
        id="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        id="password"
        label="Password"
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        errorMessage={
          "Login error: Incorrect password or username entered. Please try again."
        }
        error={state.context.errorMessage}
      />

      <Button
        color="primary"
        variant="filled"
        label="Sign In"
        buttonStyle="mt-4 w-full"
        onClick={() => handleLogin()}
        disabled={loading}
      />
    </div>
  );
};
