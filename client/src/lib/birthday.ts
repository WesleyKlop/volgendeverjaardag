export type Birthday = {
  id: string
  code: string
  name: string
  birthDate: Date
}

export type RawBirthday = Omit<Birthday, 'birthDate'> & {
  birthDate: string
}

export const intoBirthday = (raw: RawBirthday): Birthday => {
  return {
    ...raw,
    birthDate: new Date(raw.birthDate),
  }
}
