// 1.
const a = { name: 'hello' },
  b = { name: 'hi' }
function exchange(a, b) {
  const c = b
  b = a
  a = c // 内部的a和b交换指向的内容 b={name:"hello"}, a={name:"hi"}
  a.name = a.name + '1' // b={name:"hello"}, a={name:"hi1"}
  b.name = b.name + '2' // b={name:"hello2"}, a={name:"hi1"}
  console.info(a.name, b.name) // hi1,hello2
}
exchange(a, b)
console.info(a.name, b.name) // 当前作用域寻找a和b，分别是hello2,hi1 （exchange内部修改了值，但不会改外部定义的变量的指向）

// 打印结果
// hi1 hello2
// hello2 hi1

// 2.
const arr = []
for (let i = 0; i < 10; i++) {
  arr.push(
    String(Math.floor(Math.random() * 24)).padStart(2, '0') +
      ':' +
      String(Math.floor(Math.random() * 60)).padStart(2, '0')
  )
}
console.info(arr)

function calc(arr) {
  arr.sort((a, b) =>
    new Date('2020-5-21 ' + a + ':00').getTime() < new Date('2020-5-21 ' + b + ':00').getTime()
      ? -1
      : 1
  )
  console.info(arr)
  let result = Infinity
  if (arr && arr.length > 1) {
    let last = new Date('2020-5-21 ' + arr[0] + ':00').getTime()
    for (let i = 1; i < arr.length; i++) {
      const currentMills = new Date('2020-5-21 ' + arr[i] + ':00').getTime()
      const abtract = Math.abs(currentMills - last)
      //console.info(last,currentMills,abtract/60000)
      if (abtract < result) {
        result = abtract
      }
      last = currentMills
    }
  }
  return result / 60000
}
console.info('最小的间隔分钟数', calc(arr), '目测是正确的')

// 3.
function getUersById(id) {
  return Promise.resolve({ user: { id } })
}

function getSchoolInfoById(id) {
  return Promise.resolve({ school: { id } })
}

function getDeviceInfoById(id) {
  return Promise.resolve({ device: { id } })
}

function wrapperFunction(fn) {
  const cache = {}
  const handler = {
    apply(target, ctx, args) {
      return new Promise(async resolve => {
        const id = args[0]
        if (id in cache) {
          console.info('use cache', cache[id])
        } else {
          cache[id] = await target(...args)
          console.info('query db', cache[id])
        }
        resolve(cache[id])
      })
    }
  }
  return new Proxy(fn, handler)
}

const testCase3 = [
  [getUersById, 3],
  [getSchoolInfoById, 2],
  [getDeviceInfoById, 5]
]

for (const test of testCase3) {
  const newInterface = wrapperFunction(test[0])
  for (let i = 0; i < test[1]; i++) {
    setTimeout(() => {
      newInterface(test[0].name).then(result => {
        console.info('receive', test[0].name, result)
      })
    }, 0)
  }
}

// 4.
/**
 * 从右向左找第一个最大值
 * @param  {...number} args
 */
function maxNumberFromTail(...args) {
  const len = args.length
  if (len > 0) {
    let currentIndex = args[len - 1] === '.' ? len - 2 : len - 1
    let max = args[currentIndex]
    for (let i = currentIndex - 1; i >= 0; i--) {
      if (args[i] != '.' && args[i] > max) {
        max = args[i]
        currentIndex = i
      }
    }
    return [max, currentIndex]
  }
  return [undefined, -1]
}
/**
 * 从右向左找第一个最小值
 * @param  {...number} args
 */
function minNumberFromTail(...args) {
  const len = args.length
  if (len > 0) {
    let currentIndex = args[len - 1] === '.' ? len - 2 : len - 1
    let min = args[currentIndex]
    for (let i = currentIndex - 1; i >= 0; i--) {
      if (args[i] != '.' && args[i] < min) {
        min = args[i]
        currentIndex = i
      }
    }
    return [min, currentIndex]
  }
  return [undefined, -1]
}

/**
 * 交换数组两个元素的位置
 * @param {*} arr 数组
 * @param {*} i1  下标
 * @param {*} i2  下标
 */
function exchangeIndex(arr, i1, i2) {
  const tmp = arr[i1]
  arr[i1] = arr[i2]
  arr[i2] = tmp
}

/**
 * 输入一个数字, 交换两位数字, 最多交换一次, 输出可以得到的最大的数字; 如输入:1234 交换 1,4 后, 得到 4231;
 * @param {*} num
 */
function exchangeMax(num) {
  // 默认认为输入时number类型
  num = Number(num)
  if (num < 0) {
    num = -num
    const args = String(num).split('')
    if (args.length > 1) {
      for (let i = 0; i < args.length; i++) {
        const maxInfo = minNumberFromTail(...args.slice(i + 1))
        if (maxInfo[0] !== undefined && args[i] > maxInfo[0]) {
          exchangeIndex(args, i, maxInfo[1] + i + 1) // maxInfo[1] 需要加偏移量
          break
        }
      }
      return -Number(args.join(''))
    }
  } else {
    const args = String(num).split('')
    if (args.length > 1) {
      for (let i = 0; i < args.length; i++) {
        const maxInfo = maxNumberFromTail(...args.slice(i + 1))
        if (maxInfo[0] !== undefined && args[i] < maxInfo[0]) {
          exchangeIndex(args, i, maxInfo[1] + i + 1) // maxInfo[1] 需要加偏移量
          break
        }
      }
      return Number(args.join(''))
    }
  }
  return num
}

const testCases = [
  {
    input: [997979797],
    expect: 999979777 // right begin
  },
  {
    input: [19293994],
    expect: 99293914
  },
  {
    input: [22765294.19319234],
    expect: 92765294.19312234 // right begin
  },
  {
    input: ['1234.'],
    expect: 4231
  },
  {
    input: [1],
    expect: 1
  },
  {
    input: [0.9991],
    expect: 9.9901
  },
  {
    input: ['0.0'],
    expect: 0
  },
  {
    input: [0],
    expect: 0
  },
  {
    input: [-3.1415926],
    expect: -1.1435926 // right begin
  },
  {
    input: [-4321],
    expect: -1324
  },
  {
    input: [-97979797],
    expect: -77979799 // right begin
  }
]

let passed = 0
for (const testCase of testCases) {
  const { input, expect } = testCase
  const result = exchangeMax(...input)
  if (result === expect) {
    passed++
    console.info('passed:', { input: input.join(','), result, expect })
  } else {
    console.info('not passed:', { input: input.join(','), result, expect })
  }
}

console.info('test cases executed,passed number:', passed)
