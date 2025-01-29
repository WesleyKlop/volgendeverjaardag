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
  const nextBirthDay = new Date()
  nextBirthDay.setMonth(birthDate.getMonth())
  nextBirthDay.setDate(birthDate.getDate())
  if (nextBirthDay < today) {
    nextBirthDay.setFullYear(nextBirthDay.getFullYear() + 1)
  }
  return nextBirthDay
}
