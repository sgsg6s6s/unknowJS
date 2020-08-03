
function resolve(num) {
  const result = []
  if (num > 0) {
    for (let i = 1; i <= Math.sqrt(num); i++) {
      const other = num / i
      if (Number.isInteger(other)) {
        result.push([i, other])
      }
    }
  } else if (num < 0) {
    for (const group of resolve(-num)) {
      let [a, b] = group
      result.push([-a, b], [a, -b])
    }
  }
  return result
}

function findTwo(num) {
  const result = [...resolve(num + 1), ...resolve(num + 2)]
  console.info(result)
  let min = Infinity
  let minA, minB
  for (const group of result) {
    let [a, b] = group
    const abs = Math.abs(a - b)
    if (abs < min) {
      min = abs
      minA = a
      minB = b
    }
  }
  return [minA, minB]
}



console.info(findTwo(20))
console.info(findTwo(-25))