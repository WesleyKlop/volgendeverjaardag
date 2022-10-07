const formatter = new Intl.DateTimeFormat('nl-nl', { dateStyle: 'long' })
export const formatDate = (date: Date): string => {
  return formatter.format(date)
}

export const isSameDate = (a: Date, b: Date = new Date()): boolean =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate()
