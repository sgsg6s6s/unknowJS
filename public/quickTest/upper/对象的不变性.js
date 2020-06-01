'use strict'
console.info('JS默认是浅不变性,不变性不渗透到引用对象内部')
console.info('JS的浅不变性通过操纵对象本身，影响对象的所有的属性')
let constObj = {
  arr: [1, 2, 3],
  name: 'const'
}

console.info('1. Object.preventExtensions(constObj) 禁止对象添加属性', constObj)
Object.preventExtensions(constObj)
try {
  constObj.newP = 1
} catch (e) {
  console.info('严格模式报异常，constObj.newP = 1', constObj, e)
}
constObj.arr = [4, 5, 6]
constObj.name = constObj.name + '-change'
console.info('preventExtensions后，修改属性可成功', constObj)

delete constObj.arr
console.info('preventExtensions后，delete constObj.arr 可成功', constObj)

Object.defineProperty(constObj, 'name', {
  value: [7, 8],
  writable: false,
  configurable: false,
  enumerable: false
})
console.info(
  "preventExtensions后，Object.defineProperty(constObj, 'name', {...}) 可成功",
  constObj,
  Object.getOwnPropertyDescriptors(constObj)
)

console.info('Object.isExtensible', Object.isExtensible(constObj))

constObj = {
  arr: [1, 2, 3],
  name: 'const'
}
console.info(
  '2. Object.seal(constObj) 禁止对象添加属性、删除属性、修改描述符',
  JSON.stringify(constObj)
)
Object.seal(constObj)
constObj.arr = [7, 8]
console.info('修改已有属性成功,constObj.arr = [7,8]', JSON.stringify(constObj))
try {
  constObj.newP = 1
} catch (e) {
  console.info('严格模式报异常，添加属性失败 constObj.newP = 1', JSON.stringify(constObj), e)
}
try {
  delete constObj.name
} catch (e) {
  console.info('严格模式报异常，删除属性失败 delete constObj.name', JSON.stringify(constObj), e)
}
try {
  Object.defineProperty(constObj, 'name', {
    value: [7, 8],
    writable: false,
    configurable: false,
    enumerable: false
  })
} catch (e) {
  console.info(
    "严格模式报异常，修改描述符失败 Object.defineProperty(constObj, 'name', {...})",
    JSON.stringify(constObj),
    e
  )
}
console.info('Object.isSealed', Object.isSealed(constObj))
constObj = {
  arr: [1, 2, 3],
  name: 'const'
}
console.info(
  '3. Object.seal(constObj) 禁止对象修改已有属性的值、添加属性、删除属性、修改描述符',
  JSON.stringify(constObj)
)
Object.freeze(constObj)

try {
  constObj.name = 520
} catch (e) {
  console.info('严格模式报异常，修改已有属性的值 constObj.name = 520', JSON.stringify(constObj), e)
}

console.info('Object.isFrozen', Object.isFrozen(constObj))

console.info('--------end----------------')
