import { DoneInvokeEvent, assign, createMachine } from "xstate";
import AuthService from "@/services/authService";

export const createAuthMachine = ({
  authService,
}: {
  authService: AuthService;
}) =>
  createMachine(
    {
      /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAYgHEB5AfQBVqBBAVRoAkBRAORoEkBhemmwAiAbQAMAXUSgADgHtYuAC645+aSAAeiACwAmADQgAnroCMAZgB0AVgC+do2ix5CpSrWqMOTVpx78gqKSGvKKKmoa2gj6RqYIemIAHLYOThg4BMRW6ACuSthg+CqY6EqQJADK3GQcFMziUkggYcqq6s3RFmYpNgCcFgDsNnGINmJ9aSDOmW45+YXFuKXlEFaKUPgEUBT5JBBqYOtKZUczrtl5BUUlp2sbW-g7+Y2hCm2RnYgAbHp9Vt9Bj1hqMEDYzGJUo5phkLkQrLl8FdFrdVlUahxuBxXs1WhEOqAujpIWY9CMTIg9HozFNzll4YjkTdlnd1rhNttuPh9odjqcrHS5oyFsyVpA2RynlycbJ3vioj8qVZBklSeT4lS9FDofg5BA4BpBcQ3uF2gqEABab6gi16HS02H0qwAGzk6Ag2xNHwJWl0hgpCDM4wdLidTKWYogXvlXwSg0h-SG6sQFj6vRDs0uIojrNwEGdYGjZtjgx0OisFh0SdB43+9mhRvh4dR4oe212SiLn0JunGVn0wOTMSS3wzcIRSOzLajuLlxZ7CT6WrVoLMEKh6VDQsn1xzqyseYLXZ90UGQ37Nm6ZNBVLMG5hW+ywt304ljygXOP5p0NnLgMHq5pg4DhAA */
      tsTypes: {} as import("./createAuthMachine.typegen").Typegen0,
      schema: {
        context: {
          errorMessage: undefined,
        },
        events: {} as
          | { type: "SIGNIN"; data: { email: string; password: string } }
          | { type: "SIGNOUT" }
          | { type: "GO_TO_AUTHENTICATED" }
          | { type: "GO_TO_UNAUTHENTICATED" },
        services: {} as {
          signIn: { data: void };
          signOut: { data: void };
        },
      },
      id: "authMachine",
      on: {
        GO_TO_AUTHENTICATED: { target: "authenticated", internal: true },
        GO_TO_UNAUTHENTICATED: { target: "unauthenticated", internal: true },
      },
      initial: authService.isLoggedIn() ? "authenticated" : "unauthenticated",
      states: {
        loading: {
          tags: "loading",
        },
        authenticated: {
          on: { SIGNOUT: { target: ".signingOut" } },
          initial: "idle",
          states: {
            idle: {
              entry: "resetErrorMessage",
            },

            signingOut: {
              invoke: { src: "signOut", onDone: "idle" },
              onDone: {
                target: "idle",
              },
            },
          },
        },
        unauthenticated: {
          on: {
            SIGNIN: { target: ".signingIn" },
          },
          initial: "idle",
          states: {
            idle: {},
            signingIn: {
              invoke: {
                src: "signIn",
                onDone: {
                  target: "idle",
                },
                onError: {
                  target: "idle",
                  actions: "setErrorMessage",
                },
              },
              onDone: { target: "idle" },
            },
          },
        },
      },
    },
    {
      actions: {
        setErrorMessage: assign({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          errorMessage: (_, event: DoneInvokeEvent<any>) => {
            // event is:
            // { type: 'error.platform', data: 'No query specified' }
            return event.data;
          },
        }),
        resetErrorMessage: assign({ errorMessage: () => undefined }),
      },
      services: {
        signIn: (_, event) => async (sendBack) => {
          const success = await authService.login(
            event.data.email,
            event.data.password
          );
          if (success) {
            sendBack({ type: "GO_TO_AUTHENTICATED" });
          } else {
            sendBack({ type: "GO_TO_UNAUTHENTICATED" });
          }
        },
        signOut: () => async (sendBack) => {
          await authService.logout();
          sendBack({ type: "GO_TO_UNAUTHENTICATED" });
        },
      },
    }
  );
