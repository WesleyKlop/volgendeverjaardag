import {PoolClient} from "../deps.ts";

type Birthday = {
    id: string;
    code: string;
    name: string;
    birthDate: Date;
    website: URL | undefined;
};

type NextBirthday = {
    name: string;
    birthDate: Date;
    age: number;
    nextBirthday: Date;
    website: URL | undefined;
};

export type RawBirthday = Omit<Birthday, "birthDate" | "website"> & {
    birth_date: string;
    website: string | undefined;
};

type RawNextBirthday = {
    name: string;
    birth_date: string;
    age: number;
    next_birthday: string;
    website: string | undefined;
};
export const findNextByCode = async (
    code: string,
    client: PoolClient,
    onlyOnNextDate = true,
): Promise<NextBirthday[]> => {
    const {rows} = await client.queryObject<RawNextBirthday>`
SELECT
    name,
    birth_date,
    website,
    CASE WHEN curr_birthday = CURRENT_DATE THEN
        curr_birthday
    ELSE
        (curr_birthday + interval '1 year')::date
    END AS next_birthday,
    CASE WHEN curr_birthday = CURRENT_DATE THEN
        age
    ELSE
        age + 1
    END AS age
FROM (
    SELECT
        id,
        name,
        birth_date,
        website,
        extract(year FROM age(birth_date))::smallint AS age,
        cast(birth_date + (extract(year FROM age(birth_date)) * interval '1' year) AS date) AS curr_birthday
    FROM
        birthdays
    WHERE
        code = ${code}) AS base
ORDER BY
    next_birthday ASC;
`;

    console.log(rows);
    const result: NextBirthday[] = rows.map((row) => ({
        name: row.name,
        age: row.age,
        nextBirthday: new Date(row.next_birthday),
        birthDate: new Date(row.birth_date),
        website: row.website ? new URL(row.website) : undefined,
    }));
    const nextBirthday = result[0]?.nextBirthday;

    if (!nextBirthday) {
        return [];
    }

    if (!onlyOnNextDate) {
        return result;
    }

    return result.filter((bd) =>
        bd.nextBirthday.getTime() === nextBirthday.getTime()
    );
};

export const findById = async (id: string, client: PoolClient) => {
    const results = await client.queryObject<RawBirthday>`SELECT id, code, name, birth_date, website FROM birthdays WHERE id = ${id}`;

    if (results.rowCount !== 1) {
        return;
    }

    return results.rows.map((row: RawBirthday): Birthday => ({
        id: row.id,
        code: row.code,
        name: row.name,
        birthDate: new Date(row.birth_date),
        website: row.website ? new URL(row.website) : undefined,
    }))[0];
};

type NewBirthday = Omit<Birthday, "id">;
export const createBirthDay = async (body: NewBirthday, client: PoolClient) => {
    const result = await client.queryObject<{ id: string }>`
          INSERT INTO birthdays (name, code, birth_date, website) 
            VALUES (${body.name}, ${body.code}, ${body.birthDate}, ${body.website?.toString()})
            RETURNING id;
    `;

    if (result.rowCount !== 1) {
        return;
    }
    return await findById(result.rows[0].id, client);
};
