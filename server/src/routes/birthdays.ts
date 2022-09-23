import { req, res, Server } from "@deno/faster";
import {
  createBirthDay,
  findByCode,
  findNextByCode,
} from "../models/Birthday.ts";
import { withConnection } from "../utils/db.ts";

export const registerBirthDays = (server: Server) => {
  server.get(
    "/api/birthdays/:code",
    res("json"),
    (ctx) =>
      withConnection(async (client) => {
        const { code } = ctx.params;

        if (typeof code !== "string") {
          ctx.res.body = {
            message: "Invalid code",
          };
          ctx.res.status = 404;
          return;
        }
        const birthdays = await findByCode(code, client);

        if (birthdays.length === 0) {
          ctx.res.status = 404;
          return;
        }

        ctx.res.body = birthdays;
        ctx.res.status = 200;
      }),
  );

  server.get(
    "/api/birthdays/:code/next",
    res("json"),
    (ctx) =>
      withConnection(async (client) => {
        const { code } = ctx.params;

        if (typeof code !== "string") {
          ctx.res.body = {
            message: "Invalid code",
          };
          ctx.res.status = 404;
          return;
        }
        const nextBirthday = await findNextByCode(code, client);

        if (!nextBirthday) {
          ctx.res.status = 404;
          return;
        }

        ctx.res.body = nextBirthday;
        ctx.res.status = 200;
      }),
  );

  server.post(
    "/api/birthdays",
    req("json"),
    res("json"),
    (ctx) =>
      withConnection(async (client) => {
        const response = await createBirthDay(ctx.body, client);
        if (!response) {
          throw "Failed to save birthday";
        }

        ctx.res.body = response;
      }),
  );
};
