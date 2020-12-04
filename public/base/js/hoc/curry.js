
function unlimitAdd(...first) {
  const params = []
  params.push(...first)

  function add(...other) {
    params.push(...other)
    return add
  }

  add.__proto__ = String.prototype

  // 隐式类型转换
  add.toString = function () {
    return params.reduce((last, cur) => { return last + cur }, 0)
  }

  return add
}
console.info('unlimitAdd= ', unlimitAdd)
console.info('unlimitAdd(1)= ', unlimitAdd(1))
console.info('unlimitAdd(1)(2)(3)(4) = ', unlimitAdd(1)(2)(3)(4))
console.info('unlimitAdd(1,1,1)(2)(3)(4) = ', unlimitAdd(1, 1, 1)(2)(3)(4))
console.info('unlimitAdd(1)(2)(3)(4,4,4) = ', unlimitAdd(1)(2)(3)(4, 4, 4))
console.info('unlimitAdd(1,2,3,4)(1,2,3,4)(1,2,3,4)(1,2,3,4)(1,2,3,4)  = ', unlimitAdd(1, 2, 3, 4)(1, 2, 3, 4)(1, 2, 3, 4)(1, 2, 3, 4)(1, 2, 3, 4))