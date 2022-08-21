export const formatDate = (date: string): string => {
  const formatter = new Intl.DateTimeFormat(undefined, { dateStyle: 'long' })
  return formatter.format(new Date(date))
}

export const isSameDate = (a: Date, b: Date = new Date()): boolean =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate()
