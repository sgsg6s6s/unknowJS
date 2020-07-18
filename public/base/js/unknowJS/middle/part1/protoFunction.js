const functions = [String, Number, Boolean, Object, Function, Array, RegExp, Error, Date, Symbol]
for (const func of functions) {
  console.info('proto function is :', func, `typeof ${func.name}:`, typeof func)

  const funcObj = func === Symbol ? func() : new func()
  console.info(`create empty function object,new ${func.name}():`, funcObj)
  console.info(
    `Object.prototype.toString.call(new ${func.name}()):`,
    Object.prototype.toString.call(funcObj)
  )
  console.info(`${func.name}.valueOf():`, funcObj.valueOf())
  console.info(
    `typeof (${func === Symbol ? '' : 'new '}${func.name}()).valueOf():`,
    typeof funcObj.valueOf()
  )
  console.info(`${func.name}.prototype:`, func.prototype)
  console.info('-------------------next-------------------')
}

console.info('基本数据类型的值调用封装对象的方法前，会自动包装封装对象')
console.info(
  '你也可以手动进行包装，但性能不如引擎自动包装，例如：new String("123").length :',
  new String('123').length
)
console.info('包装封装对象后返回的是对象，做if判断时需要注意')
console.info(
  'Object()可以为任何值做包装，不影响调用真实封装对象的方法，例如 Object(123).toFixed(2) ：',
  Object(123).toFixed(2)
)
console.info('valueOf()可以拆箱，例如 Object(123).valueOf() ：', Object(123).valueOf())

console.info('new Array(3) 和 [undefined,undefined,undefined,] 不太一样', new Array(3), [
  undefined,
  undefined,
  undefined
])

console.info(
  '比如：数组的map函数, .map((v,i)=>i)',
  new Array(3).map((v, i) => i),
  [undefined, undefined, undefined].map((v, i) => i)
)

console.info(
  '[undefined, undefined, undefined]这种数组可以通过 Array.apply(null, { length: 3 })来构造',
  Array.apply(null, { length: 3 })
)
console.info('Array.apply(null, { length: 3 }) 转换 Array(undefined, undefined, undefined)')
console.info(
  'apply的第二参数{ length: 3 }作为类数组，通过for循环的 i<length 条件遍历入参，({ length: 3 })[i]都是undefined'
)

console.info('Object、Function、RegExp、Array包装方式创建对象并不合适,如下方式简洁且效率高：')
console.info('{a:1,b:2}', { a: 1, b: 2 })
console.info('function test(p) {console.info(p)}', function test(p) {
  console.info(p)
})
console.info('/love/g', /love/g)
console.info('[1,2,3]', [1, 2, 3])
console.info('封装函数的prototype是空的对象，例如 RegExp.prototype：', RegExp.prototype)
console.info(
  'new 封装函数会深拷贝其prototype值，例如 new RegExp() === RegExp.prototype：',
  new RegExp() === RegExp.prototype
)
