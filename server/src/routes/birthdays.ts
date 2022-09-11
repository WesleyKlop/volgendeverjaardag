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
    ({ params, res: resp }) =>
      withConnection(async (client) => {
        const { code } = params;

        if (typeof code !== "string") {
          resp.body = {
            message: "Invalid code",
          };
          resp.status = 404;
          return;
        }
        const birthdays = await findByCode(code, client);

        if (birthdays.length === 0) {
          resp.status = 404;
          return;
        }

        resp.body = birthdays;
        resp.status = 200;
      }),
  );

  server.get(
    "/api/birthdays/:code/next",
    res("json"),
    ({ params, res: resp }) =>
      withConnection(async (client) => {
        const { code } = params;

        if (typeof code !== "string") {
          resp.body = {
            message: "Invalid code",
          };
          resp.status = 404;
          return;
        }
        const nextBirthday = await findNextByCode(code, client);

        if (!nextBirthday) {
          resp.status = 404;
          return;
        }

        resp.body = nextBirthday;
        resp.status = 200;
      }),
  );

  server.post(
    "/api/birthdays",
    req("json"),
    res("json"),
    (ctx) =>
      withConnection(async (client) => {
        let body;
        try {
          body = await ctx.req.json();
        } catch {
          ctx.resp.status = 422;
          return;
        }

        const response = await createBirthDay(body, client);
        if (response) {
          throw "Failed to save birthday";
        }

        ctx.resp.body = response;
      }),
  );
};
