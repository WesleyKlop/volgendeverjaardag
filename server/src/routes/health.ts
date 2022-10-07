import { Server } from "../deps.ts";

export const registerHealth = (server: Server) => {
  server.get("/api/health", ({ res }) => {
    res.headers.set("Content-Type", "text/plain");
    res.body = "OK";
  });
};
