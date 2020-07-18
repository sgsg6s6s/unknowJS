console.info('一、 表达式或语句会有返回值')
console.info('1. 变量声明算法存在返回值，但被变量语句算法屏蔽了，所以返回undefined')
console.info('2. 代码块返回最后一个语句的返回值')
console.info('3. eval也会有返回值')

console.info(
  '圆括号可以封装连续的表达式（逗号分隔），以最后一个表达式作为返回，例如：(1,2,3) =>',
  (1, 2, 3)
)
console.info(
  'delete obj.a 时，如果a不存在或者a存在且可配置（configurable=true）,返回true，否则返回false,例如：delete ({}).b =>',
  delete {}.b
)

console.info('二、标签跳转')
console.info('1. 循环体内可以continue和break一个标签')
console.info('2. 非循环体内只可以break一个标签')

outter: for (let i = 0; i < 4; i++) {
  inner: for (let j = 0; j < 4; j++) {
    if (i == j) {
      continue outter // 跳出2层循环
    }
    if ((i + j) % 2 === 0) {
      break inner
    }
    console.info(i, j)
  }
}

function Person() {
  p1: {
    if (arguments.length === 0) {
      break p1
    }
    console.info('p1')
    return [...arguments]
  }
  console.info('init person')
  return null
}
{
  Person()
  console.info(Person(1, 2, 3))
}
console.info(
  '表达式 {} + [] =>',
  eval('{} + []'),
  '， {}在表达式里作为空块级作用域，实际执行 + [] '
)

console.info('表达式 [] + {} =>', eval('[] + {}'), '， 实际执行 [].toString() + ({}).toString() ')

console.info('三、运算符的优先级')
console.info(
  "1. 短路运算符的优先级大于三元运算符，false && true ? 'a' : 'b'  =>",
  false && true ? 'a' : 'b'
)

console.info('2. 多个短路运算符 && 的优先级大于 || ，而我觉得从左至右进行短路判断就可以了')
console.info('3. 从右向左判断表达式优先级的有，三元运算符和多个等号赋值')
console.info('4. 关联顺序不决定执行顺序，三元运算符从左向右执行，而连续赋值语句从右向左执行')
console.info('window.a = window.b = window.c =3 =>', (window.a = window.b = window.c = 3))
console.info("'a' ? 'b' ? 'c' : 'd' : 'e'  =>", 'a' ? ('b' ? 'c' : 'd') : 'e')
console.info('四、自动补分号')
console.info('如果js解析器发现因为缺少分号而导致错误，会自动补分号')
console.info('1. 连在一起的变量通过自动分号分隔')
console.info('2. do{}while(a)后应该有分号分隔')
console.info('3. return，break，continue，yield后也会补分号')

console.info('五、JS错误检查')
console.info('1. 早期错误，编译阶段检查错误，无法通过try和catch捕获，会导致解析/编译失败')
console.info('2. 运行时错误，可通过try和catch捕获，例如：TypeError、SyntaxError、ReferenceError')
console.info('3. 不能再let定义的变量前使用这个变量，会报ReferenceError')

console.info('六、函数参数定义和使用')
console.info(
  '1. 函数参数默认值如果是表达式，那表达式内不能使用该参数自己和后面定义的参数，也不能使用函数外定义的同名变量'
)
console.info(
  '2. 严格模式下，函数参数不可以重名，且在函数体内重新赋值不会改变arguments的值（未创建关联）'
)
console.info(
  '3. 非严格模式下(不能给参数默认值)，函数参数可以重名，有值的参数（非undefined值）和arguments创建关联，意味着赋值改变参数值会影响arguments'
)
function foo(a) {
  'use strict'
  a = 42
  console.info(a, arguments[0])
}

function bar(a) {
  a = 42
  console.info(a, arguments[0])
}

function son(a = 10) {
  a = 42
  console.info(a, arguments[0])
}

foo()
foo(undefined)
foo(1, 2, 3)
bar()
bar(null)
bar(1, 2, 3)
son()
son(null)
son(1, 2, 3)

console.info('六、try finally')
console.info('1. 先执行try代码，但finally代码块在try代码块最后返回前执行')
console.info('2. finally代码的return或break标签可能会覆盖try的return')

console.info('七、switch')
console.info('1. switch(a) 和 case 1时，case的判断是===，即a===1才为真')
console.info('2. default的顺序放到case前会提前判断（按书写顺序判断）')

const a = 10
switch (a) {
  case 10: {
    console.info('10')
  }
  case 0:
  case 1:
  default: {
    console.info('default')
  }
  case 3: {
    console.info('3')
  }
  case 4: {
    console.info('4')
  }
}

console.info('1. 即使case语句匹配到，如果不执行break，还是会走default代码块')
console.info('2. default代码块可以放到任何case的前后')
console.info('3. default代码块如果没有break，还会向后找case')
console.info('八、运算符的优先级（从小到大）')
console.info(',')
console.info('=')
console.info('三元运算符 x ? y : z')
console.info('==或===')
console.info('&& ||,其中&&比||优先级高')
console.info('圆括号()')
