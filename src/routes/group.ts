import { findByCode } from "../models/Birthday.ts";
import { getHandler, jsonResponse } from "../utils/http.ts";

const getGroupMembers = getHandler(async (_req, ctx, client) => {
  const { code } = ctx.params;

  if (typeof code !== "string") {
    return jsonResponse({
      message: "Invalid code",
    }, 404);
  }

  const birthdays = await findByCode(code as string, client);

  if (birthdays.length === 0) {
    return new Response(undefined, {
      status: 404,
    });
  }

  return jsonResponse(birthdays, 200);
});

export default {
  "/api/birthdays/:code": getGroupMembers,
};
