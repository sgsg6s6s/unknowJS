const a = {
  x: 1,
  y: 2,
  z: [
    4,
    5,
    6,
    undefined,
    Symbol('peter'),
    function() {
      return void 0
    }
  ],
  undefined: 1,
  o: function name() {
    return void 0
  },
  toJSON() {
    console.info('in toJSON')
    return this
  }
}
console.info('origin a is :', a)
console.info('JSON.stringify(a)', JSON.stringify(a))
console.info(
  'JSON.stringify(a,replacer,space)',
  JSON.stringify(
    a,
    function(k, v) {
      console.warn('key', k, 'value', v)
      if (k != 'x') {
        return v
      }
    },
    '----'
  )
)

console.info('一、JSON.stringify(obj)')
console.info(
  '-1. 如果obj是字符串，数字，布尔，null，套一对双引号（obj是字符串也不例外，例如 "string",长度会加二），并返回字符串'
)
console.info('0. 如果obj内部存在循环引用，会报错')
console.info('1. obj作为stringify方法的第一参数，如果obj包含toJSON函数，先执行它')
console.info(
  '2. 如果stringify方法传递了第二参数replacer(类型为数组或者字符串数组),接下来obj在被深度遍历的情况下会反复调用replacer'
)
console.info(
  '3. 遇到undeinfed、function、symbol值时，如果这些值是数组元素，则被转变为null；如果在作为值在键值对中，那忽略输出键值对'
)
console.info('4. 如果stringify方法传递了第三参数space,则会按照space的值缩进展示JSON')

const b = {
  value: 520,
  toString() {
    return [250]
  },
  valueOf() {
    return NaN
  }
}

const c = [123]
c.toString = function() {
  return [250].join('')
}

console.info('二、Number转换')
console.info('1. 显式转换')
console.info('Number(b) 通过c的valueOf方法', b.toString, b.valueOf, Number(b))
console.info('Number(c) 通过c的toString方法', c.toString, Number(c))
console.info(" - '123' is : ", typeof -'123')
console.info(" + '123' is : ", typeof +'123')

console.info('2. - / * 这三种运算符会发生Number隐式转换')

console.info('非数字进行Number强制转换，分几个步骤')
console.info(
  '步骤一：检查valueOf方法，如果valueOf返回本身，那继续步骤二,再如果valueOf返回可转换数字的值，那以这个数字作为强制转换结果，否则返回NaN。'
)
console.info(
  '步骤二：检查toString方法，如果valueOf返回本身，那报TypeError错,再如果toString返回可转换数字的值，那以这个数字作为强制转换结果，否则返回NaN。'
)
console.info('另外，其它类型转字符串也类似这个步骤')
console.info('三、Boolean强制转换')
console.info(
  '假值有：false || "" || +0 || -0 || NaN || null || undefined => ',
  Boolean(false || '' || +0 || -0 || NaN || null || undefined)
)

console.info('四、字符串和数字强制转换')

console.info('(123).toString() is : ', typeof (123).toString())

console.info(
  'Date获得当前毫秒数的几种方法：new Date().getTime() , + new Date , +new Date() , Date.now()',
  new Date().getTime(),
  +new Date(),
  +new Date(),
  Date.now()
)

console.info('五、 ~ 和 | 可以强制使用32位格式，但不适用IEEE754的特殊数字')
console.info('~Infinity =>', ~Infinity)
console.info('~0  =>', ~0)
console.info('~NaN  =>', ~NaN)
console.info('0 | Infinity  =>', 0 | Infinity)
console.info('0 | -0  =>', 0 | -0)
console.info('0 | NaN  =>', 0 | NaN)

console.info('~x 类似-(x+1),不过会对小数截掉')
console.info('~45.6  =>', ~45.6)
console.info('截取小数（不四舍五入）方式：(1) ~~45.6 =>', ~~45.6, '(2) 45.6 | 0 =>', 0 | 45.6)
console.info('"~~" 比 " | 0" 优先级高些 ')

console.info('六、 parseInt解析字符串为整数或者NaN')
console.info(
  'parseInt有2个参数，第一个参数如果不是字符串，会强制转换成字符串，第二个参数是按多少进制去解析字符串，有效范围是2-36，默认是10'
)
console.info(
  "Number('0.000008').toString()",
  Number('0.000008').toString(),
  'parseInt(0.000008,10)',
  parseInt(0.000008, 10)
)
console.info(
  "Number('0.0000008').toString()",
  Number('0.0000008').toString(),
  'parseInt(0.0000008,10)',
  parseInt(0.0000008, 10)
)
console.info(
  '这个结果8怎么来的？1. 第一参数如果不是字符串会强转字符串 2. 解析从左向右，遇到非数字结束'
)
console.info('')
console.info('七、 显示转换为boolean值')
console.info('Boolean("") =>', Boolean(''))
console.info('Boolean("not empty") =>', Boolean('not empty'))
console.info('一元运算符！两次，例如 !!"not empty =>"', !!'not empty')

console.info('八、 隐式转换为boolean值')
console.info("if判断会隐式的boolean转换,例如 if ('not empty') { console.info(1)} ")
console.info('for( ;0; )循环的第二表达式')
console.info('while(0)或do{}while(0)循环')
console.info('三元运算符存在隐式的boolean转换，例如：42 ? true : false =>', 42 ? true : false)
console.info('逻辑运算符 "a && b" 或者 "a || b" 中a作为判断表达式会隐式转换boolean')
console.info('逻辑运算符 "a && b" 或者 "a || b" 不一定返回boolean值，返回的是a 或者 b')
const arr = [1, function() {}, 2, function() {}]
console.info(JSON.stringify(arr))
console.info(
  JSON.stringify(arr, function(key, value) {
    if (typeof value === 'function') {
      return !!value
    } else {
      return value
    }
  })
)

console.info('Symbol不能转数字，还有只能强制转换string，boolean,不能隐式转换')

console.info('九、 == 和 === 的异同')
console.info('== 和 === 都会判断左右的类型')
console.info('== 允许强制类型转换，但 === 不允许')
console.info('9.0 == 左右类型相同，那直接比较，其中对象比较是否指向同一个值')
console.info('9.1 == 左右只要NaN,这个表达式就是为假，优先级最高')
console.info(
  '9.2 == 左右有null或者undefined，那左右必须都有（都有，都有，都有）null或者undefined才为真，否则就是假，优先级几乎最高'
)
console.info('9.3 == 左右只要有boolean值，但不是全是boolean类型，先转数字，优先级几乎最高')
console.info(
  '9.4 == 左右有数字类型，没有null或者undefined，那另一边如果不是数字类型就转成数字类型，按数字类型规则比较，优先级很高'
)
console.info(
  '9.5 == 左右没有数字类型，没有null或者undefined，有字符串类型，那另一边如果不是字符串类型就转成字符串类型，按字符串规则比较，优先级很高'
)

console.info('十、 > 或者 < 比较时强制转换规则')
console.info('10.1 优先转字符串，都可转为字符串，直接按字符串规则比较')
console.info('10.2 一边出现转字符串失败，再将两边都转数字，如果成功，按数字大小比较')
console.info('10.3 转换字符串和数字都失败，报TypeError')

console.info('十一、 >= 或者 <= 比较时强制转换规则')
console.info('11.1 a >= b 转换为 !(a < b)')
console.info('11.2 a <= b 转换为 !(a > b)')

console.info('十二、 死记硬背也要记住')
console.info('NaN == NaN //', NaN == NaN)
console.info('+0 == -0 //', +0 == -0)
console.info('Number("") //', Number(''))
console.info('Number("\\n") //', Number('\n'))
