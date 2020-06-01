const arr = [1, 2, , 3]
console.info('Array is', arr, 'length is:', arr.length)
console.info('arr.slice(1)', arr.slice(1), 'now arr is:', arr)
console.info('arr.splice(2)', arr.splice(2), 'now arr is:', arr)
console.info("arr.splice(1, 1, 'replace 2')", arr.splice(1, 1, 'replace 2'), 'now arr is:', arr)

arr['string-key'] = 'bad'
console.info("arr['string-key'] = 'bad'", arr, 'length is:', arr.length)
arr['3'] = 'add to index 3'
console.info("arr['3'] = 'add to index 3'", arr, 'length is:', arr.length)
const set = new Set(arr)
const newArr = Array.from(set)
console.info(
  'set is',
  set,
  'Array.from(set)',
  newArr,
  "Array.from(set)['string-key']",
  newArr['string-key']
)
arr.length = 0
console.info('arr.length = 0', 'now arr is:', arr)

const str = 'i am chinese'
console.info('str is', str)
str[0] = 'you'
console.info('str[0]=xxx  赋值不能改变字符串，字符串是不可变的,str is', str)
console.info(
  "str.split('').reverse().join('')",
  str
    .split('')
    .reverse()
    .join('')
)

const num = 42.56
console.info('JS的浮点数是64位的，基于IEEE754标准实现')

console.info(
  'num.toExponential()',
  num.toExponential(),
  'typeof num.toExponential()',
  typeof num.toExponential()
)
console.info('num.toFixed(1)', num.toFixed(1), 'typeof num.toFixed(1)', typeof num.toFixed(1))
console.info('num.toFixed(4)', num.toFixed(4))
console.info(
  'num.toPrecision(3)',
  num.toPrecision(3),
  'typeof num.toPrecision(3)',
  typeof num.toPrecision(3)
)
console.info('42..toPrecision(3)', (42).toPrecision(3))
console.info('(42).toPrecision(3)', (42).toPrecision(3))

const format = 520
const units = [2, 8, 16]
const prefixes = ['0B', '0O', '0X']
for (const [index, unit] of units.entries()) {
  const another = prefixes[index] + format.toString(unit)
  console.info(`10进制${format}转${unit}进制`, another)
  console.info(`${unit}进制${another}转10进制`, Number(another))
}

console.info('0.1 + 0.2 = ', 0.1 + 0.2)

function closeNumberEqual(num1, num2) {
  return Math.abs(num1 - num2) < Number.EPSILON
}

console.info('closeNumberEqual(0.1+0.2,0.3)', closeNumberEqual(0.1 + 0.2, 0.3))

console.info('Infinity', Infinity.toExponential())
console.info('-Infinity', -Infinity.toExponential())
console.info('Number.MAX_VALUE', Number.MAX_VALUE)
console.info('Number.MIN_VALUE', Number.MIN_VALUE)
console.info(
  'Number.MAX_SAFE_INTEGER',
  Number.MAX_SAFE_INTEGER,
  Number.MAX_SAFE_INTEGER.toExponential(),
  Math.pow(2, 53) - 1
)
console.info(
  'Number.MIN_SAFE_INTEGER',
  Number.MIN_SAFE_INTEGER,
  Number.MIN_SAFE_INTEGER.toExponential(),
  -Math.pow(2, 53) + 1
)

function isInteger(num) {
  return typeof num === 'number' && num % 1 === 0
}

console.info('42.3 is integer', isInteger(42.3), Number.isInteger(42.3))
console.info('42.0 is integer', isInteger(42.0), Number.isInteger(42.0))

console.info('32位有符号整数转换，Number.MIN_SAFE_INTEGER | 0', Number.MIN_SAFE_INTEGER | 0)

console.info('void 2', void 2, 'void 2 === undefined', void 2 === undefined)

console.info('NaN == NaN', NaN == NaN, 'NaN === NaN', NaN === NaN)
console.info('isNaN(NaN)', isNaN(NaN))
console.info("isNaN('string')", isNaN('string'))
console.info("Number.isNaN('string')", Number.isNaN('string'))

console.info('1 / 0 === Infinity', 1 / 0 === Infinity, '1 / 0 === 2 / 0', 1 / 0 === 2 / 0)
console.info(
  'Number.MAX_VALUE + Math.pow(2,969) === Number.MAX_VALUE',
  Number.MAX_VALUE + Math.pow(2, 969) === Number.MAX_VALUE
)
console.info(
  'Number.MAX_VALUE + Math.pow(2, 970) === Infinity',
  Number.MAX_VALUE + Math.pow(2, 970) === Infinity
)

console.info('0==-0', 0 == -0)
console.info('0===-0', 0 === -0)
console.info(
  '数字转字符串，去掉符号',
  'String(-0)',
  String(-0),
  '(-0).toString()',
  (-0).toString(),
  '""+-0',
  '' + -0,
  'JSON.stringify(-0)',
  JSON.stringify(-0)
)

console.info(
  '字符串转数字，保留符号',
  '+"-0"',
  +'-0',
  'Number("-0")',
  Number('-0'),
  'parseInt("-0")',
  parseInt('-0'),
  'JSON.parse("-0")',
  JSON.parse('-0')
)

console.info('-0上的负号能代表方向，我个人觉得可以被替代')

function isNagZero(zero) {
  zero = Number(zero)
  return zero === 0 && 1 / zero === -Infinity
}

console.info('isNagZero(0)', isNagZero(0), 'isNagZero(-0)', isNagZero(-0))

console.info("Object.is(2 / 'a', NaN)", Object.is(2 / 'a', NaN))
console.info('Object.is(-3 * 0, +0)', Object.is(-3 * 0, +0))
