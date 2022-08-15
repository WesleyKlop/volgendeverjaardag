import { RouteHandler } from "@deno/x/router";
import * as log from "@deno/log";

export const withErrorHandling =
  (handler: RouteHandler): RouteHandler => async (req, info) => {
    try {
      return await Promise.resolve(handler(req, info));
    } catch (err) {
      log.error(err);
    }
    return new Response("NOT OK", { status: 500 });
  };
