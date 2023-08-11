import { inferAsyncReturnType } from "@trpc/server";
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { faker } from "@faker-js/faker";

export function createContext({ req, res }: CreateFastifyContextOptions) {
  // HERE WE CAN ADD ANYTHING TO THE CONTEXT
  // E.G. CONNECTION TO A DATABASE OR A CACHE
  // I ADD HERE AN ACCESS TO FAKER.JS
  return { req, res, faker };
}
export type Context = inferAsyncReturnType<typeof createContext>;
