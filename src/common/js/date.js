export function formatDate(time, fmt) {
  // fmt 2016-05-24 09:00 YYYY-MM-DD HH:MM
  let date = new Date(time)
  let years = date.getFullYear()
  let i = 0
  if (/(y+)/i.test(fmt)) {
    console.log(RegExp.$1)
    i = 111
  }
  return years + '' + i
}
