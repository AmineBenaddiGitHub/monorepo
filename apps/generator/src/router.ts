import { initTRPC } from "@trpc/server";

import { Context } from "./context/context";
import { dataGenerator } from "./procedures/dataGenerator";

export const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
  fakeData: dataGenerator,
});

export type AppRouter = typeof appRouter;
