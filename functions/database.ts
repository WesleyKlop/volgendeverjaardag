import type { D1Database } from '@cloudflare/workers-types/experimental'
import type { Species } from './types'

type DbNextBirthday = {
  name: string
  birth_date: number
  species: Species
  website: null | string
  next_birthday: number
  age: number
}
type NextBirthday = {
  name: string
  birth_date: Date
  species: Species
  website: null | string
  next_birthday: Date
  age: number
}

export async function getNextBirthdaysByCode(
  db: D1Database,
  code: string,
): Promise<NextBirthday[]> {
  const birthdays = await db
    .prepare(
      `SELECT
    name,
    DATE(birth_date, 'unixepoch') AS birth_date,
    species,
    website,
    CASE 
        WHEN curr_birthday = DATE('now') THEN curr_birthday
        ELSE DATE(curr_birthday, '+1 year')
    END AS next_birthday,
    CASE 
        WHEN curr_birthday = DATE('now') THEN age
        ELSE age + 1
    END AS age
FROM (
    SELECT
        id,
        name,
        birth_date,
        species,
        website,
        (strftime('%Y', 'now') - strftime('%Y', birth_date, 'unixepoch')) 
        - (strftime('%m-%d', 'now') < strftime('%m-%d', birth_date, 'unixepoch')) AS age,
        DATE(birth_date, 'unixepoch', '+' || (strftime('%Y', 'now') - strftime('%Y', birth_date, 'unixepoch')) || ' years') AS curr_birthday
    FROM
        birthdays
    WHERE
        code = ?) AS base
ORDER BY
    next_birthday ASC;
`,
    )
    .bind(code)
    .all<DbNextBirthday>()

  if (!birthdays.results.length) {
    return []
  }

  return birthdays.results.map(
    (birthday) =>
      ({
        name: birthday.name,
        birth_date: new Date(birthday.birth_date),
        next_birthday: new Date(birthday.next_birthday),
        species: birthday.species,
        website: birthday.website,
        age: birthday.age,
      }) satisfies NextBirthday,
  )
}
