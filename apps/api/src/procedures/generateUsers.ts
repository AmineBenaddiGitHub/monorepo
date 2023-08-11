import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { client } from "../utils/client";
import { PROPERTIES } from "app-constants";

export const t = initTRPC.create();

export const usersProcedure = t.procedure
  .input(
    z.object({
      length: z.number(),
      properties: z.array(
        z.union(PROPERTIES.map((property) => z.literal(property)) as any)
      ),
    })
  )
  .mutation(async ({ input: { length, properties } }) => {
    try {
      const result = await client.fakeData.mutate({
        length,
        properties,
      });
      return result;
    } catch (error) {
      return error;
    }
  });
