import { Birthday, intoBirthday, RawBirthday } from './birthday'

export type NextBirthday = {
  name: string
  birthDate: Date
  nextBirthday: Date
  age: number
}
type RawNextBirthday = {
  name: string
  birthDate: string
  nextBirthday: string
  age: number
}
export const fetchNextBirthday = async (
  code: string,
  all = false,
): Promise<NextBirthday[] | null> => {
  const url = new URL(`/api/birthdays/${encodeURIComponent(code)}/next`, location.origin)
  if (all) {
    url.searchParams.append('all', '')
  }
  return await fetch(url.toString(), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    cache: 'no-cache',
  })
    .then((r) => {
      if (r.ok) {
        return r.json() as Promise<RawNextBirthday[]>
      }
      return Promise.reject()
    })
    .then((birthdays) =>
      birthdays.map(
        (bd): NextBirthday => ({
          name: bd.name,
          age: bd.age,
          nextBirthday: new Date(bd.nextBirthday),
          birthDate: new Date(bd.birthDate),
        }),
      ),
    )
    .catch(() => null)
}

type SubmitBirthdayParams = Omit<Birthday, 'id'>
export const submitBirthday = async (params: SubmitBirthdayParams) => {
  return await fetch(`/api/birthdays`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',
    body: JSON.stringify(params),
  })
    .then((r) => {
      if (r.ok) {
        return r.json() as Promise<RawBirthday>
      }
      return Promise.reject()
    })
    .then((b) => intoBirthday(b))
}
