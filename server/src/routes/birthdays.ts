import { findByCode } from "../models/Birthday.ts";
import { getHandler, jsonResponse, postHandler } from "../utils/http.ts";

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

type NextBirthday = {
  name: string;
  birth_date: string;
  new_age: number;
  next_birthday: string;
};
const getNextBirthday = getHandler(async (req, ctx, client) => {
  const { code } = ctx.params;

  if (typeof code !== "string") {
    return jsonResponse({
      message: "Invalid code",
    }, 404);
  }

  const { rows } = await client.queryObject<NextBirthday>`
    SELECT
      name,
      birth_date,
      extract(year FROM age(birth_date)) + 1 AS new_age,
      cast(birth_date + ((extract(year FROM age(birth_date)) + 1) * interval '1' year) AS date) AS next_birthday
    FROM
      birthdays
    WHERE
      code = ${code}
    ORDER BY next_birthday ASC
    LIMIT 1
`;

  if (rows.length === 0) {
    return jsonResponse(null, 404);
  }
  return jsonResponse(rows[0]);
});

const registerBirthday = postHandler(async (req, ctx, client) => {
  let params;
  try {
    params = await req.json();
  } catch {
    return new Response(null, { status: 422 });
  }

  const response = await client.queryObject<{ id: string }>`
    INSERT INTO birthdays (name, code, birth_date) 
      VALUES (${params.name}, ${params.code}, ${params.birthDate})
      RETURNING id;
  `;

  if (response.rowCount !== 1) {
    console.log(response);
    return new Response(null, { status: 500 });
  }
  const { id } = response.rows[0];

  return jsonResponse({
    id,
    name: params.name,
    birthDate: params.birthDate,
    code: params.code,
  });
});

export default {
  "/api/birthdays/:code": getGroupMembers,
  "/api/birthdays/:code/next": getNextBirthday,
  "/api/birthdays": registerBirthday,
};
