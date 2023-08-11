import { initTRPC } from "@trpc/server";
import { z } from "zod";

import { Context } from "../context/context";

export const t = initTRPC.context<Context>().create();

export const dataGenerator = t.procedure
  .input(
    z.object({
      length: z.number(),
      properties: z.array(
        z.union([
          z.literal("bio"),
          z.literal("firstName"),
          z.literal("lastName"),
          z.literal("sex"),
          z.literal("jobTitle"),
          z.literal("jobType"),
          z.literal("phoneNumber"),
        ])
      ),
    })
  )
  .mutation(({ input, ctx: { faker } }) => {
    const { length, properties } = input;
    return Array.from({ length }).map(() => {
      return properties.reduce((acc, prop) => {
        return {
          ...acc,
          [prop]:
            prop === "phoneNumber"
              ? faker.phone.number()
              : faker.person[prop](),
        };
      }, {});
    });
  });
