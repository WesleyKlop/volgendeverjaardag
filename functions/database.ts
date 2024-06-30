import type { D1Database } from '@cloudflare/workers-types/experimental'
import type { Species } from './types'

type DbNextBirthday = {
  id: string
  name: string
  birth_date: string
  species: Species
  website: null | string
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
        DATE(birth_date, 'unixepoch') AS birth_date
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

  const today = new Date()
  return birthdays.results
    .map((birthday) => {
      const birthDate = new Date(birthday.birth_date)
      const nextBirthDay = new Date()
      nextBirthDay.setMonth(birthDate.getMonth())
      nextBirthDay.setDate(birthDate.getDate())
      if (nextBirthDay < today) {
        nextBirthDay.setFullYear(nextBirthDay.getFullYear() + 1)
      }
      const out = {
        name: birthday.name,
        birth_date: birthDate,
        next_birthday: nextBirthDay,
        species: birthday.species,
        website: birthday.website,
        // rare off by one ofzo
        age: calculateAge(birthDate, nextBirthDay),
      }
      return out satisfies NextBirthday
    })
    .sort((a, b) => {
      const ad = a.next_birthday.getTime()
      const bd = b.next_birthday.getTime()
      if (ad > bd) {
        return 1
      }
      if (bd > ad) {
        return -1
      }
      return 0
    })
}
function calculateAge(birthDate: Date, otherDate: Date = new Date()) {
  const years = otherDate.getFullYear() - birthDate.getFullYear()

  if (
    otherDate.getMonth() < birthDate.getMonth() ||
    (otherDate.getMonth() == birthDate.getMonth() && otherDate.getDate() < birthDate.getDate())
  ) {
    return years - 1
  }

  return years
}
