import type { EventContext } from '@cloudflare/workers-types/experimental'
import type { Env } from '../../../types'
import { getNextBirthdaysByCode } from '../../../database'

export async function onRequestGet(context: EventContext<Env, 'code', never>) {
  const db = context.env.DB
  const { code } = context.params

  if (!code || Array.isArray(code)) {
    return Response.json({ message: 'not found' }, { status: 404 })
  }

  const birthdays = await getNextBirthdaysByCode(db, code)
  if (!birthdays.length) {
    return Response.json({ message: 'not found' }, { status: 404 })
  }

  // Easy way to filter only the people that share a birthday
  const nextBirthdayDate = birthdays[0].next_birthday

  return Response.json(
    birthdays.filter((bd) => bd.next_birthday.getTime() === nextBirthdayDate.getTime()),
    { status: 200 },
  )
}
