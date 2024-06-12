import type { D1Database } from '@cloudflare/workers-types/experimental'

export type Env = {
  DB: D1Database
}

export const allowedSpecies = ['human', 'cat', 'dog'] as const
export type Species = (typeof allowedSpecies)[number]
export type Birthday = {
  id: number
  code: string
  birth_date: Date
  name: string
  website: URL | null
  species: Species
}
