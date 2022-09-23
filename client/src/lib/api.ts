import { Birthday, intoBirthday, RawBirthday } from './birthday'

export type NextBirthday = {
  name: string
  birth_date: string
  new_age: number
  next_birthday: string
  curr_age: number
}
export const fetchNextBirthday = async (code: string): Promise<NextBirthday | null> => {
  return await fetch(`/api/birthdays/${encodeURIComponent(code)}/next`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    cache: 'no-cache',
  })
    .then((r) => {
      if (r.ok) {
        return r.json() as Promise<NextBirthday>
      }
      return Promise.reject()
    })
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
