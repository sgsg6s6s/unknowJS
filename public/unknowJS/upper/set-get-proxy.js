const set = {}

Object.defineProperties(set, {
  name: {
    // get: function() {
    //   console.info('get')
    //   return this._name
    // },
    // set: function(params) {
    //   console.info('set', params)
    //   this._name = params
    // }
    writable: true
  }
  //   _name: {
  //     value: 2,
  //     writable: true
  //   }
})

set.name = 123
console.info(set.name, set)

// 让对象实现迭代 添加Symbol.iterator（它是一个方法，返回一个包含next函数的对象）属性给对象
function addIterator(obj) {
  Object.defineProperty(obj, Symbol.iterator, {
    configurable: true,
    value: function values() {
      let index = 0
      const keys = Object.keys(this)
      const obj = this
      return {
        next: function() {
          const result = { done: index >= keys.length }
          if (!result.done) {
            result.value = obj[keys[index]]
          }
          index++
          return result
        }
      }
    }
  })
}

const iteratorObj = {
  a: 1,
  b: 2,
  c: 3,
  d: undefined,
  e: [1],
  f: { f: 1 }
}

addIterator(iteratorObj)
const iterator = iteratorObj[Symbol.iterator]()
let current
do {
  current = iterator.next()
  console.info(current)
} while (current && !current.done)

for (const value of iteratorObj) {
  console.info(value)
}
