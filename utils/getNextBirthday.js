export function getNextBirthday(date) {
  // Current Date
  let currentDate = new Date()

  // Set the users birthday to this year (originally from thier birth year)
  let birthday = new Date(date)
  birthday.setFullYear(currentDate.getFullYear())

  // If the birthday has already occured this year.  Then thier next birthday is next year.
  if (birthday - currentDate < 0) {
    birthday.setFullYear(currentDate.getFullYear() + 1)
  }

  // Return the users next birthday as a date.
  return birthday
}
