import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// eslint-disable-next-line react-refresh/only-export-components
export const queryClient = new QueryClient();

export const QueryProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
