import type { EventContext } from '@cloudflare/workers-types/experimental'
import { allowedSpecies, type Birthday, type Env, type Species } from '../types'
import { isValidISODate } from '../date'

export type Body = {
  code: string
  birth_date: string
  name: string
  website: string
  species: Species
}

export class ValidationError extends Error {
  constructor(
    public readonly fieldName: string,
    public readonly info = '',
  ) {
    super(`invalid ${fieldName}`)
  }
}

export function parseRequestBody(body: Body): Omit<Birthday, 'id'> {
  if (!allowedSpecies.includes(body.species)) {
    throw new ValidationError('species')
  }

  if (!isValidISODate(body.birth_date)) {
    throw new ValidationError('birth_date')
  }

  if (typeof body.code !== 'string' || body.code.length < 6 || body.code.length >= 32) {
    throw new ValidationError('code')
  }

  if (typeof body.name !== 'string' || body.name.length === 0 || body.name.length >= 32) {
    throw new ValidationError('name')
  }

  let parsedWebsite: null | URL = null
  try {
    if (body.website) parsedWebsite = new URL(body.website)
  } catch {
    throw new ValidationError('website', 'parse error')
  }
  if (parsedWebsite instanceof URL && !['lijstje.nl'].includes(parsedWebsite.host)) {
    throw new ValidationError('website', 'invalid origin')
  }

  return {
    code: body.code,
    name: body.name,
    birth_date: body.birth_date,
    website: parsedWebsite,
    species: body.species,
  }
}

export async function onRequestPost(ctx: EventContext<Env, never, never>) {
  const db = ctx.env.DB

  let birthday: Omit<Birthday, 'id'>
  try {
    birthday = parseRequestBody(await ctx.request.json<Body>())
  } catch (err: unknown) {
    if (err instanceof ValidationError) {
      return Response.json({ message: err.message, error: err }, { status: 422 })
    }
    throw err
  }

  const result = await db
    .prepare(
      `INSERT INTO birthdays 
         (code, name, birth_date, website, species) 
       VALUES 
         (?, ?, date(?), ?, ?)`,
    )
    .bind(
      birthday.code,
      birthday.name,
      birthday.birth_date,
      birthday.website?.toString() ?? null,
      birthday.species,
    )
    .run()

  if (result.error) {
    return Response.json(result, { status: 502 })
  }

  return Response.json({
    id: result.meta.last_row_id,
    ...birthday,
  } satisfies Birthday)
}
