export function urlparse() {
  /*
  * @url解析
  * @example ?id=123456&a=b
  * @return obj={id:123456,a:b}
  */
  let url = window.location.search
  if (!url) {
    return ''
  }
  let reg = /[?&][^?&]+=[^?&]+/g
  let regRes = url.match(reg) // ['?id=123456','$a=b']
  let obj = {}
  regRes.forEach(arr => {
    let tempArr = arr.substring(1).split('=')
    let key = decodeURIComponent(tempArr[0])
    let value = decodeURIComponent(tempArr[1])
    obj[key] = value
  })
  return obj
}
