import { req, res, Server } from "../deps.ts";
import { createBirthDay, findNextByCode } from "../models/Birthday.ts";
import { withConnection } from "../utils/db.ts";

const ALLOWED_ORIGINS = [
  "lijstje.nl",
];

export const registerBirthDays = (server: Server) => {
  server.get(
    "/api/birthdays/:code/next",
    res("json"),
    (ctx) =>
      withConnection(async (client) => {
        const { code } = ctx.params;
        const includeAll = ctx.url.searchParams.has("all");

        if (typeof code !== "string") {
          ctx.res.body = {
            message: "Invalid code",
          };
          ctx.res.status = 404;
          return;
        }
        const nextBirthday = await findNextByCode(code, client, !includeAll);

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
        const birthday = {
          code: ctx.body.code,
          birthDate: new Date(ctx.body.birthDate),
          name: ctx.body.name,
          website: ctx.body.website ? new URL(ctx.body.website) : undefined,
        };
        if (
          typeof birthday.code !== "string" ||
          birthday.code.length < 6 ||
          birthday.code.length >= 32
        ) {
          ctx.res.status = 422;
          ctx.res.body = {
            message:
              "Invalid code, must be a string between 6 and 32 characters",
          };
          return;
        }
        birthday.code = birthday.code.toLowerCase();
        if (isNaN(birthday.birthDate.getTime())) {
          ctx.res.status = 422;
          ctx.res.body = {
            message: "Invalid birthdate, must be a valid date",
          };
          return;
        }
        if (typeof birthday.name !== "string" || birthday.name.length >= 32) {
          ctx.res.status = 422;
          ctx.res.body = {
            message:
              "Invalid name, must be a string smaller than 32 characters",
          };
          return;
        }
        if (
          birthday.website !== undefined &&
          !ALLOWED_ORIGINS.includes(birthday.website.host)
        ) {
          ctx.res.status = 422;
          ctx.res.body = {
            message: "Invalid website",
          };
          return;
        }

        const response = await createBirthDay(birthday, client);
        if (!response) {
          throw "Failed to save birthday";
        }

        ctx.res.body = response;
      }),
  );
};
