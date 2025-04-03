// Formats a JavaScript Date object to a string in the format YYYY-MM-DD
export function formatISODate(date: Date): string {
  return date.toISOString().split('T')[0]
}

// Returns true if the given string is a valid ISO date in the format YYYY-MM-DD
export function isValidISODate(date: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(date) == true && isNaN(Date.parse(date)) == false
}

// Returns the age in years between the given birth date and the other date
export function calculateAgeInYears(birthDate: Date, otherDate: Date = new Date()): number {
  const years = otherDate.getFullYear() - birthDate.getFullYear()

  if (
    otherDate.getMonth() < birthDate.getMonth() ||
    (otherDate.getMonth() == birthDate.getMonth() && otherDate.getDate() < birthDate.getDate())
  ) {
    return years - 1
  }

  return years
}

// Returns the next birthday after the given date
export function calculateNextBirthday(birthDate: Date, today: Date): Date {
  // Initialize based on today's year, birth month, and birth date
  const nextBirthDay = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());

  // Create date-only versions for comparison (set time to 00:00:00)
  const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  // Check if the calculated birthday date is before today's date
  if (nextBirthDay < todayDateOnly) {
    // If it has passed, set the year to the next year
    nextBirthDay.setFullYear(nextBirthDay.getFullYear() + 1);
    // Re-set month and date in case of leap year rollover issues (e.g., Feb 29 -> Mar 1)
    // JS Date object handles this automatically, but being explicit can clarify intent.
    nextBirthDay.setMonth(birthDate.getMonth());
    nextBirthDay.setDate(birthDate.getDate());
  }
  return nextBirthDay
}
