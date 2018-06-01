export function formatDate(time, fmt) {
  // fmt 2016-05-24 09:00 YYYY-MM-DD hh:mm:ss
  let date = new Date(time)
  let years = date.getFullYear()
  if (/(Y+)/.test(fmt)) {
    // RegExp.$1是正则表达式匹配到的第一个子匹配（括号内）的属性/Y+/exec('YYYY-MM-DD'),$1==YYYY,$2==MM,....$3
    fmt = fmt.replace(RegExp.$1, (years + '').substr(4 - RegExp.$1.length))
  }
  let obj = {
    '(M+)': date.getMonth() + 1,
    '(D+)': date.getDay(),
    '(h+)': date.getHours(),
    '(m+)': date.getMinutes(),
    '(s+)': date.getSeconds()
  }
  for (let k in obj) {
    if (new RegExp(k).test(fmt)) {
      let str = obj[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : addZero(str))
    }
  }
  return fmt
}
function addZero(val) {
  return ('00' + val).substr(val.length)
}
