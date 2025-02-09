import { describe, it, expect } from 'vitest'
import { parseRequestBody, ValidationError } from '../functions/api/birthdays'

describe('parseRequestBody', () => {
  it('parses a valid request body', () => {
    expect(
      parseRequestBody({
        code: 'test1234',
        name: 'Alice',
        birth_date: '2000-01-01',
        website: 'https://lijstje.nl/alice',
        species: 'human',
      }),
    ).toEqual({
      code: 'test1234',
      name: 'Alice',
      birth_date: '2000-01-01',
      website: new URL('https://lijstje.nl/alice'),
      species: 'human',
    })
  })

  it('throws a ValidationError for an invalid request body', () => {
    expect(() =>
      parseRequestBody({
        code: 'test1234',
        name: 'Alice',
        birth_date: '01-2000',
        website: 'https://lijstje.nl/alice',
        species: 'human',
      }),
    ).toThrowError(new ValidationError('birth_date'))

    expect(() =>
      parseRequestBody({
        code: 'test1234',
        name: 'Alice',
        birth_date: '2025-02-32',
        website: 'https://lijstje.nl/alice',
        species: 'human',
      }),
    ).toThrowError(new ValidationError('birth_date'))

    expect(() =>
      parseRequestBody({
        code: 'test1234',
        name: 'Alice',
        birth_date: '2000-10-01',
        website: 'https://pauperhosting.nl/',
        species: 'human',
      }),
    ).toThrowError(new ValidationError('website', 'invalid origin'))

    expect(() =>
      parseRequestBody({
        code: 'test1234',
        name: 'Alice',
        birth_date: '2000-10-01',
        website: 'niet een valide website domein',
        species: 'human',
      }),
    ).toThrowError(new ValidationError('website', 'parse error'))
  })
})
