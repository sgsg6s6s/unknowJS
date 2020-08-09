console.info('---------------模拟演示---------------')

console.info(isIsomorphic("egg", 'add')); // true
console.info(isIsomorphic("paper", 'title')); // true
console.info(isIsomorphic("kick", 'side')); // false
function isIsomorphic(firstString, secondString) {
  if (firstString.length === secondString.length) {
    const mapping = {}
    let i = 0
    for (const c of firstString) {
      if (mapping[c] === void 0) {
        mapping[c] = secondString[i]
      } else if (mapping[c] !== secondString[i]) {
        return false
      }
      i++
    }
    return true
  }

  return false
}

console.info('---------------模拟演示---------------')