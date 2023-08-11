import { initTRPC } from "@trpc/server";
import { usersProcedure } from "./procedures/generateUsers";
import { getPingPong } from "./procedures/getPingPong";

export const t = initTRPC.create();

export const appRouter = t.router({
  generateUsers: usersProcedure,
  ping: getPingPong,
});

export type AppRouter = typeof appRouter;
