import { PoolClient } from "@deno/x/postgres";

interface IBirthday {
  code: string;
  name: string;
  birthDate: Date;
}

type NextBirthday = {
  name: string;
  birth_date: string;
  new_age: number;
  next_birthday: string;
  curr_age: number;
};

export type RawBirthday = Omit<IBirthday, "birthDate"> & {
  id: string;
  birth_date: string;
};

export default class Birthday implements IBirthday {
  readonly #id: string;

  constructor(
    id: string,
    public readonly code: string,
    public readonly name: string,
    public readonly birthDate: Date,
  ) {
    this.#id = id;
  }

  getId(): string {
    return this.#id;
  }

  static make(
    code: string,
    name: string,
    birthDate: Date,
  ): Birthday {
    return new Birthday(
      crypto.randomUUID(),
      code,
      name,
      birthDate,
    );
  }
}

export const findByCode = async (code: string, client: PoolClient) => {
  const results = await client.queryObject<
    RawBirthday
  >`SELECT id, code, name, birth_date FROM birthdays WHERE code = ${code}`;

  return results.rows.map((row: RawBirthday) => {
    return new Birthday(row.id, row.code, row.name, new Date(row.birth_date));
  });
};

export const findNextByCode = async (
  code: string,
  client: PoolClient,
): Promise<NextBirthday | undefined> => {
  const { rows } = await client.queryObject<NextBirthday>`
SELECT
    name,
    age AS curr_age,
    age + 1 AS new_age,
    birth_date,
    CASE WHEN curr_birthday = CURRENT_DATE THEN
        curr_birthday
    ELSE
        (curr_birthday + interval '1 year')::date
    END AS next_birthday
FROM (
    SELECT
        id,
        name,
        birth_date,
        extract(year FROM age(birth_date)) AS age,
        cast(birth_date + (extract(year FROM age(birth_date)) * interval '1' year) AS date) AS curr_birthday
    FROM
        birthdays
    WHERE
        code = ${code}) AS base
ORDER BY
    next_birthday ASC
LIMIT 1;
`;

  return rows[0];
};

export const findById = async (id: string, client: PoolClient) => {
  const results = await client.queryObject<
    RawBirthday
  >`SELECT id, code, name, birth_date FROM birthdays WHERE id = ${id}`;

  if (results.rowCount !== 1) {
    return;
  }

  return results.rows.map((row: RawBirthday) => {
    return new Birthday(row.id, row.code, row.name, new Date(row.birth_date));
  })[0];
};

export const createBirthDay = async (body: IBirthday, client: PoolClient) => {
  const result = await client.queryObject<{ id: string }>`
          INSERT INTO birthdays (name, code, birth_date) 
            VALUES (${body.name}, ${body.code}, ${body.birthDate})
            RETURNING id;
        `;

  if (result.rowCount !== 1) {
    return;
  }
  return await findById(result.rows[0].id, client);
};
