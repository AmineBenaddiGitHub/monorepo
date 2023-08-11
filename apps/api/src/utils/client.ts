import { createTRPCProxyClient, httpLink, loggerLink } from "@trpc/client";

import type { AppRouter as ClientAppRouter } from "generator/src/router";

export const client = createTRPCProxyClient<ClientAppRouter>({
  links: [
    httpLink({
      url: "http://localhost:4000/generate",
    }),
    loggerLink(),
  ],
  transformer: undefined,
});
