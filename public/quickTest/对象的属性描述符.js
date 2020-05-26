'use strict'
const base = {
  a: 3,
  b: 'b'
}
console.info('初始化对象base和属性a')
Object.defineProperty(base, 'a', {
  value: 8,
  configurable: false,
  enumerable: false
})

Object.defineProperty(base, 'c', {})
base.d = {}
console.info(
  '知识点：通过defineProperty创建的属性c和base.d = 创建的属性描述符的默认配置是不一样的',
  Object.getOwnPropertyDescriptors(base)
)

console.info(
  '1. configurable=false时，会发生什么？',
  base,
  Object.getOwnPropertyDescriptor(base, 'a')
)

console.info('Object.keys(base)', Object.keys(base))
console.info('Object.values(base)', Object.values(base))
console.info('JSON.stringify(base)', JSON.stringify(base))
console.info('base.propertyIsEnumerable()', Object.prototype.propertyIsEnumerable.call(base, 'a'))
console.info('base.hasOwnProperty()', Object.prototype.hasOwnProperty.call(base, 'a'))
console.info('a in base', 'a' in base)
console.info('Reflect.ownKeys(base)', Reflect.ownKeys(base))
console.info('Object.getOwnPropertyNames(base)', Object.getOwnPropertyNames(base))

console.info('for (const key in base)遍历应该没有a')
for (const key in base) {
  console.info(key, base[key])
}

console.info(
  '2. configurable=false时，会发生什么？',
  base,
  Object.getOwnPropertyDescriptor(base, 'a')
)

try {
  delete base.a
  console.info(
    'configurable=false的情况，执行delete base.a删除无效，静默失败(非严格模式)',
    base,
    Object.getOwnPropertyDescriptor(base, 'a')
  )
} catch (e) {
  console.info('configurable=false的情况，delete base.a，TypeError异常(严格模式)', e)
}

try {
  Object.defineProperty(base, 'a', {
    value: 20
  })

  console.info(
    'configurable=false的情况，通过描述符修改为20，成功',
    base,
    Object.getOwnPropertyDescriptor(base, 'a')
  )

  base.a = 16
  console.info(
    'configurable=false的情况，执行 base.a = 16，成功',
    base,
    Object.getOwnPropertyDescriptor(base, 'a')
  )
} catch (e) {
  console.info(e)
}

try {
  Object.defineProperty(base, 'a', {
    writable: false
  })
  console.info(
    'configurable=false的情况，writable由true改为false，成功',
    base,
    Object.getOwnPropertyDescriptor(base, 'a')
  )
} catch (e) {
  console.info(e)
}

try {
  Object.defineProperty(base, 'a', {
    writable: true
  })
} catch (e) {
  console.info(
    'configurable=false的情况，writable由false改为true，TypeError异常',
    base,
    Object.getOwnPropertyDescriptor(base, 'a'),
    e
  )
}

try {
  Object.defineProperty(base, 'a', {
    configurable: false
  })
  Object.defineProperty(base, 'a', {
    configurable: true
  })
} catch (e) {
  console.info(
    'configurable=false的情况，configurable通过描述符重新定义且变化，TypeError异常',
    base,
    Object.getOwnPropertyDescriptor(base, 'a'),
    e
  )
}

try {
  Object.defineProperty(base, 'a', {
    enumerable: true
  })
  Object.defineProperty(base, 'a', {
    enumerable: false
  })
} catch (e) {
  console.info(
    'configurable=false的情况，enumerable通过描述符重新定义且变化，会TypeError异常',
    base,
    Object.getOwnPropertyDescriptor(base, 'a'),
    e
  )
}

console.info('3. writable=false时，会发生什么？', base, Object.getOwnPropertyDescriptor(base, 'a'))
try {
  try {
    base.a = 21
    console.info(
      'writable=false的情况，base.a = 21 ,静默失败(非严格模式)',
      Object.getOwnPropertyDescriptor(base, 'a')
    )
  } catch (e) {
    console.info(
      'writable=false的情况，base.a = 21 ,TypeError异常(严格模式)',
      Object.getOwnPropertyDescriptor(base, 'a'),
      e
    )
  }

  Object.defineProperty(base, 'a', {
    value: 31
  })
} catch (e) {
  console.info(
    'writable=false的情况，描述符修改描述符value,同样TypeError异常',
    Object.getOwnPropertyDescriptor(base, 'a'),
    e
  )
}

console.info('知识点1：描述符的（set或get）和（value或writable）互斥,不能同时定义')

console.info('知识点2：重新定义后，互斥项或同名项会被覆盖，不互斥且不同名项会合并')

Object.defineProperty(Object.prototype, 'a', {
  configurable: true,
  set: function(a) {
    this._a = a
  },
  get: function() {
    return this._a
  }
})
console.info('current', Object.getOwnPropertyDescriptor(Object.prototype, 'a'))
Object.defineProperty(Object.prototype, 'a', {
  value: 3
})
console.info('current', Object.getOwnPropertyDescriptor(Object.prototype, 'a'))
Object.defineProperty(Object.prototype, 'a', {
  writable: true
})
console.info('current', Object.getOwnPropertyDescriptor(Object.prototype, 'a'))

console.info('--------end----------------')
