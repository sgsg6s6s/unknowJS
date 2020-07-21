/**
 * 根据点表达式读取对象的值
 * @param {*} obj 
 * @param {*} expression 
 */
function readValueFromObject(obj, expression) {
  const propertyList = expression.split('.')
  let current = obj
  const len = propertyList.length
  let i = 0
  for (; i < len; i++) {
    if (current != void 0) {
      current = current[propertyList[i]]
    }
  }
  if (i === len) {
    return current
  }
}

const test = {
  a: {
    b: {
      c: 1
    }
  }
}

// console.info(readValueFromObject(test, ''))
// console.info(readValueFromObject(test, 'a'))
// console.info(readValueFromObject(test, 'a.c'))
// console.info(readValueFromObject(test, 'a.b'))
// console.info(readValueFromObject(test, 'a.b.b'))
// console.info(readValueFromObject(test, 'a.b.c'))
// console.info(readValueFromObject(test, 'a.b.c.d'))


