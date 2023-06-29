export function dateToString(dateTime) {
  const fullDate = new Date(dateTime)
  const date = fullDate.getDate()
  const month = fullDate.getMonth() + 1
  const newDate = `${date > 9 ? date : "0" + date}/0${month}`
  return newDate
}

export function timeToString(dateTime) {
  const time = new Date(dateTime)
  return time.toLocaleTimeString()
}
