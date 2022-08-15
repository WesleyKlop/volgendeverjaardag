import { PoolClient } from "@deno/x/postgres";

interface IBirthday {
  id: string;
  code: string;
  name: string;
  birthDate: Date;
}

export default class Birthday implements IBirthday {
  constructor(
    public readonly id: string,
    public readonly code: string,
    public readonly name: string,
    public readonly birthDate: Date,
  ) {}

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
    IBirthday
  >`SELECT id, code, name, birth_date FROM birthdays WHERE code = ${code}`;

  return results.rows.map((row) => {
    return new Birthday(row.id, row.code, row.name, row.birthDate);
  });
};
