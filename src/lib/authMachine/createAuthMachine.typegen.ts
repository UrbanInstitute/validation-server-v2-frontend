// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.authMachine.authenticated.signingOut:invocation[0]": {
      type: "done.invoke.authMachine.authenticated.signingOut:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.authMachine.unauthenticated.signingIn:invocation[0]": {
      type: "error.platform.authMachine.unauthenticated.signingIn:invocation[0]";
      data: unknown;
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    signIn: "done.invoke.authMachine.unauthenticated.signingIn:invocation[0]";
    signOut: "done.invoke.authMachine.authenticated.signingOut:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    resetErrorMessage:
      | "GO_TO_AUTHENTICATED"
      | "done.invoke.authMachine.authenticated.signingOut:invocation[0]"
      | "done.state.authMachine.authenticated.signingOut";
    setErrorMessage: "error.platform.authMachine.unauthenticated.signingIn:invocation[0]";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {
    signIn: "SIGNIN";
    signOut: "SIGNOUT";
  };
  matchesStates:
    | "authenticated"
    | "authenticated.idle"
    | "authenticated.signingOut"
    | "loading"
    | "unauthenticated"
    | "unauthenticated.idle"
    | "unauthenticated.signingIn"
    | {
        authenticated?: "idle" | "signingOut";
        unauthenticated?: "idle" | "signingIn";
      };
  tags: "loading";
}
