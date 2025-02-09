import { describe, it, expect } from 'vitest';
import { isValidISODate, formatISODate, calculateAgeInYears } from '../functions/date';

describe('isValidISODate', () => {
  it('returns true for a valid date', () => {
    expect(isValidISODate('1992-01-01')).toBe(true);
  });

  it('returns false for an invalid date', () => {
    expect(isValidISODate('1992-01-32')).toBe(false);
    expect(isValidISODate('01-01-1992')).toBe(false);
  });
});

describe('formatISODate', () => {
  it('formats a date as ISO', () => {
    expect(formatISODate(new Date('1992-01-01'))).toBe('1992-01-01');
    expect(formatISODate(new Date('1992-01-01T12:34:56Z'))).toBe('1992-01-01');
  });
});

describe('calculateAgeInYears', () => {
    it('calculates the age in years', () => {
        expect(calculateAgeInYears(new Date('1992-01-01'), new Date('2020-01-01'))).toBe(28);
        expect(calculateAgeInYears(new Date('1992-01-01'), new Date('2020-12-31'))).toBe(28);
        expect(calculateAgeInYears(new Date('1992-01-01'), new Date('2021-01-01'))).toBe(29);
    });
});
