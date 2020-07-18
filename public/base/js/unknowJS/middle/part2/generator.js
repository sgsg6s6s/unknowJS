console.info('1. 交错使用生成器的例子')
let a = 1
let b = 2
function* bar1() {
  a++
  yield
  b--
  yield
  b = b * a
  a = (yield b) + 3
}

function* bar2() {
  b--
  yield
  a = b + (yield 8)
  b = a * (yield 2)
}

function step(gen) {
  const it = gen()
  let last

  return function () {
    last = it.next(last).value
  }
}

const s1 = step(bar1)
const s2 = step(bar2)
console.info('begin', 'result:', a, b)
s2()
console.info('b--', 'result:', a, b)
s1()
console.info('a++', 'result:', a, b)
s2()
console.info('执行到 b + (yield 8)，因为b在yield前，此句转换成 1 + (yield 8) ', 'result:', a, b)
s1()
console.info('b--', 'result:', a, b)
s2()
console.info('执行 a = 1 + (yield 8),继续执行到 a * (yield 2)，这里需要将计算的a填入，即 9 * (yield 2)', 'result:', a, b)
s1()
console.info('b = b * a', 'result:', a, b)
s1()
console.info('a = (yield b) + 3', 'result:', a, b)
s2()
console.info('b = a * (yield 2) 上次被转成 b = 9 * (yield 2)', 'result:', a, b)

console.info('2. 对象转化成iterable')
const forOfObj = (function () {
  let nextVal
  return {
    [Symbol.iterator]: function () { return this },
    next: () => {
      if (nextVal === undefined) {
        nextVal = 1
      } else if (nextVal >= 500) {
        return { done: true }
      } else {
        nextVal = 3 * nextVal + 6
      }
      return { done: false, value: nextVal }
    }
  }
})()

function* makeForOfObj() {
  let nextVal
  try {
    while (!(nextVal >= 500)) {
      if (nextVal === undefined) {
        nextVal = 1
      } else {
        nextVal = 3 * nextVal + 6
      }
      yield nextVal
    }
  } finally {
    console.info('finally in genterator')
  }
}

for (const e of forOfObj) {
  console.info('for of object', e)
}

console.info('for of 将生成器转化成iterable的对象（同时也是生成器实例iterator）')

for (const value of makeForOfObj()) {
  console.info('for of iterator', value)
}

console.info('3. for of 和 for in')
const proto = {
  haha: 1
}
const test = Object.create(proto)
test.mime = 'firework'

console.info('注意原型链上有其它属性（haha）', test)

for (const ekey of Object.keys(test)) {
  console.info('for of', ekey, test[ekey])
}
console.info('--分隔--')
for (const key in test) {
  console.info('for in', key, test[key])
}

console.info('4. iterator return(注意：生成器里的finally先执行，再return)')
const it = makeForOfObj()
for (const value of it) {
  console.info('for of iterator and use return function', value)
  if (value > 300) {
    console.info(it.return('stop by hand').value)
  }
}

console.info('5. Promise+Generator')

function add(x, y) {
  return new Promise((resolve, reject) => {
    const result = x + y
    setTimeout(() => {
      if (result > 100) {
        reject('too big,more than 100')
      } else {
        resolve(result)
      }
    }, 1000)
  })
}

add(3, 5).then((res) => {
  console.info('3+5=', res)
})

function* genTest() {
  try {
    const good = yield add(10, 10)
    console.info('10+10=', good)
    const zero = yield add(-10, 10)
    console.info('-10+10=', zero)
    const overflow = yield add(100, 10)
    console.info('100+10=', overflow)
    const goon = yield add(1, 2)
    console.info('1+2=', goon)
  } catch (err) {
    console.info('error in gen', err)
  }
}

const testIt = genTest()
function deliver(it, val) {
  const result = it.next(val)
  const { done, value } = result
  return Promise.resolve().then(
    () => {
      if (done === true) {
        return Promise.resolve(val)
      } else {
        return Promise.resolve(value).then(
          (result) => {
            return deliver(it, result)
          },
          (result) => {
            return deliver(it, result)
          }
        )
      }
    }
  )
}


deliver(testIt).then((result) => {
  console.info('finish', result)
})

// 书中的例子，reject会组织后面的执行
// runner(genTest).then((result) => {
//   console.info('finish', result)
// })


function runner(gen) {
  const it = gen.apply(this, [].slice.call(arguments, 1))
  return Promise.resolve().then(
    function handleNext(value) {
      const next = it.next(value)
      return (function handleResult(next) {
        const { done, value: nowValue } = next
        if (done) {
          return Promise.resolve(value)
        } else {
          return Promise.resolve(nowValue).then(
            handleNext,
            (err) => {
              return Promise.resolve(it.throw(err)).then(
                handleResult
              )
            }
          )
        }
      })(next)
    }
  )
}