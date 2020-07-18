const arr = [
  'Symbol(1)',
  Symbol(1),
  1,
  1,
  'true',
  'true',
  true,
  true,
  null,
  null,
  15,
  15,
  false,
  false,
  undefined,
  undefined,
  null,
  null,
  NaN,
  NaN,
  'NaN',
  0,
  0,
  'a',
  'a',
  {},
  {}
]
const start = Date.now()
console.info(arr)

function uniqueArr(arr) {
  const cache = {}
  for (let i = 0; i < arr.length; i++) {
    const e = arr[i]
    if (!(e in cache)) {
      cache[e] = [e]
    } else {
      // 字符串值相等
      let repeat = false
      for (const value of cache[String(e)]) {
        if (
          typeof e === 'object' && typeof value === 'object'
            ? e === value
            : typeof e === typeof value
        ) {
          repeat = true
        }
      }
      if (!repeat) {
        if (cache[e]) {
          cache[e].push(e)
        } else {
          cache[e] = [e]
        }
      }
    }
  }

  let result = []
  for (const key of Reflect.ownKeys(cache)) {
    result = result.concat(cache[key])
  }
  return result
}
console.info(Date.now() - start, uniqueArr(arr))
