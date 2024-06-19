export const allowedSpecies = ['human', 'cat', 'dog'] as const
export type Species = (typeof allowedSpecies)[number]

export type RawBirthday = {
  id: number
  code: string
  birth_date: string
  name: string
  website: string | null
  species: Species
}
export type Birthday = {
  id: number
  code: string
  birth_date: Date
  name: string
  website: URL | null
  species: Species
}
export type RawNextBirthday = {
  name: string
  birth_date: string
  species: Species
  website: null | string
  next_birthday: string
  age: number
}
export type NextBirthday = {
  name: string
  birth_date: Date
  species: Species
  website: null | URL
  next_birthday: Date
  age: number
}

export const intoNextBirthday = (raw: RawNextBirthday): NextBirthday => {
  return {
    ...raw,
    birth_date: new Date(raw.birth_date),
    next_birthday: new Date(raw.next_birthday),
    website: raw.website ? new URL(raw.website) : null,
  }
}

export const intoBirthday = (raw: RawBirthday): Birthday => {
  return {
    ...raw,
    birth_date: new Date(raw.birth_date),
    website: raw.website ? new URL(raw.website) : null,
  }
}
