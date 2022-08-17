import { PoolClient } from "@deno/x/postgres";

interface IBirthday {
  code: string;
  name: string;
  birthDate: Date;

  getId(): string;
}

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
    IBirthday
  >`SELECT id, code, name, birth_date FROM birthdays WHERE code = ${code}`;

  return results.rows.map((row: RawBirthday) => {
    return new Birthday(row.id, row.code, row.name, new Date(row.birth_date));
  });
};
