import { Server } from "../deps.ts";
import { registerBirthDays } from "./birthdays.ts";
import { registerHealth } from "./health.ts";

export const registerRoutes = (server: Server) => {
  registerHealth(server);
  registerBirthDays(server);
};
