import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import cors from "@fastify/cors";

import { createContext } from "./context/context";
import { appRouter } from "./router";

const server = fastify();

server.register(cors);

server.register(fastifyTRPCPlugin, {
  prefix: "/generate",
  trpcOptions: { router: appRouter, createContext },
});

(async () => {
  try {
    await server.listen({ port: 4000 });
    console.log("Server listening on port 4000");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
