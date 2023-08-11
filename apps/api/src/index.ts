import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import cors from "@fastify/cors";

import { appRouter } from "./router";

const server = fastify();

server.register(cors);

server.register(fastifyTRPCPlugin, {
  prefix: "/api",
  trpcOptions: { router: appRouter },
});

(async () => {
  try {
    await server.listen({ port: 4500 });
    console.log("Server listening on port 4500");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
