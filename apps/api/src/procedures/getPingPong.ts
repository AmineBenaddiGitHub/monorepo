import { initTRPC } from "@trpc/server";

export const t = initTRPC.create();

export const getPingPong = t.procedure.query(() => "pong");
