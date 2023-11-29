// Function to convert date string to minutes since current time
const convertDateToMinutesSinceNow = (dateString: string): number => {
  // Parse the input date string
  const inputDate = new Date(dateString)

  // Get the current date and time
  const currentDate = new Date()

  // Calculate the time difference in milliseconds
  const timeDifference = currentDate.getTime() - inputDate.getTime()
  // Convert milliseconds to minutes
  const minutesDifference = timeDifference / (1000 * 60)

  return Math.ceil(minutesDifference)
}

export default convertDateToMinutesSinceNow
