// @ts-nocheck
/* eslint-disable */
// 第一部分: ['作用域', '词法作用域', '函数作用域和块作用域', '提升', '作用域闭包'],
// 第二部分: ['关于this', 'this全面解析', '对象', '混合对象类', '原型', '行为委托'],

export const config: { [key: string]: string[][] } = {
  词法作用域: [
    ['h1', '词法阶段'],
    ['p', ' 编译第一个动作就是词法化，有状态的解析过程赋予单词语义；'],
    [
      'p',
      '一般情况，词法分析器处理后，保持书写代码的作用域结构，但欺骗词法作用域的代码写法例外'
    ],
    ['h1', '查找'],
    [
      'p',
      '作用域查找到第一个匹配的标识符就会停止，应对同名的标识符产生遮蔽效应'
    ],
    [
      'p',
      'window.a可以访问全局作用域上被遮蔽的a标识符，但中间的作用域的a是访问不到的'
    ],
    ['h1', '欺骗词法（禁用，性能变差,引擎无法在编译时对作用域查找进行优化）'],
    ['h2', '1. eval'],
    [
      'p',
      '还有一些效果类似eval，可以欺骗词法分析，setTimeout、setInterval、new Function()'
    ],
    ['h2', ' 2. with'],
    [
      'p',
      ' with包括的对象属于with的作用域，with无关的声明会加到with所属的作用域下'
    ],
    ['h1', '动态作用域'],
    [
      'p',
      ' 动态作用域不关心在何处声明，只关心在何处使用（作用域链是基于调用栈，而不是作用于嵌套）'
    ],
    ['p', ' JS没有动态作用域（JS基于词法作用域），但this机制和动态作用域的很像']
  ]
}

{
  ;('use strict')
  let a1 = 'a1'
  var b = 'b'
  console.info('find in window', window.a1, window.b)
}

function foo(str) {
  // 'use strict'
  // var a = 1
  eval(str)
  console.log(a)
}
foo('var a=2')

function foo(obj) {
  with (obj) {
    a = 2
  }
}
var o1 = {
  a: 3
}
var o2 = {
  b: 6
}
foo(o1)
console.log(o1.a)
foo(o2)
console.log(o2.a)
console.log(a)
