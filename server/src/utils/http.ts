import { Status } from "@deno/http/http_status.ts";
import { RouteHandler, RouteHandlerContext } from "@deno/x/router";
import { PoolClient } from "@deno/x/postgres";
import { withConnection } from "./db.ts";
import { withErrorHandling } from "./errors.ts";

export const jsonResponse = (
  body: Parameters<JSON["stringify"]>[0],
  status: Status = 200,
) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });

export type ExtendedRouteHandler = (
  request: Request,
  ctx: RouteHandlerContext,
  db: PoolClient,
) => Promise<Response> | Response;
type Method = "GET" | "POST";

const withDatabase = (
  handler: ExtendedRouteHandler,
): RouteHandler =>
async (req: Request, ctx: RouteHandlerContext) => {
  return await withConnection((client) => {
    return Promise.resolve(handler(req, ctx, client));
  });
};

const finishWithMethod = (method: Method, handler: RouteHandler) => ({
  [method]: withErrorHandling(handler),
});

export const getHandler = (handler: ExtendedRouteHandler) =>
  finishWithMethod(
    "GET",
    withDatabase(handler),
  );

export const postHandler = (handler: ExtendedRouteHandler) =>
  finishWithMethod("POST", withDatabase(handler));
