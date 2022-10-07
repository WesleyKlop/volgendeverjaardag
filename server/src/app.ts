import { rateLimit, Server } from "./deps.ts";
import { registerRoutes } from "./routes/index.ts";

const server = new Server();

const remoteAddr = (addr: { path: string } | { hostname: string }) => {
  return "path" in addr ? addr.path : addr.hostname;
};

server.use(async function (ctx, next) {
  console.log(JSON.stringify({
    method: ctx.req.method,
    url: ctx.url.toString(),
    client: remoteAddr(ctx.conn.remoteAddr),
    date: new Date(),
  }));

  await next();
});
server.use(rateLimit({
  attempts: 5,
  interval: 10,
}));

registerRoutes(server);

const port = parseInt(Deno.env.get("APP_PORT") ?? "8080", 10);
const hostname = Deno.env.get("APP_HOSTNAME") ?? "0.0.0.0";

console.log(`Running at http://${hostname}:${port}`);

export default () => server.listen({ port, hostname });
