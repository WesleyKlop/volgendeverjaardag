import type { D1Database } from '@cloudflare/workers-types/experimental'
import type { Species } from './types'
import {
  calculateAgeInYears,
  calculateNextBirthday,
  formatISODate,
  newStartOfDayDate,
} from './date'

type DbNextBirthday = {
  id: string
  name: string
  birth_date: string
  species: Species
  website: null | string
}
type NextBirthday = {
  name: string
  birth_date: string
  species: Species
  website: null | string
  next_birthday: string
  age: number
}

export async function getNextBirthdaysByCode(
  db: D1Database,
  code: string,
  filters: {
    type?: string
  },
): Promise<NextBirthday[]> {
  const wheres: Record<string, string> = {
    [`code = ?`]: code,
  }
  if (filters.type) {
    wheres['species = ?'] = filters.type
  }
  const birthdays = await db
    .prepare(
      `
    SELECT
        id,
        name,
        species,
        website,
        birth_date
    FROM
        birthdays
        ${Object.entries(wheres).length ? `WHERE ${Object.keys(wheres).join(' AND ')}` : ''}
`,
    )
    .bind(...Object.values(wheres))
    .all<DbNextBirthday>()

  if (!birthdays.results.length) {
    return []
  }

  const today = newStartOfDayDate(Date.now())
  return birthdays.results
    .map((birthday) => {
      // The Date constructor would default to the current time when not specified.
      const birthDate = newStartOfDayDate(birthday.birth_date)
      const nextBirthDay = calculateNextBirthday(birthDate, today)
      const out: NextBirthday = {
        name: birthday.name,
        birth_date: formatISODate(birthDate),
        next_birthday: formatISODate(nextBirthDay),
        species: birthday.species,
        website: birthday.website,
        age: calculateAgeInYears(birthDate, nextBirthDay),
      }
      return out
    })
    .sort((a, b) => {
      return a.next_birthday.localeCompare(b.next_birthday)
    })
}
