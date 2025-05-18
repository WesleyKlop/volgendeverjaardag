import { describe, it, expect } from 'vitest'
import {
  isValidISODate,
  formatISODate,
  calculateAgeInYears,
  calculateNextBirthday,
  newStartOfDayDate,
} from '../functions/date'

describe('isValidISODate', () => {
  it('returns true for a valid date', () => {
    expect(isValidISODate('1992-01-01')).toBe(true)
  })

  it('returns false for an invalid date', () => {
    expect(isValidISODate('1992-01-32')).toBe(false)
    expect(isValidISODate('01-01-1992')).toBe(false)
  })
})

describe('formatISODate', () => {
  it('formats a date as ISO', () => {
    expect(formatISODate(new Date('1992-01-01'))).toBe('1992-01-01')
    expect(formatISODate(new Date('1992-01-01T12:34:56Z'))).toBe('1992-01-01')
  })
})

describe('calculateAgeInYears', () => {
  it('calculates the age in years', () => {
    expect(calculateAgeInYears(new Date('1992-01-01'), new Date('2020-01-01'))).toBe(28)
    expect(calculateAgeInYears(new Date('1992-01-01'), new Date('2020-12-31'))).toBe(28)
    expect(calculateAgeInYears(new Date('1992-01-01'), new Date('2021-01-01'))).toBe(29)
  })
})

describe('calculateNextBirthday', () => {
  it('returns the next birthday when it is later in the year', () => {
    const birthDate = newStartOfDayDate('1992-07-15')
    const today = newStartOfDayDate('2024-03-10')

    const nextBirthday = calculateNextBirthday(birthDate, today)

    expect(nextBirthday.getFullYear()).toBe(2024)
    expect(nextBirthday.getMonth()).toBe(6) // July is month 6 (0-indexed)
    expect(nextBirthday.getDate()).toBe(15)
  })

  it('returns the next birthday when it has passed this year', () => {
    const birthDate = newStartOfDayDate('1992-02-10')
    const today = newStartOfDayDate('2024-03-10')

    const nextBirthday = calculateNextBirthday(birthDate, today)

    expect(nextBirthday.getFullYear()).toBe(2025)
    expect(nextBirthday.getMonth()).toBe(1) // February is month 1
    expect(nextBirthday.getDate()).toBe(10)
  })

  it('returns the current date when the birthday is today', () => {
    const birthDate = newStartOfDayDate('1992-03-10')
    // Use a specific time for 'today' to avoid midnight edge cases if tests run near midnight
    const today = newStartOfDayDate('2024-03-10T12:00:00Z')

    const nextBirthday = calculateNextBirthday(birthDate, today)

    // The next birthday should be today (March 10, 2024)
    expect(nextBirthday.getFullYear()).toBe(2024)
    expect(nextBirthday.getMonth()).toBe(2) // March is month 2
    expect(nextBirthday.getDate()).toBe(10)
  })

  // Note: Standard Date object handles leap years automatically when setting dates.
  // Setting Feb 29 on a non-leap year results in Mar 1.
  it('handles leap year birthdays correctly (non-leap year check)', () => {
    const birthDate = newStartOfDayDate('2000-02-29') // Leap year birth date
    const today = newStartOfDayDate('2023-01-01T12:00:00Z') // Non-leap year

    const nextBirthday = calculateNextBirthday(birthDate, today)

    // In 2023 (non-leap year), Feb 29 becomes Mar 1
    expect(nextBirthday.getFullYear()).toBe(2023)
    expect(nextBirthday.getMonth()).toBe(2) // March is month 2
    expect(nextBirthday.getDate()).toBe(1)
  })

  it('handles leap year birthdays correctly (leap year check)', () => {
    const birthDate = newStartOfDayDate('2000-02-29') // Leap year birth date
    const today = newStartOfDayDate('2024-01-01T12:00:00Z') // Leap year

    const nextBirthday = calculateNextBirthday(birthDate, today)

    // In 2024 (leap year), Feb 29 is Feb 29
    expect(nextBirthday.getFullYear()).toBe(2024)
    expect(nextBirthday.getMonth()).toBe(1) // February is month 1
    expect(nextBirthday.getDate()).toBe(29)
  })

  it('handles leap year birthdays correctly (passed in leap year)', () => {
    const birthDate = newStartOfDayDate('2000-02-29') // Leap year birth date
    const today = newStartOfDayDate('2024-03-01T12:00:00Z') // Leap year, after Feb 29

    const nextBirthday = calculateNextBirthday(birthDate, today)

    // Birthday passed in 2024. Next birthday is in 2025.
    // In 2025 (non-leap year), Feb 29 becomes Mar 1
    expect(nextBirthday.getFullYear()).toBe(2025)
    expect(nextBirthday.getMonth()).toBe(2) // March is month 2
    expect(nextBirthday.getDate()).toBe(1)
  })
})
