export default {
  formatSlug: (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-zA-Z ]/g, '')
      .replace(/\s/g, '-')
  },
  formatDate: (dateString) => {
    const date = new Date(dateString)
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    const hh = date.getHours()
    let minutes = date.getMinutes()
    let hour = hh
    let dayTime = 'AM'
    if (hour >= 12) {
      hour = hh - 12
      dayTime = 'PM'
    }
    if (hour == 0) {
      hour = 12
    }

    minutes = minutes < 10 ? '0' + minutes : minutes

    return {
      year: date.getFullYear(),
      month: months[date.getMonth()],
      date: date.getDate(),
      hour: hour,
      minutes: minutes,
      dayTime: dayTime,
    }
  }
}