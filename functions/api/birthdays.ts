import type { EventContext } from '@cloudflare/workers-types/experimental'
import { allowedSpecies, type Birthday, type Env, type Species } from '../types'

type Body = {
  code: string
  birthDate: string
  name: string
  website: string
  species: Species
}

function parseRequestBody(body: Body): Omit<Birthday, 'id'> {
  console.log(body)
  if (!allowedSpecies.includes(body.species)) {
    throw new Error('invalid species')
  }

  const parsedDate = new Date(body.birthDate)
  if (isNaN(parsedDate.getTime())) {
    throw new Error('invalid birthDate')
  }

  if (typeof body.code !== 'string' || body.code.length < 6 || body.code.length >= 32) {
    throw new Error('invalid code')
  }

  if (typeof body.name !== 'string' || body.name.length === 0 || body.name.length >= 32) {
    throw new Error('invalid name')
  }

  let parsedWebsite: null | URL = null
  try {
    if (body.website) parsedWebsite = new URL(body.website)
  } catch (cause) {
    throw new Error('invalid website')
  }

  if (parsedWebsite instanceof URL && !['lijstje.nl'].includes(parsedWebsite?.host)) {
    throw new Error('website origin not allowed')
  }

  return {
    code: body.code,
    name: body.name,
    birth_date: parsedDate,
    website: parsedWebsite,
    species: body.species,
  }
}

export async function onRequestPost(ctx: EventContext<Env, never, never>) {
  const db = ctx.env.DB

  const birthday = parseRequestBody(await ctx.request.json<Body>())

  const result = await db
    .prepare(
      `INSERT INTO birthdays 
         (code, name, birth_date, website, species) 
       VALUES 
         (?, ?, ?, ?, ?)`,
    )
    .bind(
      birthday.code,
      birthday.name,
      birthday.birth_date.getTime() / 1000,
      birthday.website,
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
