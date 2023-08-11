"use client";

import "ui/styles.css";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpLink } from "@trpc/client";

import { Header } from "ui";
import { trpc } from "./utils/trpc";
import { FakeDataGen } from "./components/FakeDataGen";
import { PingPong } from "./components/PingPong";

export default function Page() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpLink({
          url: "http://localhost:4500/api",
        }),
      ],
      transformer: undefined,
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <PingPong />
        <Header text="Fake Data Generator" />
        <FakeDataGen />
      </QueryClientProvider>
    </trpc.Provider>
  );
}
